-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "originCurrency" TEXT NOT NULL,
    "originAmount" REAL NOT NULL,
    "destinationCurrency" TEXT NOT NULL,
    "destinationAmount" REAL NOT NULL,
    "conversionRate" REAL NOT NULL,
    "conversionRateLabel" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountId", "conversionRate", "conversionRateLabel", "createdAt", "destinationAmount", "destinationCurrency", "id", "originAmount", "originCurrency") SELECT "accountId", "conversionRate", "conversionRateLabel", "createdAt", "destinationAmount", "destinationCurrency", "id", "originAmount", "originCurrency" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
