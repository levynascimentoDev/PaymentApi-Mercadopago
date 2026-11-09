import type { FastifyInstance } from "fastify";
import { WebhookController } from "../controllers/webhook.controller";
import { AuthMiddleware } from "../middleware/auth";


export const webhooksRoutes = async (app:FastifyInstance) => {
    app.post(
        '/mercadopago', 
        { onRequest:AuthMiddleware.checkMpSignature }, 
        WebhookController.mercadopago
    );
};



