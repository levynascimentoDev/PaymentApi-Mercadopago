    import * as mq from "mqtt" ;
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { env } from "./env";

const caPath = join(import.meta.dir, "../../certs/emqxsl-ca.crt");

export const mqtt = mq.connect({
    host:env.MQTT_HOST,
    port:env.MQTT_PORT,
    username:env.MQTT_USER,
    password:env.MQTT_PASS,
    ca:readFileSync(caPath),
    protocol:"mqtts",
    clientId:env.MQTT_CLIENT_ID,
    reconnectPeriod: 5000
})


