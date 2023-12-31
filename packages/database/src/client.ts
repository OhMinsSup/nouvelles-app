import { PrismaClient } from '@prisma/client';

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      log: ['query', 'info', 'warn'],
    });
  }
  prisma = global.cachedPrisma;
}

export const db: PrismaClient = prisma;
