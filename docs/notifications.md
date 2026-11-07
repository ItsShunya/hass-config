# Notifications

[`packages/notifications.yaml`](../packages/notifications.yaml) sends a WhatsApp message when the alarm is armed or disarmed, and replies to "status" with the alarm's state.

The messages go through [ha-wa-bridge](https://github.com/raulpetruta/ha-wa-bridge): the `wa_bridge` integration, plus a bridge container that's logged in to WhatsApp as a linked device. It's not an official API, so WhatsApp could ban the number.

The bridge needs its own WhatsApp account on a second number, because WhatsApp doesn't notify you about messages from your own account. If the bridge is down, messages are lost without an error. Send "status" to check it's working.

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
       INCOMING_MESSAGES_MODE = "numbers_only";
       INCOMING_MESSAGE_LOG_LEVEL = "COMPACT";
     };
     # API_TOKEN=<openssl rand -hex 32> and ALLOWED_NUMBERS=<your number>, in a
     # file only root can read. Anything in the Nix config is readable by all users.
     environmentFiles = [ "/etc/wa-bridge.env" ];
   };
   ```

2. Run `make secrets` and set `whatsapp_number` as in [`secrets.example.yaml`](../secrets.example.yaml). Deploy and restart.
3. Add **WhatsApp Bridge** under **Settings → Devices & services**, with `ws://127.0.0.1:3000` and the API token.
4. On the bridge's phone, scan the QR code from the Home Assistant notification (**WhatsApp → Settings → Linked devices**).
5. Send "status" to the bridge's number. It should reply with the alarm's state.

WhatsApp unlinks the bridge if its phone is offline for about 14 days. When that happens, restart the bridge (`systemctl restart docker-wa-bridge`) and scan the new QR code.
