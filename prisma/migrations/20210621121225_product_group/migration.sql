/*
  Warnings:

  - Added the required column `group` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subiektId" DECIMAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isSet" BOOLEAN NOT NULL,
    "volume" DECIMAL NOT NULL,
    "weight" DECIMAL NOT NULL,
    "buyPrice" DECIMAL NOT NULL,
    "group" TEXT NOT NULL
);
INSERT INTO "new_Product" ("buyPrice", "id", "isSet", "name", "subiektId", "symbol", "volume", "weight") SELECT "buyPrice", "id", "isSet", "name", "subiektId", "symbol", "volume", "weight" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product.subiektId_unique" ON "Product"("subiektId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
