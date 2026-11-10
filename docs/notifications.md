# Notifications

[`packages/notifications.yaml`](../packages/notifications.yaml) sends a WhatsApp message to a group when the alarm is armed or disarmed, and replies to "status" in that group with the alarm's state.

The messages go through [ha-wa-bridge](https://github.com/raulpetruta/ha-wa-bridge): the `wa_bridge` integration, plus a bridge container that's logged in to WhatsApp as a linked device. It's not an official API, so WhatsApp could ban the number.

The bridge needs its own WhatsApp account on a second number, because WhatsApp doesn't notify you about messages from your own account. Add that number to the group. If the bridge is down, messages are lost without an error. Send "status" in the group to check it's working.

The bridge only forwards messages from the group, not direct messages: with `INCOMING_MESSAGES_MODE=groups_only` and `ALLOWED_GROUPS=<group name>`. It can't forward one group and one number at the same time. `ALLOWED_GROUPS` matches the name, so renaming the group stops the "status" replies until you update it. Sending uses the ID, so it keeps working.

## Setup

1. Run the bridge on the server, next to Home Assistant. E.g with NixOS:

   ```nix
   virtualisation.oci-containers.containers."wa-bridge" = {
     autoStart = true;
     # v3.1.1, the same release as custom_components/wa_bridge (see vendored.md).
     image = "ghcr.io/raulpetruta/ha-wa-bridge:sha-385122d";
     ports = [ "127.0.0.1:3000:3000" ];
     volumes = [ "wa-bridge:/usr/src/app/.wwebjs_auth" ];
     environment = {
       INCOMING_MESSAGES_MODE = "groups_only";
       INCOMING_MESSAGE_LOG_LEVEL = "COMPACT";
     };
     # API_TOKEN=<openssl rand -hex 32> and ALLOWED_GROUPS=<group name>, in a
     # file only root can read. Anything in the Nix config is readable by all users.
     # A comma in the group name splits it in two, so avoid one.
     environmentFiles = [ "/etc/wa-bridge.env" ];
   };
   ```

2. Add **WhatsApp Bridge** under **Settings → Devices & services**, with `ws://127.0.0.1:3000` and the API token.
3. On the bridge's phone, scan the QR code from the Home Assistant notification (**WhatsApp → Settings → Linked devices**).
4. Find the group's ID: in **Developer tools → Events**, listen to `whatsapp_groups_received`, then run the `wa_bridge.get_groups` action. Copy the group's `id`, e.g. `120363012345678901@g.us`.
5. Run `make secrets` and set `whatsapp_group` to that ID as in [`secrets.example.yaml`](../secrets.example.yaml). Deploy and restart.
6. Send "status" in the group. It should reply with the alarm's state.

WhatsApp unlinks the bridge if its phone is offline for about 14 days. When that happens, restart the bridge (`systemctl restart docker-wa-bridge`) and scan the new QR code.
