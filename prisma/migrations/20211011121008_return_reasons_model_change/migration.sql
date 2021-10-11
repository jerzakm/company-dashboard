-- DropIndex
DROP INDEX "ReturnReason_returnId_unique";

-- CreateTable
CREATE TABLE "_ReturnEntryToReturnReason" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "ReturnEntry" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "ReturnReason" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReturnReason" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reason" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "returnId" INTEGER NOT NULL
);
INSERT INTO "new_ReturnReason" ("description", "id", "reason", "returnId") SELECT "description", "id", "reason", "returnId" FROM "ReturnReason";
DROP TABLE "ReturnReason";
ALTER TABLE "new_ReturnReason" RENAME TO "ReturnReason";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ReturnEntryToReturnReason_AB_unique" ON "_ReturnEntryToReturnReason"("A", "B");

-- CreateIndex
CREATE INDEX "_ReturnEntryToReturnReason_B_index" ON "_ReturnEntryToReturnReason"("B");
