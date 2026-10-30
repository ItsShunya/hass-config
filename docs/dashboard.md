# Dashboard

There's one dashboard, General, in `dashboards/general/`. [kiosk-mode](https://github.com/NemesisRE/kiosk-mode) hides Home Assistant's header and sidebar on it (`kiosk_mode:` in `dashboard.yaml`). Add `?disable_km` to the URL to get them back.

## Layout

Every view uses the same grid, defined in `layout.yaml` with [layout-card](https://github.com/thomasloven/lovelace-layout-card):

- On the left, the sidebar (`cards/sidebar/`). `top.yaml` has the clock, the date and a menu with one item per view. `bottom.yaml` has the people's pictures (faded when they're away, see [presence.md](presence.md)), pollen, the weather and the inside temperature. `background.yaml` is the panel behind them.
- On the right, the view's own content.

Cards pick their spot with `view_layout: grid-area:` set to `sidebar`, `top`, `bottom` or `main`. On phones (800px wide or less) it all stacks in one column: top of the sidebar, content, bottom of the sidebar.

## Views

- **Home** (`views/overview.yaml`): the floor plan (`cards/floorplan.yaml`) with a tag on each room for its temperature, plus humidity and air quality in the living room, and one for the alarm. The tags are in `cards/floorplan_elements.yaml`.
- **Cleaning** (`views/cleaning.yaml`): the vacuum map (`cards/vacuum_map.yaml`). Start, pause or dock the vacuum, or clean a zone or a room.
- **Calendar** (`views/calendar.yaml`): a placeholder until I set up a calendar integration.
- **Music** (`views/music.yaml`): media controls for the Echo Dots.

To add a view, copy one of them (they all start with the same `type`, `layout` and three sidebar cards), include it in `dashboard.yaml` and add a menu item for it in `cards/sidebar/top.yaml`.

## Sizing

The dashboard is drawn for a 1280x840 screen and scales to fit the one it's shown on, so the sidebar never needs a scrollbar. The settings are in [`www/styles/dashboard.css`](../www/styles/dashboard.css).

### How it works

Browsers lay out pages in CSS pixels, not in the screen's real pixels. The device pixel ratio is how many real pixels make one CSS pixel. On Android it's the display density divided by 160:

| Screen | Pixel ratio | CSS pixels |
|---|---|---|
| 1280x800 | 1 | 1280x800 |
| 1280x800 | 1.33 | 962x601 |
| 1920x1200 | 1.5 | 1280x800 |
| 2560x1600 | 2 | 1280x800 |

So a sharper screen usually doesn't give the dashboard more room, just more detail.

Sizes in the cards are written as `calc(N * var(--dash-px))` and gaps or padding as `calc(N * var(--dash-space-px))`, where N is the size in pixels on the 1280x840 screen. `dashboard.css` works both out from the visible area:

```
--dash-px       = --dash-scale * min(width / --dash-screen-width, height / --dash-screen-height)
--dash-space-px = --dash-px * --dash-spacing
```

The smaller ratio wins, so it fits both ways, like a picture scaled to fit. On a screen shorter than 840 CSS pixels everything shrinks, and on a bigger one it grows.

A few catches:

