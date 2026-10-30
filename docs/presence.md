# Presence

Home Assistant knows who is home from each person's phone. The Home Assistant app on the phone reports two things:

- **Its location.** It feeds the phone's location tracker, which is assigned to the person. The person is `home` while the phone is inside the home zone.
- **The Wi-Fi network it's connected to.**

[`packages/presence.yaml`](../packages/presence.yaml) combines them into one sensor, `sensor.people_home`. Someone is home while they're in the home zone **or** their phone is on the home Wi-Fi. The sensor's state is how many people are home, and its `people` attribute says, for each person, whether they're home.

The Wi-Fi catches an arrival as soon as the phone joins the network. It also keeps someone home when their phone's location drifts out of the zone indoors.

The sidebar shows each person's picture, faded while they're away. It has room for four people: `binary_sensor.presence_1` to `binary_sensor.presence_4` each show one person from `sensor.people_home`, in the same order, and the ones nobody fills are hidden. A fifth person is still counted by `sensor.people_home`, but not shown.

## Who is tracked

Nobody is listed in the configuration. The macro in [`custom_templates/presence.jinja`](../custom_templates/presence.jinja) finds them:

- **People:** everyone with at least one device tracker assigned under **Settings → People**. A person without one, like the account of someone who doesn't carry a phone, isn't shown.
- **Their Wi-Fi:** for each tracker, the Wi-Fi sensor on the same device, by the ID the app gives it: `sensor.<phone>_wi_fi_connection` on Android, `sensor.<phone>_ssid` on iPhone. If you rename a phone's Wi-Fi sensor, keep that ending.

To track someone new, add their person, install the app on their phone and set it up as below. Nothing in this repository changes.

## Setting it up

### Home Assistant

1. **Home zone.** Under **Settings → Areas, labels & zones → Zones**, check that **Home** is on the house and its radius is about 100 m. With a smaller radius, the phone's location can drift out of the zone while you're indoors. With a larger one, departures are noticed later.
2. **Home Wi-Fi.** List the home networks' names (SSIDs) in `secrets.yaml` on the server, under `home_wifi`, as in [`secrets.example.yaml`](../secrets.example.yaml). Use a list even for a single network, and include every name the router broadcasts, e.g. a separate 5 GHz one. They're kept out of the repository because a network's name can be looked up on a map. To edit the file:

   ```sh
   ssh -t shunya@nb250-10n docker exec -it homeassistant vi /config/secrets.yaml
   ```

   Then deploy and restart Home Assistant (see the README). Until `home_wifi` is set, the configuration check fails.
3. **People.** Under **Settings → People**, add a person for each member of the household, with a picture. The sidebar shows it.

### Each phone

Install the Home Assistant app and log in with the person's own user. The app's location tracker is then added to that user's person. Check it under **Settings → People**. If the phone was logged in with someone else's user, its tracker went to their person: move it from there to the right one.

#### Android

1. In the app, under **Settings → Companion app → Manage sensors**, enable **Wi-Fi connection**. It's off by default.
2. In Android's settings for the app, set location access to **Allow all the time**, with precise location on.
3. Some makers' battery management stops apps in the background, and then the phone stops reporting. If it does, exempt the app as described at [dontkillmyapp.com](https://dontkillmyapp.com/) for the phone's maker.

#### iPhone

1. In iOS's **Settings → Home Assistant**, set **Location** to **Always** with **Precise Location** on, and turn on **Background App Refresh**. Without location access, the app can't read the Wi-Fi network's name either.

The iPhone app can only report while iOS lets it run: when the phone moves, when the app is opened, and in the background now and then. After someone leaves, it can take a few minutes to see the phone is off the home Wi-Fi.

## Checking it

The pictures in the sidebar don't react to taps. **Developer tools → States** shows `sensor.people_home` with who is home, and the person, location tracker and Wi-Fi sensor of each phone, to see which of them is off.
