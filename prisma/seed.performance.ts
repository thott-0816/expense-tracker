import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categorySeeds = [
  { name: "Food", categoryType: "expense" as const, transactionKind: "expense" as const },
  { name: "Transport", categoryType: "expense" as const, transactionKind: "expense" as const },
  { name: "Rent", categoryType: "expense" as const, transactionKind: "expense" as const },
  { name: "Salary", categoryType: "income" as const, transactionKind: "income" as const },
  { name: "Freelance", categoryType: "income" as const, transactionKind: "income" as const },
];

async function main() {
  const categories = await Promise.all(
    categorySeeds.map((category) =>
      prisma.category.upsert({
        where: { name: category.name },
        update: { type: category.categoryType },
        create: {
          name: category.name,
          type: category.categoryType,
        },
      }),
    ),
  );

  await prisma.transaction.deleteMany({
    where: {
      note: {
        startsWith: "[perf]",
      },
    },
  });

  const startedAt = new Date("2026-01-01T00:00:00.000Z");
  const rows = Array.from({ length: 5000 }, (_, index) => {
    const category = categories[index % categories.length];
    const occurredAt = new Date(startedAt);
    occurredAt.setDate(startedAt.getDate() + (index % 90));

    return {
      kind: categorySeeds[index % categorySeeds.length].transactionKind,
      amount: ((index % 40) + 1) * 25000,
      occurredAt,
      categoryId: category.id,
      note: `[perf] seeded transaction ${index + 1}`,
    };
  });

  const chunkSize = 500;
  for (let offset = 0; offset < rows.length; offset += chunkSize) {
    await prisma.transaction.createMany({
      data: rows.slice(offset, offset + chunkSize),
    });
  }

  console.log(`Seeded ${rows.length} performance transactions across ${categories.length} categories.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });