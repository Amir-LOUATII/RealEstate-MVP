/*
  Warnings:

  - The `status` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('FOR_SALE', 'PENDING', 'SOLD', 'RENTED');

-- CreateEnum
CREATE TYPE "FeatureCategory" AS ENUM ('INTERIOR', 'EXTERIOR', 'COMMUNITY', 'UTILITY', 'OTHER');

-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "certifications" TEXT,
ADD COLUMN     "languages" TEXT,
ADD COLUMN     "propertiesSold" INTEGER,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "yearsOfExperience" INTEGER;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "status",
ADD COLUMN     "status" "PropertyStatus" NOT NULL DEFAULT 'FOR_SALE';

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "FeatureCategory" NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyFeature" (
    "propertyId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,

    CONSTRAINT "PropertyFeature_pkey" PRIMARY KEY ("propertyId","featureId")
);

-- CreateIndex
CREATE INDEX "Property_status_idx" ON "Property"("status");

-- AddForeignKey
ALTER TABLE "PropertyFeature" ADD CONSTRAINT "PropertyFeature_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyFeature" ADD CONSTRAINT "PropertyFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
