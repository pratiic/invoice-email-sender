-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'pratikbhandari@yopmail.com';

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "servicePeriod" INTEGER[],
    "amount" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
