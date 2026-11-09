import type { FastifyInstance } from "fastify";
import { WebhookController } from "../controllers/webhook.controller";


export const webhooksRoutes = async (app:FastifyInstance) => {
    app.post('/mercadopago', WebhookController.mercadopago);
};



