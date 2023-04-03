-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'male',
ADD COLUMN     "height" TEXT,
ADD COLUMN     "weight" TEXT;
