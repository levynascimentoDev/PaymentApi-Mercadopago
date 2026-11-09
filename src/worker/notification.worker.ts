import { Worker } from "bullmq";
import { redis } from "../config/redis";
import z from "zod";


export const notificationWorker = new Worker(
    'notification',
    async job => {
    
        switch (job.name) {
            case 'mercadopago': {
                const { url } = 
                    z.object({ url:z.string() }).parse(job.data); 

                await fetch(url, { 
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ payment_status:"approved" })
                });

                break;
            }
        };
    },
    { connection:redis }
)