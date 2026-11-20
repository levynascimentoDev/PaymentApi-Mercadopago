import fastify from "fastify";
import { routes } from "./src/routes";
import { registerSubscribers } from "./src/config/subscribers";

const app =  fastify();
app.register(routes, { prefix:'/api' });
registerSubscribers();

app.listen({
    port:8080,
    host:'0.0.0.0'
}, () => {
    console.log("Api running 3000")
});
