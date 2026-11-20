FROM docker.io/oven/bun

WORKDIR /app
COPY package.json bun.lock ./

RUN bun install 

COPY  . .
RUN bunx prisma generate
EXPOSE 8080

ENV MQTT_CLIENT_ID=API-c63cf88b-a4ed-4117-8b08-f00ae154c657

CMD ["sh", "-c", "bunx prisma migrate deploy && bun run start" ]

