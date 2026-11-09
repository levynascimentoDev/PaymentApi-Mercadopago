import type { FastifyReply, FastifyRequest } from "fastify";
import { mercadoPagoWehookSchema } from "../schemas/webhooks.schema";
import { payment } from "../config/mercadopago";
import { env } from "../config/env";
import { prisma } from "../database/db";


export class WebhookController {
    public static async mercadopago(req:FastifyRequest, reply:FastifyReply) {

        try {
            const { data:{ id } } = mercadoPagoWehookSchema.parse(req.body);

            const response = await payment.get({ id });
            if (response.status == "approved") {
                await fetch(`${env.ESP32_HOST}/webhook/payment`, { 
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ payment_status:"approved" })
                });

                await prisma.payments.delete({
                    where: {
                        payment_id:id
                    }
                })
            }

            reply.status(200).send();

        } catch (error){
            req.log.error(error);
            return reply.status(500).send();
        }
    }
};