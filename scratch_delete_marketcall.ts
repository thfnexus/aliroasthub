import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.course.deleteMany({
    where: {
      title: {
        in: ['MarketCall Dashboard Access', 'Offer Approval System']
      }
    }
  });
  console.log('Deleted MarketCall items from DB');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
