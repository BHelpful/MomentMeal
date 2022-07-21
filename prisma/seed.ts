// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy stores
  const store1 = await prisma.stores.upsert({
    where: { name: 'Rema 1000' },
    update: {},
    create: { name: 'Rema 1000' },
  });

  const store2 = await prisma.stores.upsert({
    where: { name: 'Lidl' },
    update: {},
    create: {
      name: 'Lidl',
    },
  });

  console.log({ post1: store1, post2: store2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
