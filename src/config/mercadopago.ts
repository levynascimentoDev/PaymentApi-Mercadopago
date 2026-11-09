import { MercadoPagoConfig, Payment } from 'mercadopago'
import { env } from './env'

const client = new MercadoPagoConfig({ accessToken:env.ACCESS_TOKEN_MERCADOPAGO });
const payment = new Payment(client);

export { payment };