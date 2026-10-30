![hass-config](https://socialify.git.ci/ItsShunya/hass-config/image?description=1&font=Inter&forks=1&issues=1&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F4%2F49%2FHome_Assistant_logo_%25282023%2529.svg%2F1200px-Home_Assistant_logo_%25282023%2529.svg.png&owner=1&pattern=Overlapping+Hexagons&pulls=1&stargazers=1)


This repository contains the YAML configuration for my [Home Assistant](https://www.home-assistant.io/) installation: the core configuration, dashboards, theme, and the custom integrations and cards it depends on. It is designed for personal use but can serve as a reference for others interested in setting up their HA servers.

Feel free to use parts of this repository, but note that it is tailored to my specific devices and will require adjustments for your use case.

---

## Repository Structure

The repository mirrors the layout of Home Assistant's `/config` directory, so its files can be copied straight into it. Below is an overview of the key components:

### Key Components

- **`configuration.yaml`**: The main configuration file where you define integrations, settings, and core options.
- **`automations.yaml`**, **`scripts.yaml`**, **`scenes.yaml`**: Automations, reusable action sequences, and saved device states. They are empty for now; the UI editors write to these files, so changes made there must be copied back into the repository.
- **`packages/`**: One file per feature (e.g. `vacuum.yaml`), holding everything that feature needs: automations, scripts, helpers, template sensors and so on. Each file is loaded as a [package](https://www.home-assistant.io/docs/configuration/packages/) named after it.
  - Use packages for configuration written by hand. Automations and scripts made in the UI editors go to `automations.yaml` and `scripts.yaml` instead, because the editors can't edit those defined in packages.
- **`custom_templates/`**: Jinja macros used by templates (see [Reusing templates](https://www.home-assistant.io/docs/configuration/templating/#reusing-templates)). Restart Home Assistant after editing them.
- **`dashboards/`**: Dashboards in YAML mode, registered under `lovelace.dashboards` in `configuration.yaml`.
  - Each subdirectory is one dashboard: a `dashboard.yaml` plus a `views/` folder with one file per view.
- **`cards/`**: Reusable cards, included from views with `!include` so each card is defined once.
- **`themes/`**: Frontend themes, loaded by `frontend.themes`. Currently the [Catppuccin](https://github.com/catppuccin/home-assistant) flavours.
- **`www/`**: Files served by Home Assistant under `/local/`.
  - `images/`: Pictures used by dashboards, like the floor plan.
  - `plugins/`: Custom dashboard cards, loaded under `lovelace.resources` in `configuration.yaml`, and kiosk-mode, loaded under `frontend.extra_module_url`.
  - `styles/`: Our own stylesheets, also loaded under `lovelace.resources`. `dashboard.css` holds the sizes of the dashboard (see [Dashboards](#dashboards)).
- **`custom_components/`**: Custom integrations not shipped with Home Assistant.
  - These and the cards in `www/plugins/` are vendored copies of third-party projects. [docs/vendored.md](./docs/vendored.md) lists their sources and versions, and how to update them.
- **`Makefile`**: Deploy, check, restart and so on (see [Deploying changes](#deploying-changes)). Run `make` to list the commands.
- **`flake.nix`**: Development shell with the tools the `Makefile` needs.
- **`docs/`**: Extra documentation.
- **`secrets.example.yaml`**: The secrets the configuration uses (`!secret`), with placeholder values. The real ones go in `secrets.yaml` on the server.
- **`.HA_VERSION`**: The Home Assistant version this configuration was last tested with. It must match the container image tag being run.
  - When upgrading Home Assistant, bump the image tag there and update this file in the same step (e.g. `printf '2026.2.2' > .HA_VERSION`). Also update kiosk-mode to a release that supports the new version (see [docs/vendored.md](./docs/vendored.md)).

### Not in this repository

Part of a working installation lives only on the server, and is ignored by git:

- **`.storage/`**: Everything configured through the UI: integrations and their credentials, devices, entity names, areas, users and helpers.
- **`secrets.yaml`**: Values referenced with `!secret`, such as the names of the home Wi-Fi networks. `secrets.example.yaml` lists them.
- **`home-assistant_v2.db`**: The recorder database with the state history.
- **`backups/`**: Backups made by Home Assistant's backup integration.

Cloning this repository is therefore not enough to rebuild the installation. A full restore needs a Home Assistant backup, or the `home-assistant` Docker volume itself, which holds all of the above.

---

## Initial Setup

Set up a docker container using the official Home Assistant image. For NixOS you can see the config needed [here](https://github.com/ItsShunya/nixfiles/commit/445cf735f5bdf5c721743100190c408d5db6bb01).

Then:

1. Deploy this repository into the container's `/config` directory, as described in [Deploying changes](#deploying-changes).
2. Restart Home Assistant and complete the onboarding.
3. Add the integrations that the dashboards rely on, under **Settings → Devices & services**.
4. Rename their entities to the IDs below (open the entity, then its settings). The cards use these names instead of device-specific ones, so any device can fill each role.

   | Entity ID | What it is | Provided by |
   |---|---|---|
   | `vacuum.robot_vacuum` | Robot vacuum | Xiaomi Miot (Dreame D10 Plus) |
   | `sensor.robot_vacuum_main_brush_left` | Main brush life left (h) | Xiaomi Miot |
   | `sensor.robot_vacuum_side_brush_left` | Side brush life left (h) | Xiaomi Miot |
   | `sensor.robot_vacuum_filter_left` | Filter life left (h) | Xiaomi Miot |
   | `sensor.robot_vacuum_battery` | Vacuum battery (%) | Xiaomi Miot |
   | `sensor.robot_vacuum_charging_state` | Vacuum charging state | Xiaomi Miot |
   | `camera.robot_vacuum_map` | Live vacuum map | Xiaomi Cloud Map Extractor |
   | `sensor.bedroom_temperature` | Bedroom temperature | Alexa Media Player (Echo Dot "bedroom") |
   | `sensor.kitchen_temperature` | Kitchen temperature, also the sidebar's inside temperature | Alexa Media Player (Echo Dot "living room") |
   | `media_player.bedroom_speaker` | Bedroom speaker | Alexa Media Player (Echo Dot "bedroom") |
   | `media_player.kitchen_speaker` | Kitchen speaker | Alexa Media Player (Echo Dot "living room") |
   | `alarm_control_panel.home_alarm` | The alarm | Verisure OWA |
   | `sensor.living_room_temperature` | Living room temperature | Verisure OWA |
   | `sensor.living_room_humidity` | Living room humidity | Verisure OWA |
   | `sensor.living_room_air_quality` | Living room air quality (`Good`, `Fair` or `Poor`) | Verisure OWA |
   | `weather.forecast_home` | Weather forecast | Met.no (already has this name) |

   If you don't have a device for one of them, remove the cards that use it.

   `sensor.pollen` (`packages/pollen.yaml`) and who is home (`packages/presence.yaml`, see [docs/presence.md](./docs/presence.md)) come from this repository.

---

## Deploying changes

The `Makefile` runs these commands on the server over ssh. First copy `local.mk.example` to `local.mk` and set your server in it:

- `HA_SSH`: the server, e.g. `user@host`.
- `HA_CONTAINER`: the container's name, `homeassistant` by default.
- `HA_RESTART`: the restart command, `docker restart` by default.

Deploy with:

```sh
make deploy
```

It uses `git archive`, which only sends committed files, so the server's `.storage/`, database, secrets and backups are never touched. Don't copy the clone's directory into the container instead (e.g. with `docker cp`): that also copies ignored files, like an old `.storage/` or database, over the server's.

Things to keep in mind:

- Only committed changes are deployed. Commit first, or deploy something else with `make deploy REF=<branch>`.
- Files deleted from the repository are **not** deleted on the server. Remove them by hand, e.g. `make exec CMD="rm -r /config/dashboards/old"`.
- Files only needed in the repository (this README, `docs/`, `.github/`, the `Makefile`, the flake, etc.) are left out by `.gitattributes`.

Before applying a change, check that the configuration is valid:

```sh
make check
```

Then apply it:

- **`configuration.yaml`, packages, `custom_templates/` and custom integrations**: restart Home Assistant with `make restart`, or from **Settings → System → Restart**.
- **Dashboards and cards**: open the dashboard with `?disable_km` at the end of the URL, so its header is shown, then open the ⋮ menu, choose **Refresh**, and reload the browser. After editing `www/styles/dashboard.css`, also bump its `?v=` in `configuration.yaml` and restart Home Assistant, or browsers keep the old copy.

`make secrets` edits `secrets.yaml` on the server, and `make shell` opens a shell in the container.

---

## Dashboards

There is a single dashboard, **General** (`dashboards/general/`). [kiosk-mode](https://github.com/NemesisRE/kiosk-mode) hides Home Assistant's own header and sidebar on it (`kiosk_mode:` in `dashboard.yaml`); add `?disable_km` to the URL to get them back. Every view uses the same grid (`layout.yaml`, a [layout-card](https://github.com/thomasloven/lovelace-layout-card) `custom:grid-layout`) that fills the screen:

- On the left, a sidebar (`cards/sidebar/`, adapted from [lukevink/hass-config-lajv](https://github.com/lukevink/hass-config-lajv)):
  - At the top (`top.yaml`), a large clock with the date, and a menu linking to each view. The item of the view being shown is highlighted.
  - At the bottom (`bottom.yaml`), the people's profile pictures (faded when they're away, see [docs/presence.md](./docs/presence.md)), the pollen level (`packages/pollen.yaml`), the weather outside and the temperature inside.
  - Behind them, a panel reaching the screen's edges (`background.yaml`).
- On the right, touching the sidebar, the view's own content. Cards choose their place with `view_layout: grid-area:` (`sidebar`, `top`, `bottom` or `main`).
- On phones (800px wide or less) these stack in a single column, without the panel: top of the sidebar, content, bottom of the sidebar.

The dashboard is drawn for a 1280x840 screen (in CSS pixels, not the screen's resolution) and scales to fit any other one, so the sidebar never needs a scrollbar. The cards write their sizes as `calc(N * var(--dash-px))`, N pixels on that screen. `www/styles/dashboard.css` computes `--dash-px` from the screen size and holds the settings for a different screen:

- `--dash-scale`: everything larger or smaller, on top of the fit (`1.1` is 10% larger).
- `--dash-spacing`: the space between and inside the sidebar's items (`0.8` tightens it by a fifth).
- `--dash-sidebar-width`: the sidebar's width, in drawn pixels.
- `--dash-screen-width` and `--dash-screen-height`: the screen the sizes are drawn for. Raise the height if a scrollbar still appears.

Phones keep the drawn sizes, since there the dashboard scrolls anyway. [docs/dashboard-sizes.md](./docs/dashboard-sizes.md) explains the scaling and why the defaults suit the current tablet. It also covers how to adjust them for another one.

The views:

- **Home** (`views/overview.yaml`): The floor plan (`cards/floorplan.yaml`), scaled to fit the screen. A small tag on each room shows its readings: the temperature, plus humidity and air quality in the living room.
- **Cleaning** (`views/cleaning.yaml`): The interactive robot vacuum map (`cards/vacuum_map.yaml`). From it you can start, pause and send the vacuum home, and clean a selected zone or room.
- **Calendar** (`views/calendar.yaml`): A placeholder until a calendar integration is set up.
- **Music** (`views/music.yaml`): Media controls for the Echo Dots.

To add a view, create it in `views/` with the same `type`, `layout` and first three cards as the others, include it from `dashboard.yaml`, and add an item for it to the menu in `cards/sidebar/top.yaml`.

---

## Development tools

`nix develop` opens a shell with everything the `Makefile` needs. Without Nix, you need `make`, `git`, `ssh`, `yamllint` and Python with PyYAML.

---

## Continuous Integration (CI)

The [Check configuration](./.github/workflows/check.yaml) workflow runs on every push and pull request:

- **yamllint** checks the syntax and style of our own YAML files, using the rules in `.yamllint`. Vendored files are skipped.
- **Referenced files** ([`check_references.py`](./.github/scripts/check_references.py)) follows `configuration.yaml` through every `!include`, dashboard `filename` and `/local/` URL, and fails if a target is missing or isn't valid YAML. Home Assistant's own check doesn't read YAML dashboards, so this is what catches a broken dashboard.
- **check_config** runs Home Assistant's configuration check in the official container, at the version in `.HA_VERSION`, with `secrets.example.yaml` standing in for `secrets.yaml`.

Run the first two locally with `make lint`.

Separately, the [Renovate](https://github.com/apps/renovate) app keeps an **Updates available** issue listing newer upstream releases of Home Assistant and the vendored components, and opens a pull request when the GitHub Actions used by these workflows have a new version. See [docs/vendored.md](./docs/vendored.md).

A green workflow doesn't cover the integrations set up from the UI, which live in `.storage/` on the server. Still check the logs after deploying.

---

## Contributing

While this repository is primarily for personal use, I welcome constructive feedback, tips, and suggestions. If you notice areas for improvement or have ideas for better practices, feel free to open an issue or reach out.

---

## License

This repository is shared under the [Apache-2.0 License](./LICENSE.md). You are free to use and modify the code, but please give credit where it's due.

The third-party integrations in `custom_components/` and cards in `www/plugins/` are vendored copies that keep their own licenses (Apache-2.0 or MIT). See [docs/vendored.md](./docs/vendored.md) for their sources, versions and how to update them.

---

## Acknowledgments

Special thanks to the Home Assistant community and forums for their excellent documentation and support, which made this setup possible.
