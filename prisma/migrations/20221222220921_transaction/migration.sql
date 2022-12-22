-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "originCurrency" TEXT NOT NULL,
    "originAmount" REAL NOT NULL,
    "destinationCurrency" TEXT NOT NULL,
    "destinationAmount" REAL NOT NULL,
    "conversionRate" REAL NOT NULL,
    "conversionRateLabel" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
