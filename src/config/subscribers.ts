import z from "zod";
import { PaymentsService } from "../services/payments.service";
import { mqtt } from "./mqtt";
import { createPaymentSchema } from "../schemas/payments.schema";



export const registerSubscribers = () => {
    mqtt.on("connect", () => {
        mqtt.subscribe([
           "payments/create",
           "payments/cancel" 
        ], 
        { qos:1 }, 
        (err, granted) => {
            if (err) return console.log("Erro ao se increver no topicos!");    
            console.log("Topicos Incritos:");
            granted?.forEach(v => console.log(`✅ topic:${v.topic} qos:${v.qos}`));
        });
    });
    
    mqtt.on("message", async (topic, payload) => {

        try {
            const data = JSON.parse(payload.toString());
            console.log("Recebido:" + topic);

            switch (topic) {
                case "payments/create":
                    
                    const { amount } = createPaymentSchema.parse(data);

                    console.log(amount);
                    const response = await PaymentsService.createPayment(amount);
                    console.log(response);
                    mqtt.publish("payments/created", JSON.stringify(response));
                    console.log("enviado payments/created")

                    break;
                case "payments/cancel":
                    const { payment_id } = z.object({ payment_id:z.number()}).parse(data);
                    const success = await PaymentsService.delete(String(payment_id));

                    const p = JSON.stringify({
                        success,
                        data:{
                            payment_id,
                            status:success ? "cancelled" : "pedding"
                        }
                    });

                    mqtt.publish("payments/cancelled", p);
                    break;
            }    
        } catch (error) {
            console.log("error");
        }
        
        
    
    });
} ;