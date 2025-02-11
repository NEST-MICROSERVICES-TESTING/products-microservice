-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "nIdProduct" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sProduct" TEXT NOT NULL,
    "nPrice" REAL NOT NULL,
    "bActivo" BOOLEAN NOT NULL DEFAULT true,
    "dCreateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dUpdateAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("dCreateAt", "dUpdateAt", "nIdProduct", "nPrice", "sProduct") SELECT "dCreateAt", "dUpdateAt", "nIdProduct", "nPrice", "sProduct" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
