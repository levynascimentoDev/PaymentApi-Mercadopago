import { Queue } from "bullmq";
import { redis } from "../config/redis";

export const notificationQueue = new Queue(
    'notification', 
    { 
        connection:redis,
        defaultJobOptions:{
            attempts:8,
            backoff: { type: 'exponential', delay: 5000 },
            removeOnComplete:true
        }
    }
)