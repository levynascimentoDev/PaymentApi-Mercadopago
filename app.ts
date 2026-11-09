import fastify from "fastify";
import { routes } from "./src/routes";

const app =  fastify();
app.register(routes, { prefix:'/api' });

app.listen({
    port:3000,
    host:'0.0.0.0'
}, () => {
    console.log("Api running 3000")
});
