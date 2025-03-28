-- CreateTable
CREATE TABLE "Product" (
    "nIdProduct" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sProduct" TEXT NOT NULL,
    "nPrice" REAL NOT NULL,
    "bActivo" BOOLEAN NOT NULL DEFAULT true,
    "dCreateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dUpdateAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Product_bActivo_idx" ON "Product"("bActivo");
