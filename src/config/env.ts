import { z } from "zod";
import "dotenv/config"

const envSchema = z.object({
    DATABASE_URL:z.string(),
    ACCESS_TOKEN_MERCADOPAGO:z.string(),
    MERCADOPAGO_WEBHOOK_SECRET:z.string(),
    REDIS_URL:z.string(),
    PAYTRIGGER_WEBHOOK_SECRET:z.string(),
    MQTT_HOST:z.string(),
    MQTT_PORT:z.coerce.number(),
    MQTT_USER:z.string(),
    MQTT_PASS:z.string(),
    MQTT_CLIENT_ID:z.string()
});

export const env = envSchema.parse(process.env);