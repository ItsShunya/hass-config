![hass-config](https://socialify.git.ci/ItsShunya/hass-config/image?description=1&font=Inter&forks=1&issues=1&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F4%2F49%2FHome_Assistant_logo_%25282023%2529.svg%2F1200px-Home_Assistant_logo_%25282023%2529.svg.png&owner=1&pattern=Overlapping+Hexagons&pulls=1&stargazers=1)

My [Home Assistant](https://www.home-assistant.io/) config: a dashboard for a wall tablet, a few packages, and the custom integrations and cards they need.

It's built around my devices, so it won't work as is in your home. [docs/make-it-yours.md](docs/make-it-yours.md) lists what to change.

## What's where

The repo has the same layout as Home Assistant's `/config` folder.

| Path | What it is |
|---|---|
| `configuration.yaml` | Main config |
| `packages/` | One file per feature (vacuum, presence, pollen) with its sensors, scripts and automations |
| `custom_templates/` | Jinja macros used by the packages |
| `dashboards/` | YAML dashboards: a `dashboard.yaml` and a `views/` folder each |
| `cards/` | Cards shared between views |
| `themes/` | [Catppuccin](https://github.com/catppuccin/home-assistant) |
| `www/` | Served under `/local/`: images, third-party cards (`plugins/`) and the dashboard stylesheet (`styles/`) |
| `custom_components/` | Third-party integrations |
| `docs/` | Longer docs |

`automations.yaml`, `scripts.yaml` and `scenes.yaml` are empty. I write everything by hand in packages, but the UI editors can only edit these files, so anything made in the UI ends up there. Copy it back into the repo.

The third-party integrations and cards are copied in instead of installed with HACS. [docs/vendored.md](docs/vendored.md) has their versions and how to update them.

Not everything is in git. `.storage/` (anything set up in the UI: integrations, devices, entity names, users), `secrets.yaml`, the database and backups only exist on the server. To rebuild the install from scratch you need a Home Assistant backup, not just this repo.

## Setup

Home Assistant runs in Docker with the official image, at the version in `.HA_VERSION` ([my NixOS config for it](https://github.com/ItsShunya/nixfiles/commit/445cf735f5bdf5c721743100190c408d5db6bb01)).

1. Copy `local.mk.example` to `local.mk` and set your server in it.
2. Run `make deploy`, then `make secrets` and fill in what `secrets.example.yaml` lists.
3. Run `make restart` and go through the onboarding.
4. Add the integrations under **Settings → Devices & services**, then rename their entities to the IDs below. The cards use these names instead of device-specific ones, so any device can fill each role.

| Entity ID | What it is | From |
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
| `alarm_control_panel.home_alarm` | Alarm | Verisure OWA |
| `sensor.living_room_temperature` | Living room temperature | Verisure OWA |
| `sensor.living_room_humidity` | Living room humidity | Verisure OWA |
| `sensor.living_room_air_quality` | Living room air quality (`Good`, `Fair` or `Poor`) | Verisure OWA |
| `weather.forecast_home` | Weather forecast | Met.no (already named this) |

If you don't have one of these, remove the cards that use it. The pollen and presence sensors come from the packages; presence needs some setup on each phone, see [docs/presence.md](docs/presence.md).

## Deploying

Run `make` to see all the commands. Day to day it's:

```sh
make deploy    # copy the committed files into /config
make check     # validate the config on the server
make restart
```

`make deploy` pipes `git archive` into the container, so only committed files are sent and the server's `.storage/`, database and secrets are left alone. Add `REF=<branch>` to deploy something other than `HEAD`. Don't `docker cp` the clone instead, or you'll copy ignored files like an old `.storage/` over the server's.

Deleting a file here doesn't delete it on the server. Do that by hand with `make exec CMD="rm ..."`.

Changes to the config, packages, templates or integrations need a restart. For dashboard changes, open the dashboard with `?disable_km` at the end of the URL, pick **Refresh** in the ⋮ menu and reload the page.

To upgrade Home Assistant, change the image tag on the server and `.HA_VERSION` together. Update kiosk-mode at the same time, since each release only supports a few Home Assistant versions (see [docs/vendored.md](docs/vendored.md)).

## Dashboard

There's one dashboard, **General**, made for a 1280x800 tablet on the wall. Every view shares a sidebar with a clock, a menu, who's home, pollen and the temperature. The views are Home (floor plan), Cleaning (vacuum map), Calendar and Music. [docs/dashboard.md](docs/dashboard.md) explains how it's laid out and how it scales to other screens.

## Development

`nix develop` gives you everything the Makefile needs. Without Nix you need `make`, `git`, `ssh`, `yamllint` and Python with PyYAML.

[CI](.github/workflows/check.yaml) runs on every push:

- `yamllint` on our own YAML (vendored files are skipped).
- [`check_references.py`](.github/scripts/check_references.py), which follows every `!include`, dashboard file and `/local/` URL from `configuration.yaml` and fails if one is missing. Home Assistant's own check doesn't read YAML dashboards, so this is what catches a broken one.
- Home Assistant's `check_config` at the version in `.HA_VERSION`, with `secrets.example.yaml` as the secrets.

`make lint` runs the first two locally. None of this checks the integrations set up in the UI, so look at the logs after deploying.

[Renovate](https://github.com/apps/renovate) opens an **Updates available** issue when Home Assistant or a vendored component has a new release, and PRs for GitHub Actions updates.

## License

[Apache-2.0](LICENSE.md). The vendored code in `custom_components/` and `www/plugins/` keeps its own license (Apache-2.0 or MIT), listed in [docs/vendored.md](docs/vendored.md).

The sidebar is adapted from [lukevink/hass-config-lajv](https://github.com/lukevink/hass-config-lajv). Issues and suggestions are welcome.
