import z from "zod";


export const mercadoPagoWehookSchema = z.object({
    data:z.object({
        id:z.string()
    })
});