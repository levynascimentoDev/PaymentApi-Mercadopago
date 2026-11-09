/*
  Warnings:

  - Made the column `payload` on table `Payments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `payment_id` on table `Payments` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idempotency_key" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "payment_id" TEXT NOT NULL,
    "payload" TEXT NOT NULL
);
INSERT INTO "new_Payments" ("amount", "id", "idempotency_key", "payload", "payment_id") SELECT "amount", "id", "idempotency_key", "payload", "payment_id" FROM "Payments";
DROP TABLE "Payments";
ALTER TABLE "new_Payments" RENAME TO "Payments";
CREATE UNIQUE INDEX "Payments_idempotency_key_key" ON "Payments"("idempotency_key");
CREATE UNIQUE INDEX "Payments_payment_id_key" ON "Payments"("payment_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
