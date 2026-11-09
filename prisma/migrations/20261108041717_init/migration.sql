-- CreateTable
CREATE TABLE "Payments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idempotency_key" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "payment_id" TEXT,
    "payload" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Payments_idempotency_key_key" ON "Payments"("idempotency_key");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_payment_id_key" ON "Payments"("payment_id");
