import type { FastifyReply, FastifyRequest } from "fastify";
import { mercadoPagoWehookSchema } from "../schemas/webhooks.schema";
import { PaymentsService } from "../services/payments.service";



export class WebhookController {
    public static async mercadopago(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { data: { id } } = mercadoPagoWehookSchema.parse(req.body);

            await PaymentsService.approved(id);

            reply.status(200).send();

        } catch (error) {
            req.log.error(error);
            return reply.status(500).send();
        }
    }
};