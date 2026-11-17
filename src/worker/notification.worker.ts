import { Worker } from "bullmq";
import { redis } from "../config/redis";
import { mqtt } from "../config/mqtt";
import z from "zod";


export const notificationWorker = new Worker(
    'notification',
    async job => {
    
        switch (job.name) {
            case 'mercadopago': {   
                const data = z.object({ payment_id:z.number(), status:z.string() }).parse(job.data); 

                mqtt.publish("payment", JSON.stringify(data), { qos: 1 });
                break;
            }
        };
    },
    { connection:redis }
)