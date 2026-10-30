# Presence

The sidebar shows who is home, using the Home Assistant app on each person's phone. Someone counts as home if:

- their phone is inside the home zone, or
- their phone is connected to the home Wi-Fi.

The Wi-Fi catches arrivals quickly, and keeps people home when their phone's location drifts out of the zone indoors.

This is done by [`packages/presence.yaml`](../packages/presence.yaml):

- `sensor.people_home`: how many people are home. Its `people` attribute lists each person and whether they're home.
- `binary_sensor.presence_1` to `binary_sensor.presence_4`: one per person, for the sidebar. It shows up to four people.

## Who is tracked

No one is listed in the configuration. [`custom_templates/presence.jinja`](../custom_templates/presence.jinja) tracks everyone with a device tracker under **Settings → People**, and finds their phone's Wi-Fi sensor by its ID: `sensor.<phone>_wi_fi_connection` on Android, `sensor.<phone>_ssid` on iPhone. If you rename that sensor, keep the ending.

To add someone, create their person and set up their phone as below.

## Setting it up

### Home Assistant

1. **Home zone.** Under **Settings → Areas, labels & zones → Zones**, check that **Home** is on the house, with a radius of about 100 m.
2. **Home Wi-Fi.** Run `make secrets` and add the network names under `home_wifi`, as in [`secrets.example.yaml`](../secrets.example.yaml). Use a list, and include every name the router broadcasts (e.g. a 5 GHz one). Then deploy and restart. The configuration check fails until this is set.
3. **People.** Add a person with a picture for each member of the household, under **Settings → People**.

### Each phone

Install the Home Assistant app and log in with the person's own user. Their phone's tracker is added to their person; check it under **Settings → People**. If the phone was logged in as someone else, move the tracker to the right person.

**Android:**

1. In the app, under **Settings → Companion app → Manage sensors**, enable **Wi-Fi connection**.
2. Set the app's location access to **Allow all the time**, with precise location on.
3. If the phone stops reporting in the background, exempt the app from battery saving (see [dontkillmyapp.com](https://dontkillmyapp.com/)).

**iPhone:**

1. In **Settings → Home Assistant**, set **Location** to **Always** with **Precise Location** on, and turn on **Background App Refresh**. The app needs location access to read the Wi-Fi name.

iOS only lets the app report now and then, so it can take a few minutes to notice someone has left.

## Checking it

**Developer tools → States** shows `sensor.people_home`, and each phone's tracker and Wi-Fi sensor.
