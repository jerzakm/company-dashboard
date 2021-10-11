/*
  Warnings:

  - You are about to drop the column `returnId` on the `ReturnReason` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReturnReason" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reason" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_ReturnReason" ("description", "id", "reason") SELECT "description", "id", "reason" FROM "ReturnReason";
DROP TABLE "ReturnReason";
ALTER TABLE "new_ReturnReason" RENAME TO "ReturnReason";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
