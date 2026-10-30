# Vendored code

The custom integrations (`custom_components/`) and cards (`www/plugins/`) are copied into the repo instead of installed with HACS, so a checkout has everything the config needs. The catch is that updates are manual.

Each folder keeps its upstream `LICENSE`. This code isn't covered by the repo's Apache-2.0 license.

## Integrations

| Folder | Upstream | Version | License |
|---|---|---|---|
| `custom_components/alexa_media` | [alandtse/alexa_media_player](https://github.com/alandtse/alexa_media_player) | `v5.14.0` | Apache-2.0 |
| `custom_components/securitas` | [guerrerotook/securitas-direct-new-api](https://github.com/guerrerotook/securitas-direct-new-api) | `v5.10.0` | Apache-2.0 |
| `custom_components/xiaomi_miot` | [al-one/hass-xiaomi-miot](https://github.com/al-one/hass-xiaomi-miot) | commit [`8b3a31a`](https://github.com/al-one/hass-xiaomi-miot/commit/8b3a31a3a4b25525417b77c4834309f2a08d4439) (between `v1.1.2` and `v1.1.3`) | Apache-2.0 |
| `custom_components/xiaomi_cloud_map_extractor` | [PiotrMachowski/Home-Assistant-custom-components-Xiaomi-Cloud-Map-Extractor](https://github.com/PiotrMachowski/Home-Assistant-custom-components-Xiaomi-Cloud-Map-Extractor) | `v3.0.0-alpha-10` | MIT |

- **xiaomi_miot** comes from the main branch, not a release. Its `manifest.json` still says `1.1.2` because upstream hadn't bumped it yet.
- **xiaomi_cloud_map_extractor**: the upstream `v3.0.0-alpha-10` tag has `v3.0.0-beta` in its `manifest.json`. I changed it to `v3.0.0-alpha-10`, and that's the only difference from upstream.

## Cards

| Folder | Upstream | Version | License |
|---|---|---|---|
| `www/plugins/card-mod` | [thomasloven/lovelace-card-mod](https://github.com/thomasloven/lovelace-card-mod) | `v4.2.1` | MIT |
| `www/plugins/kiosk-mode` | [NemesisRE/kiosk-mode](https://github.com/NemesisRE/kiosk-mode) | `v10.0.1` | MIT |
| `www/plugins/layout-card` | [thomasloven/lovelace-layout-card](https://github.com/thomasloven/lovelace-layout-card) | `v2.4.7` | MIT |
| `www/plugins/stack-in-card` | [custom-cards/stack-in-card](https://github.com/custom-cards/stack-in-card) | `0.2.0` | MIT |
| `www/plugins/weather-forecast-card` | [troinine/ha-weather-forecast-card](https://github.com/troinine/ha-weather-forecast-card) | `v1.0.0` | MIT |
| `www/plugins/xiaomi-vacuum-map-card` | [PiotrMachowski/lovelace-xiaomi-vacuum-map-card](https://github.com/PiotrMachowski/lovelace-xiaomi-vacuum-map-card) | `v2.3.2` | MIT |

- **kiosk-mode** only works with certain Home Assistant versions, listed at the top of [its README](https://github.com/NemesisRE/kiosk-mode#installation). `v10.0.1` is the last one for 2026.2.x. Don't update it just because Renovate shows a new release: update it with Home Assistant, to the version that table gives.
- **stack-in-card** hasn't had a release since November 2020. It still works, but if it breaks, a `vertical-stack` with `card_mod` removing the inner borders does the same thing.
- The cards are loaded in `configuration.yaml` with a `?v=<version>` at the end. Change it on every update, or browsers keep running the cached file.

## Updating

Replace the whole folder instead of copying files over it, or files that upstream deleted stay behind.

An integration, e.g. `alexa_media` to `v5.15.0`:

```sh
rm -rf custom_components/alexa_media
curl -sL https://codeload.github.com/alandtse/alexa_media_player/tar.gz/refs/tags/v5.15.0 \
  | tar -xz -C custom_components --strip-components=2 --wildcards '*/custom_components/alexa_media/*'
curl -sL https://raw.githubusercontent.com/alandtse/alexa_media_player/v5.15.0/LICENSE \
  -o custom_components/alexa_media/LICENSE
```

A card, e.g. `xiaomi-vacuum-map-card` to `v2.4.1`:

```sh
curl -sL https://github.com/PiotrMachowski/lovelace-xiaomi-vacuum-map-card/releases/download/v2.4.1/xiaomi-vacuum-map-card.js \
  -o www/plugins/xiaomi-vacuum-map-card/xiaomi-vacuum-map-card.js
```

card-mod and layout-card don't publish release files, so take `card-mod.js` or `layout-card.js` from the tag (e.g. `https://raw.githubusercontent.com/thomasloven/lovelace-card-mod/<tag>/card-mod.js`). layout-card's license is `LICENSE.txt` upstream; it's saved here as `LICENSE` like the others.

Then update the version in the tables above, bump the card's `?v=` in `configuration.yaml`, and read the release notes for breaking changes. Deploy, then restart Home Assistant for an integration or reload the browser for a card.

## Renovate

The [Renovate](https://github.com/apps/renovate) app compares these components and Home Assistant with their latest releases. Whatever is behind shows up in an issue called **Updates available**, with links to the release notes. The issue closes itself once everything is up to date.

It's set up in [`.github/renovate.json5`](../.github/renovate.json5) to only report. Don't tick the checkboxes in the issue for vendored code: the PR would only change the version number, not the code. Update by hand as above and Renovate sees the new version on its next run. GitHub Actions are the exception, their updates come straight in as one grouped PR.

Renovate reads the current versions from `.HA_VERSION`, each integration's `manifest.json` (the `issue_tracker` URL tells it the repo) and each card's `?v=` in `configuration.yaml`. A new card needs a `# renovate: repo=<owner>/<name>` comment above its line in `configuration.yaml`, like the others.
