-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReturnEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isBusiness" BOOLEAN,
    "saleDocument" TEXT,
    "resolved" BOOLEAN NOT NULL
);
INSERT INTO "new_ReturnEntry" ("created_at", "id", "isBusiness", "resolved", "saleDocument") SELECT "created_at", "id", "isBusiness", "resolved", "saleDocument" FROM "ReturnEntry";
DROP TABLE "ReturnEntry";
ALTER TABLE "new_ReturnEntry" RENAME TO "ReturnEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
