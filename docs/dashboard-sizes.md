# Fitting the dashboard to a tablet

The General dashboard scales itself to the screen it's shown on, so the sidebar fits without a scrollbar. The settings that control it are in [`www/styles/dashboard.css`](../www/styles/dashboard.css). This page explains how the scaling works and why the defaults suit the current tablet. It also covers how to adjust them for another one.

## How the scaling works

Browsers lay pages out in **CSS pixels**, not in the screen's own pixels. A tablet's device pixel ratio says how many screen pixels make one CSS pixel. On Android, the ratio is the display density divided by 160:

| Screen | Pixel ratio | CSS pixels |
|---|---|---|
| 1280x800 | 1 | 1280x800 |
| 1280x800 | 1.33 | 962x601 |
| 1920x1200 | 1.5 | 1280x800 |
| 2560x1600 | 2 | 1280x800 |

So a sharper screen doesn't necessarily give the dashboard more room: it usually draws the same layout with more detail.

Every size in the dashboard's cards is written as `calc(N * var(--dash-px))`, and every gap or padding as `calc(N * var(--dash-space-px))`. `N` is the size in pixels on the screen the dashboard is drawn for, 1280x840 CSS pixels. `dashboard.css` works out the two variables from the size of the visible area:

```
--dash-px       = --dash-scale * min(width / --dash-screen-width, height / --dash-screen-height)
--dash-space-px = --dash-px * --dash-spacing
```

The smaller of the two ratios wins, so the dashboard fits both ways, like a picture scaled to fit. On a screen shorter than 840 CSS pixels everything shrinks; on a larger one it grows.

Some things to keep in mind:

- **The visible area is what counts.** Android's status bar (about 24 CSS pixels) and navigation bar (about 48) take space from the screen, unless the app showing the dashboard runs fullscreen.
- **Phones** (800 CSS pixels wide or less) get a single column that scrolls, and keep the drawn sizes. A tablet in portrait is usually that narrow too, so keep the tablet in landscape.
- **Not everything scales.** layout-card's 4px margins around each card stay fixed. So do the insides of third-party cards (the vacuum map's buttons and tiles) and of Home Assistant's media cards. The floor plan fits itself to the space it gets.

## The settings

All in `:root` at the top of [`www/styles/dashboard.css`](../www/styles/dashboard.css):

| Setting | Default | What it does |
|---|---|---|
| `--dash-screen-width` | `1280` | Width of the screen the sizes are drawn for, in CSS pixels (no unit). |
| `--dash-screen-height` | `840` | Height of that screen. |
| `--dash-scale` | `1` | Makes everything larger or smaller, on top of the fit: `1.1` is 10% larger. Above 1, the sidebar may stop fitting. |
| `--dash-spacing` | `1` | Space between and inside the sidebar's items, relative to their size: `0.8` is tighter, `1.2` airier. |
| `--dash-sidebar-width` | `312` | The sidebar's width, in drawn pixels. It scales like everything else. |

The rest of the file computes `--dash-px` and `--dash-space-px` from these. Leave that part as it is.

## The current tablet: Huawei MediaPad T3 10 (AGS-W09)

The dashboard runs on a Huawei MediaPad T3 10 (model AGS-W09). It has a 9.6" screen of 1280x800 pixels at 157 ppi.

Its specifications don't list the pixel ratio Android uses, and the **Display size** setting under **Settings → Display** changes it. For a 1280x800 tablet it is normally 1 or 1.33. With or without the system bars, the dashboard sees one of these areas:

| Pixel ratio | System bars | Visible area | `--dash-px` | Sidebar width | Clock size |
|---|---|---|---|---|---|
| 1 | hidden | 1280x800 | 0.95 | 297px | 76px |
| 1 | shown | 1280x728 | 0.87 | 270px | 69px |
| 1.33 | hidden | 962x601 | 0.72 | 223px | 57px |
| 1.33 | shown | 962x529 | 0.63 | 197px | 50px |

In each case the sidebar fits.

To find out which ratio the tablet uses, enable Developer options (tap **Build number** seven times in the **About tablet** settings). Then check **Smallest width** in Developer options. That is the short side of the screen in CSS pixels: 800 means a ratio of 1, 600 means 1.33.

Why these defaults:

- **`1280`** is the width the dashboard was designed at, with a 312px sidebar. It matches the tablet at a pixel ratio of 1.
- **`840`** comes from the sidebar's height. At its drawn sizes, the sidebar's content is up to about 800px tall: more on days when the date wraps onto a second line. The fixed card margins add 24px that don't shrink with the rest. The extra 40px leaves room for both, and for rounding.
- **`--dash-scale` and `--dash-spacing` at `1`** keep the design as drawn. The fit alone is enough on this tablet.

## Adapting to another tablet

1. **Work out its size in CSS pixels.** Divide its resolution by its pixel ratio, or read **Smallest width** in Developer options as above. Then subtract the system bars if they'll be shown. For example, a 2000x1200 tablet at a pixel ratio of 1.5 is 1333x800. That gives `--dash-px` = min(1333/1280, 800/840) = 0.95, the same as the current tablet.
2. **Try it before changing anything.** The dashboard already fits any screen in landscape, so the defaults may be all it needs.
3. **Adjust what doesn't look right:**

   | What you see | Change |
   |---|---|
   | A scrollbar on every view | Raise `--dash-screen-height` (e.g. `880`), or lower `--dash-scale`. |
   | Everything looks small, with a large gap between the menu and the bottom of the sidebar | Raise `--dash-scale` (e.g. `1.1`), or lower `--dash-screen-height` towards `800`. |
   | The sidebar's items feel crowded, or too spread out | Lower or raise `--dash-spacing`. |
   | The date or menu text is cut short, or the content area feels narrow | Raise or lower `--dash-sidebar-width`. |
   | On a squarer screen (4:3, e.g. 1024x768), everything is smaller than the height allows | Lower `--dash-screen-width` to the screen's width, so the height decides. For 1024x768 this changes `--dash-px` from 0.80 to 0.91. |

4. **Try new values on a computer first.** Restarting Home Assistant for each attempt is slow. Instead:
   1. Open the dashboard in Chrome and press F12. Turn on the device toolbar (Ctrl+Shift+M), and type the tablet's size in CSS pixels.
   2. In the **Elements** panel, select the `<html>` element. Add the settings under `element.style`, e.g. `--dash-scale: 1.1;`.
   3. The dashboard updates as you type. Reloading the page drops the changes.

   Leave out `?disable_km` while trying, since the header it shows takes 56px of height.
5. **Apply them.** Edit `www/styles/dashboard.css`, then bump the `?v=` of its resource in `configuration.yaml`. Browsers cache the stylesheet, so without a new `?v=` the tablet keeps the old values. Commit, deploy, and restart Home Assistant, which reads the resources in `configuration.yaml` only at startup. Then reload the dashboard on the tablet.

## Sizes in new cards

To keep a new card in proportion with the rest, write its sizes the same way:

```yaml
card_mod:
  style: |
    ha-card {
      font-size: calc(18 * var(--dash-px));
      padding: calc(8 * var(--dash-space-px)) calc(16 * var(--dash-space-px));
    }
```

Use `--dash-px` for sizes (text, icons, widths, borders) and `--dash-space-px` for gaps, padding and margins. These are 18px and 8px/16px on the 1280x840 screen, scaled to the one showing the dashboard.
