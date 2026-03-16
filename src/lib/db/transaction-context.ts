import type { Prisma, PrismaClient } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";

export type DbClient = PrismaClient | Prisma.TransactionClient;

export async function withTransaction<T>(
  operation: (client: Prisma.TransactionClient) => Promise<T>,
): Promise<T> {
  return prisma.$transaction((client) => operation(client));
}

export function getDbClient(client?: DbClient): DbClient {
  return client ?? prisma;
}
