import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Food", type: "expense", description: "Chi phi an uong" },
    { name: "Transport", type: "expense", description: "Di chuyen" },
    { name: "Salary", type: "income", description: "Thu nhap luong" },
  ] as const;

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: category,
      create: category,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