- Only the visible area counts. Android's status bar (about 24 CSS pixels) and navigation bar (about 48) take part of it, unless the app runs fullscreen.
- Phones keep the drawn sizes, since they scroll anyway. A tablet in portrait is usually narrow enough to count as a phone, so keep it in landscape.
- Some things don't scale: layout-card's 4px margin around each card, the insides of third-party cards (the vacuum map's buttons and tiles) and Home Assistant's media cards. The floor plan fits itself to the space it gets.

### Settings

They're in `:root` at the top of `dashboard.css`. Leave the computed values below them alone.

| Setting | Default | What it does |
|---|---|---|
| `--dash-screen-width` | `1280` | Width of the screen the sizes are drawn for, in CSS pixels (no unit) |
| `--dash-screen-height` | `840` | Height of that screen |
| `--dash-scale` | `1` | Makes everything bigger or smaller on top of the fit: `1.1` is 10% bigger. Above 1 the sidebar may stop fitting |
| `--dash-spacing` | `1` | Space between and inside the sidebar's items: `0.8` is tighter, `1.2` looser |
| `--dash-sidebar-width` | `312` | Sidebar width in drawn pixels. It scales like everything else |

### The current tablet

A Huawei MediaPad T3 10 (AGS-W09): 9.6", 1280x800 at 157 ppi. Its pixel ratio isn't in the specs and changes with **Settings → Display → Display size**. For a 1280x800 tablet it's normally 1 or 1.33, so the dashboard sees one of these:

| Pixel ratio | System bars | Visible area | `--dash-px` | Sidebar width | Clock size |
|---|---|---|---|---|---|
| 1 | hidden | 1280x800 | 0.95 | 297px | 76px |
| 1 | shown | 1280x728 | 0.87 | 270px | 69px |
| 1.33 | hidden | 962x601 | 0.72 | 223px | 57px |
| 1.33 | shown | 962x529 | 0.63 | 197px | 50px |

The sidebar fits in all four. To see which ratio it uses, turn on Developer options (tap **Build number** seven times under **About tablet**) and check **Smallest width** there: 800 means a ratio of 1, 600 means 1.33.

Why the defaults are what they are:

- `1280` is the width I designed it at, with a 312px sidebar. That's this tablet at a ratio of 1.
- `840` comes from the sidebar. Its content is up to about 800px tall (a bit more on days when the date wraps onto two lines), and the card margins add 24px that don't scale. The extra 40px covers both, plus rounding.
- `--dash-scale` and `--dash-spacing` stay at `1`, since the fit alone is enough on this tablet.

### Another tablet

1. Work out its size in CSS pixels: the resolution divided by the pixel ratio (or **Smallest width**, as above), minus the system bars if they'll show. A 2000x1200 tablet at a ratio of 1.5 is 1333x800, which gives `--dash-px` = min(1333/1280, 800/840) = 0.95, the same as mine.
2. Try it as is first. It already fits any screen in landscape, so the defaults might be fine.
3. Fix what looks wrong:

   | What you see | Change |
   |---|---|
   | A scrollbar on every view | Raise `--dash-screen-height` (e.g. `880`), or lower `--dash-scale` |
   | Everything looks small, with a big gap between the menu and the bottom of the sidebar | Raise `--dash-scale` (e.g. `1.1`), or lower `--dash-screen-height` towards `800` |
   | The sidebar feels crowded, or too spread out | Lower or raise `--dash-spacing` |
   | The date or menu text gets cut off, or the content feels narrow | Raise or lower `--dash-sidebar-width` |
   | On a squarer screen (4:3, e.g. 1024x768) everything is smaller than the height allows | Set `--dash-screen-width` to the screen's width so the height decides. For 1024x768 this takes `--dash-px` from 0.80 to 0.91 |

4. Test new values in Chrome rather than restarting Home Assistant each time. Open the dashboard, press F12, turn on the device toolbar (Ctrl+Shift+M) and enter the tablet's size in CSS pixels. Select `<html>` in the Elements panel and add the settings under `element.style`, e.g. `--dash-scale: 1.1;`. The page updates as you type, and a reload throws the changes away. Don't add `?disable_km` while testing, since the header takes 56px of height.
5. Put the values in `dashboard.css` and bump its `?v=` in `configuration.yaml`, or browsers keep the cached copy. Deploy and restart (Home Assistant only reads the resources at startup), then reload the tablet.

### Sizes in new cards

Write sizes the same way so new cards stay in proportion with the rest:

```yaml
card_mod:
  style: |
    ha-card {
      font-size: calc(18 * var(--dash-px));
      padding: calc(8 * var(--dash-space-px)) calc(16 * var(--dash-space-px));
    }
```

Use `--dash-px` for sizes (text, icons, widths, borders) and `--dash-space-px` for gaps, padding and margins.
