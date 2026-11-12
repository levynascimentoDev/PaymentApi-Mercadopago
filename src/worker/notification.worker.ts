import { Worker } from "bullmq";
import { redis } from "../config/redis";
import z from "zod";
import cryptor from 'node:crypto'
import { env } from "../config/env";


export const notificationWorker = new Worker(
    'notification',
    async job => {
    
        switch (job.name) {
            case 'mercadopago': {
                const { url, ...data } = 
                    z.object({ url:z.string(), payment_id:z.number(), status:z.string() }).parse(job.data); 

                const body = JSON.stringify(data);
                const timestamp = new Date().getTime();

                const signature = cryptor
                    .createHmac('sha256', env.PAYTRIGGER_WEBHOOK_SECRET)
                    .update(`${timestamp}.${body}`)
                    .digest('hex')
                console.log(`ts=${timestamp},v1=${signature}`);
                console.log(body)
                    
                await fetch(url, { 
                    method:'POST',
                    headers: { 
                        'Content-Type':'application/json',
                        'x-signature' : `ts=${timestamp},v1=${signature}`
                    },
                    body
                });

                break;
            }
        };
    },
    { connection:redis }
)