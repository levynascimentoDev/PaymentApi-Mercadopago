FROM oven/bun

WORKDIR  /app
COPY package.json bun.lock ./

RUN bun install 

COPY  . .
RUN bunx prisma generate

CMD ["sh", "-c", "bunx prisma migrate deploy && bun run start" ]

