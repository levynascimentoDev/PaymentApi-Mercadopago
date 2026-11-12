import { z } from "zod";
import "dotenv/config"

const envSchema = z.object({
    DATABASE_URL:z.string(),
    ACCESS_TOKEN_MERCADOPAGO:z.string(),
    ESP32_HOST:z.string(),
    API_TOKEN:z.string(),
    MERCADOPAGO_WEBHOOK_SECRET:z.string(),
    REDIS_URL:z.string(),
    PAYTRIGGER_WEBHOOK_SECRET:z.string()
});

export const env = envSchema.parse(process.env);