# ApiPayment from Esp32-PayTrigger

To install dependencies:

```bash
bun install
```

## Prisma (ORM)
To Generate types 
```bash
bunx prisma generate
```

To create / run migrations 
```bash
bunx prisma migrate deploy
```


## Development
```bash
bun run dev
```

## Enviroments 

- Mercado pago 
```env
ACCESS_TOKEN_MERCADOPAGO="" // ACCESS TOKEN MERCADOPAGO
SECRET_WEBHOOK_MERCADOPAGO="" // WEBHOOK SECRET TO VALIDADE REQUEST
```
- App 
```env
ESP32_HOST="" // local ip from WebServer of Esp32
API_TOKEN="" // Api Token Bearer to auth
```

*Use this code on terminal to generate Api token*
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```



