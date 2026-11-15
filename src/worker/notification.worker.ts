import { Worker } from "bullmq";
import { redis } from "../config/redis";
import { client } from "../config/mqtt";
import z from "zod";


export const notificationWorker = new Worker(
    'notification',
    async job => {
    
        switch (job.name) {
            case 'mercadopago': {   
                const data = 
                    z.object({ payment_id:z.number(), status:z.string() }).parse(job.data); 

                client.publish("payment",JSON.stringify(data));
                break;
            }
        };
    },
    { connection:redis }
)