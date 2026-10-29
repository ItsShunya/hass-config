# Presence

Home Assistant knows who is home from each person's phone. The Home Assistant app on the phone reports two things:

- **Its location.** It feeds the phone's location tracker, which is assigned to the person. The person is `home` while the phone is inside the home zone.
- **The Wi-Fi network it's connected to.**

[`packages/presence.yaml`](../packages/presence.yaml) combines them into one presence sensor per person. The sensor is **Home** while the person is in the home zone **or** their phone is on the home Wi-Fi.

The Wi-Fi catches an arrival as soon as the phone joins the network. It also keeps someone home when their phone's location drifts out of the zone indoors. The sidebar shows these sensors: a person's picture fades while they're away.

| Person | Phone | Location tracker | Wi-Fi sensor | Presence sensor |
|---|---|---|---|---|
| `person.victor` | Vivo X300 (Android) | `device_tracker.shunya_vivox300` | `sensor.shunya_vivox300_wi_fi_connection` | `binary_sensor.victor_presence` |
| `person.jhuseidi` | iPhone | `device_tracker.jhuseidi` | `sensor.jhuseidi_ssid` | `binary_sensor.jhuseidi_presence` |

If the app gives a phone's entities other IDs, rename them in Home Assistant to the ones above (open the entity, then its settings), or change them in `packages/presence.yaml`.

`person.shunya` belongs to the owner's account. It has no phone and isn't shown.

## Setting it up

### Home Assistant

1. **Home zone.** Under **Settings → Areas, labels & zones → Zones**, check that **Home** is on the house and its radius is about 100 m. With a smaller radius, the phone's location can drift out of the zone while you're indoors. With a larger one, departures are noticed later.
2. **Home Wi-Fi.** List the home networks' names (SSIDs) in `secrets.yaml` on the server, under `home_wifi`, as in [`secrets.example.yaml`](../secrets.example.yaml). Use a list even for a single network, and include every name the router broadcasts, e.g. a separate 5 GHz one. They're kept out of the repository because a network's name can be looked up on a map. To edit the file:

   ```sh
   ssh -t shunya@nb250-10n docker exec -it homeassistant vi /config/secrets.yaml
   ```

   Then deploy and restart Home Assistant (see the README). Until `home_wifi` is set, the configuration check fails.
3. **Pictures.** Give each person a picture under **Settings → People**. The sidebar shows it.

### Victor's phone (Android)

The app is already connected, logged in as `shunya`, so its location tracker was added to that account's person.

1. Under **Settings → People**, remove `device_tracker.shunya_vivox300` from **Shunya** and add it to **Victor**.
2. In the app, under **Settings → Companion app → Manage sensors**, enable **Wi-Fi connection**. It's off by default.
3. In Android's settings for the app, set location access to **Allow all the time**, with precise location on.
4. Vivo's battery management stops apps in the background, and then the phone stops reporting. Exempt the app as described at [dontkillmyapp.com/vivo](https://dontkillmyapp.com/vivo).

### Her iPhone

1. Install **Home Assistant** from the App Store and log in with her own user, `jhuseidi`. The app's location tracker is then added to her person. Check it under **Settings → People**.
2. Check the IDs of the new entities under **Settings → Devices & services → Mobile App**, against the table above.
3. In iOS's **Settings → Home Assistant**, set **Location** to **Always** with **Precise Location** on, and turn on **Background App Refresh**. Without location access, the app can't read the Wi-Fi network's name either.

The iPhone app can only report while iOS lets it run: when the phone moves, when the app is opened, and in the background now and then. After she leaves, it can take a few minutes to see the phone is off the home Wi-Fi.

## Checking it

Tap a picture in the sidebar to see that sensor's history. **Developer tools → States** shows the person, location tracker and Wi-Fi sensor of each phone, to see which of them is off.
