import type { FastifyReply, FastifyRequest } from "fastify";
import { PaymentsService } from "../services/payments.service";
import { createPaymentSchema } from "../schemas/payments.schema";



export class PaymentsController {
    public static async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { amount } = createPaymentSchema.parse(req.body);
            const payment = await PaymentsService.createPayment(amount);
            return reply.status(200).send({
                success:true,
                message:"payment was created.",
                data:payment
            });

        } catch (error) {
            console.log(error)
            return reply.status(400).send({
                success:false,
                message:"Bad Request"
            })
        }
    }

    public static async delete(req: FastifyRequest, reply: FastifyReply) {
        try {

            const { id } = req.params as { id:string };
        
            const deleted = await PaymentsService.delete(id);
            
            if (!deleted) return reply.status(404).send({
                success:false,
                message:"Payment not found"
            });

            return {
                success:true,
                message:"Payment was deleted"
            }
            
        
        } catch (error) {
            console.log(error)
            return reply.status(400).send({
                success:false,
                message:"Bad Request"
            })
        }
    }
};