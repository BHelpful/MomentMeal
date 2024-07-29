import util from 'util';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const recipe = await prisma.recipe.create({
    data: {
      title: 'My first recipe',
      description: 'This is my first recipe',
      isPublic: true,
      userId: '1',
      timeInKitchen: 10,
      waitingTime: 0,
      numberOfPeople: 2,
      ingredients: {
        create: [
          {
            ingredient: {
              create: {
                name: 'Salt',
                unit: 'g',
                userId: '1',
              },
            },
            quantity: 10,
          },
          {
            ingredient: {
              create: {
                name: 'Pepper',
                unit: 'g',
                userId: '1',
              },
            },
            quantity: 5,
          },
        ],
      },
      steps: {
        create: [
          {
            content: 'Step 1',
          },
          {
            content: 'Step 2',
          },
        ],
      },
      ratings: {
        create: [
          {
            rating: 5,
            userId: '1',
          },
          {
            rating: 4,
            userId: '2',
          },
        ],
      },
    },
  });

  console.log('Recipe Created', recipe);

  const gottenRecipeCheck = await prisma.recipe.findUnique({
    where: { id: recipe.id },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
      ratings: true,
      steps: true,
    },
  });

  console.log(
    'Recipe Check',
    util.inspect(gottenRecipeCheck, false, null, true /* enable colors */)
  );
}

console.log('Seeding database...');

main()
  .then(async () => {
    console.log('Seeding done!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
