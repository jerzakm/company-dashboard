/*
  Warnings:

  - You are about to alter the column `returnId` on the `ReturnSender` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `ReturnEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ReturnEntry` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `returnId` on the `ReturnLocation` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `returnId` on the `ReturnEvent` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `returnId` on the `ReturnNote` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `returnId` on the `ReturnProduct` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `returnId` on the `ReturnImage` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `returnId` on the `ReturnReason` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

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
    "returnId" INTEGER NOT NULL,
    FOREIGN KEY ("returnId") REFERENCES "ReturnEntry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReturnSender" ("city", "country", "id", "name", "phone", "postCode", "returnId", "street") SELECT "city", "country", "id", "name", "phone", "postCode", "returnId", "street" FROM "ReturnSender";
DROP TABLE "ReturnSender";
ALTER TABLE "new_ReturnSender" RENAME TO "ReturnSender";
CREATE UNIQUE INDEX "ReturnSender_returnId_unique" ON "ReturnSender"("returnId");
CREATE TABLE "new_ReturnEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isBusiness" BOOLEAN NOT NULL,
    "saleDocument" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL
);
INSERT INTO "new_ReturnEntry" ("created_at", "id", "isBusiness", "resolved", "saleDocument") SELECT "created_at", "id", "isBusiness", "resolved", "saleDocument" FROM "ReturnEntry";
DROP TABLE "ReturnEntry";
ALTER TABLE "new_ReturnEntry" RENAME TO "ReturnEntry";
CREATE TABLE "new_ReturnLocation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "location" TEXT NOT NULL,
    "subLocation" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "returnId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("returnId") REFERENCES "ReturnEntry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReturnLocation" ("created_at", "description", "id", "location", "returnId", "subLocation", "userId") SELECT "created_at", "description", "id", "location", "returnId", "subLocation", "userId" FROM "ReturnLocation";
DROP TABLE "ReturnLocation";
ALTER TABLE "new_ReturnLocation" RENAME TO "ReturnLocation";
CREATE TABLE "new_ReturnEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "returnId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("returnId") REFERENCES "ReturnEntry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReturnEvent" ("created_at", "description", "id", "returnId", "type", "userId") SELECT "created_at", "description", "id", "returnId", "type", "userId" FROM "ReturnEvent";
DROP TABLE "ReturnEvent";
ALTER TABLE "new_ReturnEvent" RENAME TO "ReturnEvent";
CREATE TABLE "new_ReturnNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "returnId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("returnId") REFERENCES "ReturnEntry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReturnNote" ("content", "created_at", "id", "returnId", "type", "userId") SELECT "content", "created_at", "id", "returnId", "type", "userId" FROM "ReturnNote";
DROP TABLE "ReturnNote";
ALTER TABLE "new_ReturnNote" RENAME TO "ReturnNote";
CREATE TABLE "new_ReturnProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "group" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "returnId" INTEGER NOT NULL,
    FOREIGN KEY ("returnId") REFERENCES "ReturnEntry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReturnProduct" ("description", "group", "id", "name", "price", "quantity", "returnId", "symbol") SELECT "description", "group", "id", "name", "price", "quantity", "returnId", "symbol" FROM "ReturnProduct";
DROP TABLE "ReturnProduct";
ALTER TABLE "new_ReturnProduct" RENAME TO "ReturnProduct";
CREATE TABLE "new_ReturnImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imgSrc" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "returnId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("returnId") REFERENCES "ReturnEntry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReturnImage" ("created_at", "description", "id", "imgSrc", "returnId", "userId") SELECT "created_at", "description", "id", "imgSrc", "returnId", "userId" FROM "ReturnImage";
DROP TABLE "ReturnImage";
ALTER TABLE "new_ReturnImage" RENAME TO "ReturnImage";
CREATE TABLE "new_ReturnReason" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reason" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "returnId" INTEGER NOT NULL,
    FOREIGN KEY ("returnId") REFERENCES "ReturnEntry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReturnReason" ("description", "id", "reason", "returnId") SELECT "description", "id", "reason", "returnId" FROM "ReturnReason";
DROP TABLE "ReturnReason";
ALTER TABLE "new_ReturnReason" RENAME TO "ReturnReason";
CREATE UNIQUE INDEX "ReturnReason_returnId_unique" ON "ReturnReason"("returnId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
