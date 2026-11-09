import { randomUUID } from "crypto";
import { payment } from "../config/mercadopago";
import { prisma } from "../database/db";
import { notificationQueue } from "../queue/notification.queue";
import { env } from "../config/env";


export class PaymentsService {
    public static async createPayment(amount: number) {

        const havePayment = await prisma.payments.findFirst();
        const idempotencyKey = havePayment ? havePayment.idempotency_key : randomUUID();

        const response = await payment.create({
            body: {
                transaction_amount: amount,
                payment_method_id: "pix",
                description: "teste pagamento",
                payer: { email: "teste@gmail.com" }
            },
            requestOptions: {
                idempotencyKey
            }
        })

        const { qr_code, qr_code_base64 } = response.point_of_interaction?.transaction_data!

        if (!havePayment) {
            await prisma.payments.create({
                data: {
                    idempotency_key: idempotencyKey,
                    amount,
                    payment_id: String(response.id),
                    payload: qr_code!
                }
            });
        }

        return {
            id: response.id,
            status: response.status,
            payload: qr_code,
            qr_code: "data:image/png;base64," + qr_code_base64
        }
    }


    public static async approved(payment_id: string) {
        const response = await payment.get({ id: payment_id });
        if (response.status == "approved") {

            await prisma.payments.delete({
                where: {
                    payment_id
                }
            })
            await notificationQueue.add("mercadopago", {
                url:`${env.ESP32_HOST}/webhook/payment`
            });

            return true
        }

        return false;
    }
}