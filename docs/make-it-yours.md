# Making it yours

Most of this repository works in any home. This is what you need to change.

## Server

- Copy `local.mk.example` to `local.mk` and set your server.
- Run the Home Assistant version in `.HA_VERSION`. If you change it, update kiosk-mode too (see [vendored.md](vendored.md)).
- `configuration.yaml` expects a reverse proxy on the same host. If yours is elsewhere, add it to `trusted_proxies`. With no proxy, remove `use_x_forwarded_for` and `trusted_proxies`.

Then follow the README's [Initial Setup](../README.md#initial-setup), and fill in your secrets with `make secrets` (see `secrets.example.yaml`).

## Devices

The cards name entities by what they are (`sensor.bedroom_temperature`), not by device. Rename yours to match the table in the README.

If your rooms or devices are different, edit the cards that use them:

- `cards/floorplan_elements.yaml`: room readings and the alarm.
- `cards/sidebar/bottom.yaml`: inside temperature and weather.
- `dashboards/general/views/music.yaml`: speakers.
- `cards/vacuum_map.yaml` and `packages/vacuum.yaml`: the vacuum.

## People

Nothing to edit. Set up the people and their phones as in [presence.md](presence.md).

## Floor plan

1. Replace `www/images/floor_plan.png`.
2. Set `--plan-ratio` in `cards/floorplan.yaml` to the image's width / height.
3. Edit the room tags in `cards/floorplan_elements.yaml`.

## Vacuum

- Redraw your rooms under `predefined_selections` in `cards/vacuum_map.yaml`.
- If it isn't a Dreame on Xiaomi Miot, also rewrite the two scripts in `packages/vacuum.yaml` and set `vacuum_platform` in `cards/vacuum_map.yaml`.

## Screen

The dashboard is drawn for a 1280x840 tablet. For other screens, see [dashboard-sizes.md](dashboard-sizes.md).

## Removing features

| Feature | Remove |
|---|---|
| A view | Its file in `dashboards/general/views/`, its line in `dashboard.yaml` and its menu item in `cards/sidebar/top.yaml` |
| Vacuum | The Cleaning view, `packages/vacuum.yaml`, `cards/vacuum_map.yaml`, `custom_components/xiaomi_*`, and `www/plugins/xiaomi-vacuum-map-card` with its line in `configuration.yaml` |
| Echo Dots | The Music view, `custom_components/alexa_media`, and their temperatures in the floor plan and sidebar |
| Alarm | `custom_components/securitas`, and the Alarm and Living room tags in `cards/floorplan_elements.yaml` |
| Presence | `packages/presence.yaml`, `custom_templates/presence.jinja` and the glance card in `cards/sidebar/bottom.yaml` |
| Pollen | `packages/pollen.yaml`, and its row and ring styling in `cards/sidebar/bottom.yaml` |

Also remove vendored components from [vendored.md](vendored.md). Deploying doesn't delete files on the server, so remove them there with `make exec`.
