![hass-config](https://socialify.git.ci/ItsShunya/hass-config/image?description=1&font=Inter&forks=1&issues=1&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F4%2F49%2FHome_Assistant_logo_%25282023%2529.svg%2F1200px-Home_Assistant_logo_%25282023%2529.svg.png&owner=1&pattern=Overlapping+Hexagons&pulls=1&stargazers=1)


This repository contains the YAML configuration for my [Home Assistant](https://www.home-assistant.io/) installation: the core configuration, dashboards, theme, and the custom integrations and cards it depends on. It is designed for personal use but can serve as a reference for others interested in setting up their HA servers.

Feel free to use parts of this repository, but note that it is tailored to my specific devices and will require adjustments for your use case.

---

## Repository Structure

The repository mirrors the layout of Home Assistant's `/config` directory, so its files can be copied straight into it. Below is an overview of the key components:

### Key Components

- **`configuration.yaml`**: The main configuration file where you define integrations, settings, and core options.
- **`automations.yaml`**, **`scripts.yaml`**, **`scenes.yaml`**: Automations, reusable action sequences, and saved device states. They are empty for now; the UI editors write to these files, so changes made there must be copied back into the repository.
- **`dashboards/`**: Dashboards in YAML mode, registered under `lovelace.dashboards` in `configuration.yaml`.
  - Each subdirectory is one dashboard: a `dashboard.yaml` plus a `views/` folder with one file per view.
- **`cards/`**: Reusable cards, included from views with `!include` so each card is defined once.
- **`themes/`**: Frontend themes, loaded by `frontend.themes`. Currently the [Catppuccin](https://github.com/catppuccin/home-assistant) flavours.
- **`www/`**: Files served by Home Assistant under `/local/`.
  - `images/`: Pictures used by dashboards, like the floor plan.
  - `plugins/`: Custom dashboard cards, loaded under `lovelace.resources` in `configuration.yaml`.
- **`custom_components/`**: Custom integrations not shipped with Home Assistant.
  - These and the cards in `www/plugins/` are vendored copies of third-party projects. [docs/vendored.md](./docs/vendored.md) lists their sources and versions, and how to update them.
- **`docs/`**: Extra documentation.
- **`.HA_VERSION`**: The Home Assistant version this configuration was last tested with. It must match the container image tag being run.
  - When upgrading Home Assistant, bump the image tag there and update this file in the same step (e.g. `printf '2026.2.2' > .HA_VERSION`).

### Not in this repository

Part of a working installation lives only on the server, and is ignored by git:

- **`.storage/`**: Everything configured through the UI: integrations and their credentials, devices, entity names, areas, users and helpers.
- **`secrets.yaml`**: Values referenced with `!secret`. Nothing uses it yet.
- **`home-assistant_v2.db`**: The recorder database with the state history.
- **`backups/`**: Backups made by Home Assistant's backup integration.

Cloning this repository is therefore not enough to rebuild the installation. A full restore needs a Home Assistant backup, or the `home-assistant` Docker volume itself, which holds all of the above.

---

## Initial Setup

Set up a docker container using the official Home Assistant image. For NixOS you can see the config needed [here](https://github.com/ItsShunya/nixfiles/commit/445cf735f5bdf5c721743100190c408d5db6bb01).

Then:

1. Deploy this repository into the container's `/config` directory, as described in [Deploying changes](#deploying-changes).
2. Restart Home Assistant and complete the onboarding.
3. Add the integrations that the dashboards rely on, under **Settings → Devices & services**:

   | Integration | Provides | Entities used by the dashboards |
   |---|---|---|
   | Xiaomi Miot | Robot vacuum | `vacuum.dreame_r2205_ad79_robot_cleaner`, `sensor.dreame_r2205_ad79_*` |
   | Xiaomi Cloud Map Extractor | Live vacuum map | `camera.dreamebot_d10_plus_live_map` |
   | Alexa Media Player | Echo Dot temperature sensors | `sensor.shunya_s_echo_dot_bedroom_temperature`, `sensor.shunya_s_echo_dot_living_room_temperature` |
   | Meteorologisk institutt (Met.no) | Weather forecast | `weather.forecast_home` |

   If an entity gets a different ID, rename it in Home Assistant to the one above, or update the cards that use it.

---

## Deploying changes

Deploy from a clone with `git archive`. It sends only the files committed in git, so the server's `.storage/`, database, secrets and backups are never touched:

```sh
git archive HEAD | ssh shunya@nb250-10n docker exec -i homeassistant tar -x -C /config
```

Do **not** copy the clone's directory into the container (for example with `docker cp ~/<repo>/. homeassistant:/config/`). That also copies any ignored files present in the clone, such as an old `.storage/` or database, and overwrites the server's.

Things to keep in mind:

- Only committed changes are deployed. Commit first, or replace `HEAD` with a branch name to deploy something else.
- Files deleted from the repository are **not** deleted on the server. Remove them by hand, e.g. `ssh shunya@nb250-10n docker exec homeassistant rm -r /config/dashboards/old`.
- Repository-only files (this README, `docs/`, `.github/`, the root license and git/editor settings) are left out of the archive by `.gitattributes`.

Before applying a change, check that the configuration is valid:

```sh
ssh shunya@nb250-10n docker exec homeassistant python -m homeassistant --script check_config -c /config
```

Then apply it:

- **`configuration.yaml` and custom integrations**: restart Home Assistant with `ssh -t shunya@nb250-10n sudo systemctl restart docker-homeassistant.service`, or from **Settings → System → Restart**.
- **Dashboards and cards**: open the dashboard's ⋮ menu and choose **Refresh**, then reload the browser.

In case you want to inspect something inside the container, you can open a shell in it with:

```sh
ssh -t shunya@nb250-10n docker exec -it homeassistant bash
```

---

## Dashboards

There is a single dashboard, **General** (`dashboards/general/`), with two views:

- **Home** (`views/overview.yaml`): A sections view with the weather forecast (`cards/weather_extended.yaml`) and the floor plan with the room temperatures (`cards/floorplan.yaml`).
- **Vacuum** (`views/vacuum.yaml`): A full-screen panel with the interactive robot vacuum map (`cards/vacuum_map.yaml`). From it you can start, pause and send the vacuum home, and clean a selected zone or room.

---

## Continuous Integration (CI)

Not set up yet. Until it is, run the configuration check from [Deploying changes](#deploying-changes) before every deploy.

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
