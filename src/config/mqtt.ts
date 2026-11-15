import mqtt from "mqtt";
import { readFileSync } from "node:fs";
import { env } from "./env";


export const client = mqtt.connect({
    host:env.MQTT_HOST,
    port:env.MQTT_PORT,
    username:env.MQTT_USER,
    password:env.MQTT_PASS,
    ca:readFileSync('../../certs/emqxsl-ca.crt'),
    protocol:"mqtts",
    clientId:env.MQTT_CLIENT_ID,
    reconnectPeriod: 5000
})


