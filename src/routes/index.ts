import type { FastifyInstance } from "fastify";
import { paymentsRoutes } from "./payments.routes";
import { webhooksRoutes } from "./webhooks.routes";


export const routes = async (app:FastifyInstance) => {
    app.register(paymentsRoutes, { prefix:'/payments' })
    app.register(webhooksRoutes, { prefix:'/webhooks' })
}