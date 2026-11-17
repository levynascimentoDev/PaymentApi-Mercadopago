import type { FastifyInstance } from "fastify";
import { PaymentsController } from "../controllers/payments.controller";
import { AuthMiddleware } from "../middleware/auth";


export const paymentsRoutes = async (app:FastifyInstance) => {
    app.post(
        '/', 
        { onRequest:AuthMiddleware.authBearer }, 
        PaymentsController.create
    );
    
    app.delete(
        '/{id}',
        { onRequest:AuthMiddleware.authBearer },
        PaymentsController.delete
    );
};



