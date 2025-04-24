-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('MOVIE', 'ANIME', 'CARTOON', 'TV_SHOW');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "external_id" TEXT NOT NULL,
    "auth_data" JSONB NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleOnRussian" TEXT,
    "type" "MediaType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "director" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anime" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "episodes" INTEGER NOT NULL,
    "studio" TEXT NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cartoon" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "episodes" INTEGER NOT NULL,
    "network" TEXT NOT NULL,

    CONSTRAINT "Cartoon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvShow" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "seasons" INTEGER NOT NULL,
    "network" TEXT NOT NULL,

    CONSTRAINT "TvShow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_mediaId_key" ON "Movie"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "Anime_mediaId_key" ON "Anime"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "Cartoon_mediaId_key" ON "Cartoon"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "TvShow_mediaId_key" ON "TvShow"("mediaId");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cartoon" ADD CONSTRAINT "Cartoon_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TvShow" ADD CONSTRAINT "TvShow_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
