-- CreateTable
CREATE TABLE "ApplicationLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subiektId" DECIMAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isSet" BOOLEAN NOT NULL,
    "volume" DECIMAL NOT NULL,
    "weight" DECIMAL NOT NULL,
    "buyPrice" DECIMAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product.subiektId_unique" ON "Product"("subiektId");
