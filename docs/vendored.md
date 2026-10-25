# Vendored third-party code

Custom integrations (`custom_components/`) and dashboard cards (`www/plugins/`) are copied into this repository instead of being installed with HACS, so a checkout always contains everything the configuration needs. The trade-off is that updates are manual. To make up for it, the [Renovate](https://github.com/apps/renovate) GitHub App compares these components and Home Assistant itself with their latest upstream releases. When something is behind, it lists it in its **Updates available** issue (labelled `updates`), with links to the release notes, and closes the issue once everything is current.

Renovate is configured in [`.github/renovate.json5`](../.github/renovate.json5) to only report these: it opens no branches or pull requests for them unless you tick an update's checkbox in that issue. (The GitHub Actions used by the workflows are the exception: their updates arrive directly as a grouped pull request, checked by CI.) Don't tick them for vendored components, since a pull request would only change the version number, not the code; update by hand as described below, and Renovate notices the new version on its next run.

Renovate reads the installed versions from the repository: `.HA_VERSION`, each integration's `manifest.json` (whose `issue_tracker` URL names the upstream repository), and each card's `?v=` suffix in `configuration.yaml`. When adding a new card, put a `# renovate: repo=<owner>/<name>` comment above its resource in `configuration.yaml`, like the existing ones.

Each vendored folder keeps the upstream `LICENSE` file. This code is **not** covered by the repository's Apache-2.0 license; each component stays under its own license, listed below.

## Integrations

| Folder | Upstream | Version | License |
|---|---|---|---|
| `custom_components/alexa_media` | [alandtse/alexa_media_player](https://github.com/alandtse/alexa_media_player) | `v5.14.0` | Apache-2.0 |
| `custom_components/securitas` | [guerrerotook/securitas-direct-new-api](https://github.com/guerrerotook/securitas-direct-new-api) | `v5.10.0` | Apache-2.0 |
| `custom_components/xiaomi_miot` | [al-one/hass-xiaomi-miot](https://github.com/al-one/hass-xiaomi-miot) | commit [`8b3a31a`](https://github.com/al-one/hass-xiaomi-miot/commit/8b3a31a3a4b25525417b77c4834309f2a08d4439) (between `v1.1.2` and `v1.1.3`) | Apache-2.0 |
| `custom_components/xiaomi_cloud_map_extractor` | [PiotrMachowski/Home-Assistant-custom-components-Xiaomi-Cloud-Map-Extractor](https://github.com/PiotrMachowski/Home-Assistant-custom-components-Xiaomi-Cloud-Map-Extractor) | `v3.0.0-alpha-10` | MIT |

Notes:

- **xiaomi_miot** was taken from the main branch, not a release. Its `manifest.json` says `1.1.2` because upstream had not bumped the version yet. The code is identical to that commit.
- **xiaomi_cloud_map_extractor**: the upstream `v3.0.0-alpha-10` tag ships a `manifest.json` that says `v3.0.0-beta`. It was corrected locally to `v3.0.0-alpha-10`; that is the only difference from upstream.

## Dashboard cards

| Folder | Upstream | Version | License |
|---|---|---|---|
| `www/plugins/card-mod` | [thomasloven/lovelace-card-mod](https://github.com/thomasloven/lovelace-card-mod) | `v4.2.1` | MIT |
| `www/plugins/layout-card` | [thomasloven/lovelace-layout-card](https://github.com/thomasloven/lovelace-layout-card) | `v2.4.7` | MIT |
| `www/plugins/stack-in-card` | [custom-cards/stack-in-card](https://github.com/custom-cards/stack-in-card) | `0.2.0` | MIT |
| `www/plugins/weather-forecast-card` | [troinine/ha-weather-forecast-card](https://github.com/troinine/ha-weather-forecast-card) | `v1.0.0` | MIT |
| `www/plugins/xiaomi-vacuum-map-card` | [PiotrMachowski/lovelace-xiaomi-vacuum-map-card](https://github.com/PiotrMachowski/lovelace-xiaomi-vacuum-map-card) | `v2.3.2` | MIT |

Notes:

- **stack-in-card** has had no release since November 2020. It still works, but if it breaks, a `vertical-stack` with `card_mod` styles that remove the inner borders gives the same result.
- Each card is loaded in `configuration.yaml` under `lovelace.resources` with a `?v=<version>` suffix. Browsers cache these files, so the suffix must change with every update or clients keep running the old version.

## Updating a component

Always replace the whole folder rather than copying files over it: files that upstream deleted would otherwise stay behind.

**Integration** (example: `alexa_media` to `v5.15.0`):

```sh
rm -rf custom_components/alexa_media
curl -sL https://codeload.github.com/alandtse/alexa_media_player/tar.gz/refs/tags/v5.15.0 \
  | tar -xz -C custom_components --strip-components=2 --wildcards '*/custom_components/alexa_media/*'
curl -sL https://raw.githubusercontent.com/alandtse/alexa_media_player/v5.15.0/LICENSE \
  -o custom_components/alexa_media/LICENSE
```

**Card** (example: `xiaomi-vacuum-map-card` to `v2.4.1`):

```sh
curl -sL https://github.com/PiotrMachowski/lovelace-xiaomi-vacuum-map-card/releases/download/v2.4.1/xiaomi-vacuum-map-card.js \
  -o www/plugins/xiaomi-vacuum-map-card/xiaomi-vacuum-map-card.js
```

card-mod and layout-card publish no release files; take `card-mod.js` or `layout-card.js` from the tag instead (e.g. `https://raw.githubusercontent.com/thomasloven/lovelace-card-mod/<tag>/card-mod.js`). layout-card names its license `LICENSE.txt` upstream; it is saved here as `LICENSE`, like the others.

Then:

1. Update the version in the tables above.
2. For a card, bump its `?v=` suffix in `configuration.yaml`.
3. Read the upstream release notes for breaking changes, deploy, and restart Home Assistant (integrations) or reload the browser (cards).
