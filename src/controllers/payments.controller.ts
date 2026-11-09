import type { FastifyReply, FastifyRequest } from "fastify";
import { PaymentsService } from "../services/payments.service";
import { createPaymentSchema } from "../schemas/payments.schema";



export class PaymentsController {
    public static async create(req: FastifyRequest, reply: FastifyReply) {
        try {

            const { amount } = createPaymentSchema.parse(req.body);
            const payment = await PaymentsService.createPayment(amount);
            
            return {
                success:true,
                message:"payment was created.",
                data:payment
                
            };
        } catch (error) {
            console.log(error)
            return reply.status(400).send({
                success:false,
                message:"Bad Request"
            })
        }
        
    }
};