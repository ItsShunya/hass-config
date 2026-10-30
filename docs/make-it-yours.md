# Making it yours

Most of this works in any home. Start with the [setup in the README](../README.md#setup), then change the parts below.

## Reverse proxy

`configuration.yaml` trusts a reverse proxy on the same host. If yours runs somewhere else, add its address to `trusted_proxies`. With no proxy, remove `use_x_forwarded_for` and `trusted_proxies`.

## Devices

Rename your entities to match the [table in the README](../README.md#setup). If your rooms or devices are different, edit the cards that use them:

- `cards/floorplan_elements.yaml`: room readings and the alarm.
- `cards/sidebar/bottom.yaml`: inside temperature and weather.
- `dashboards/general/views/music.yaml`: speakers.
- `cards/vacuum_map.yaml` and `packages/vacuum.yaml`: the vacuum.

## People

Nothing to edit. Add the people and set up their phones as in [presence.md](presence.md).

## Floor plan

1. Replace `www/images/floor_plan.png`.
2. Set `--plan-ratio` in `cards/floorplan.yaml` to the image's width / height.
3. Move the room tags in `cards/floorplan_elements.yaml`.

## Vacuum

- Redraw your rooms under `predefined_selections` in `cards/vacuum_map.yaml`.
- If it isn't a Dreame on Xiaomi Miot, also rewrite the two scripts in `packages/vacuum.yaml` and change `vacuum_platform` in `cards/vacuum_map.yaml`.

## Screen

The dashboard is made for a 1280x800 tablet. For other screens, see [dashboard.md](dashboard.md#another-tablet).

## Removing features

| Feature | Remove |
|---|---|
| A view | Its file in `dashboards/general/views/`, its line in `dashboard.yaml` and its menu item in `cards/sidebar/top.yaml` |
| Vacuum | The Cleaning view, `packages/vacuum.yaml`, `cards/vacuum_map.yaml`, `custom_components/xiaomi_*`, and `www/plugins/xiaomi-vacuum-map-card` with its line in `configuration.yaml` |
| Echo Dots | The Music view, `custom_components/alexa_media`, and their temperatures in the floor plan and sidebar |
| Alarm | `custom_components/securitas`, and the Alarm and Living room tags in `cards/floorplan_elements.yaml` |
| Presence | `packages/presence.yaml`, `custom_templates/presence.jinja` and the glance card in `cards/sidebar/bottom.yaml` |
| Pollen | `packages/pollen.yaml`, and its row and ring styling in `cards/sidebar/bottom.yaml` |

Take removed components out of the tables in [vendored.md](vendored.md) too, and delete the files on the server with `make exec`, since deploying won't.
