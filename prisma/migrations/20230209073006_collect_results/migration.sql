-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "userPrompt" TEXT NOT NULL,
    "fullPrompt" TEXT NOT NULL,
    "result" TEXT NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_task_fkey" FOREIGN KEY ("task") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
