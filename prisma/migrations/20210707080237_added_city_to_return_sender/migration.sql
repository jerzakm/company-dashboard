/*
  Warnings:

  - Added the required column `city` to the `ReturnSender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `ReturnSender` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReturnSender" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "returnId" TEXT NOT NULL,
    FOREIGN KEY ("returnId") REFERENCES "ReturnEntry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReturnSender" ("id", "name", "phone", "postCode", "returnId", "street") SELECT "id", "name", "phone", "postCode", "returnId", "street" FROM "ReturnSender";
DROP TABLE "ReturnSender";
ALTER TABLE "new_ReturnSender" RENAME TO "ReturnSender";
CREATE UNIQUE INDEX "ReturnSender_returnId_unique" ON "ReturnSender"("returnId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
