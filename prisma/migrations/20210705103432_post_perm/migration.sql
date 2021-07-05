/*
  Warnings:

  - Added the required column `userId` to the `ApplicationLog` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ApplicationLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ApplicationLog" ("created_at", "description", "id", "status") SELECT "created_at", "description", "id", "status" FROM "ApplicationLog";
DROP TABLE "ApplicationLog";
ALTER TABLE "new_ApplicationLog" RENAME TO "ApplicationLog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
