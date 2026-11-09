import type { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../config/env";
import crypto from "crypto"


export class AuthMiddleware  {
    public static async authBearer(req: FastifyRequest, reply:FastifyReply) {
        const auth = req.headers.authorization ?? "";
        const token = auth.replace("Bearer ", "");
        
        if (!token || token != env.API_TOKEN) return reply.status(401).send({
            success:false,
            message:"Unthorized, Api token is not valid."
        })
    }

    public static async checkMpSignature(req: FastifyRequest, reply:FastifyReply) {
        try {
            const XRequestId = req.headers["x-request-id"] as string | undefined;
            const XSignature = req.headers["x-signature"] as string | undefined;
            const dataId = (req.query as Record<string, string>)["data.id"] as string | undefined;
            
            if (!XRequestId || !XSignature || !dataId) return reply.status(400).send({
                success:false,
                message:"Bad Request"
            });

            const [ts, v1]  = XSignature.split(',').map(v => v.replace('v1=', '').replace('ts=', ''));

            if (!ts || !v1) return reply.status(401).send({
                success: false,
                message: "Unauthorized",
            });
            
            const text = `id:${dataId};request-id:${XRequestId};ts:${ts};`
            const result = crypto
                .createHmac("sha256", env.SECRET_WEBHOOK_MERCADOPAGO)
                .update(text)
                .digest('hex');

            if (result !== v1) return reply.status(401).send({
                success:false,
                message:"Unauthorized"
            });
            
        } catch (error) {
            console.log(error);
        }
        
    }
}