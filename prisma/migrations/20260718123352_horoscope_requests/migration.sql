-- CreateEnum
CREATE TYPE "HoroscopeStatus" AS ENUM ('PENDING', 'PAYMENT_SENT', 'PAID', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "HoroscopeRequest" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "birthTime" TEXT,
    "timeUnknown" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "comments" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "status" "HoroscopeStatus" NOT NULL DEFAULT 'PENDING',
    "adminNotes" TEXT,
    "paymentSentAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HoroscopeRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HoroscopeRequest_status_createdAt_idx" ON "HoroscopeRequest"("status", "createdAt");

-- CreateIndex
CREATE INDEX "HoroscopeRequest_email_idx" ON "HoroscopeRequest"("email");
