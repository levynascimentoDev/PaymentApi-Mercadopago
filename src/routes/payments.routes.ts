import type { FastifyInstance } from "fastify";
import { PaymentsController } from "../controllers/payments.controller";


export const paymentsRoutes = async (app:FastifyInstance) => {
    app.post('/', PaymentsController.create);
};



