# Presence

The sidebar shows who's home, using the Home Assistant app on each person's phone. Someone is home if their phone is inside the home zone or connected to the home Wi-Fi. The Wi-Fi picks up arrivals quickly, and keeps people home when their phone's location drifts out of the zone indoors.

[`packages/presence.yaml`](../packages/presence.yaml) creates:

- `sensor.people_home`: how many people are home. Its `people` attribute lists everyone and whether they're home.
- `binary_sensor.presence_1` to `binary_sensor.presence_4`: one per person, for the sidebar, which shows up to four.

## Who is tracked

Nobody is listed in the config. [`custom_templates/presence.jinja`](../custom_templates/presence.jinja) picks up everyone under **Settings → People** who has a device tracker, and finds their phone's Wi-Fi sensor by its ID: `sensor.<phone>_wi_fi_connection` on Android, `sensor.<phone>_ssid` on iPhone. If you rename that sensor, keep the ending.

## Setup

In Home Assistant:

1. Check that the **Home** zone is on the house with a radius of about 100 m (**Settings → Areas, labels & zones → Zones**).
2. Run `make secrets` and list the Wi-Fi names under `home_wifi`, as in [`secrets.example.yaml`](../secrets.example.yaml). Include every name the router broadcasts, like a separate 5 GHz one. Deploy and restart. The config check fails until this is set.
3. Add a person with a picture for everyone in the house (**Settings → People**).

On each phone, install the Home Assistant app and log in as that person. The phone's tracker gets added to their person; if it was logged in as someone else before, move it to the right person under **Settings → People**.

On Android:

1. In the app, enable **Wi-Fi connection** under **Settings → Companion app → Manage sensors**.
2. Give the app location access **all the time**, with precise location on.
3. If it stops reporting in the background, exempt the app from battery saving (see [dontkillmyapp.com](https://dontkillmyapp.com/)).

On iPhone, go to **Settings → Home Assistant**, set **Location** to **Always** with **Precise Location** on, and turn on **Background App Refresh**. The app needs location access to read the Wi-Fi name. iOS only lets it report every so often, so it can take a few minutes to notice someone left.

To check it's working, look at `sensor.people_home` and each phone's tracker and Wi-Fi sensor in **Developer tools → States**.
