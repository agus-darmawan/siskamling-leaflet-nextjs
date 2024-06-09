-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "long" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'terlapor',

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);
