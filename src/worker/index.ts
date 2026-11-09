import { notificationWorker } from "./notification.worker"


const workers = [
    notificationWorker
];


for (const worker of workers) {
    worker.on(
        'completed', 
        job => 
            console.log(`✅ ID:${job?.id} worker:${worker.name} queue:${job.name} ${new Date().toLocaleTimeString()}`) 
    );
    worker.on(
        'failed', 
        job => 
            console.log(`❌ ID:${job?.id} worker:${worker.name} queue:${job?.name} ${new Date().toLocaleTimeString()}`) 
    );
}

console.log("Workers Iniciados");