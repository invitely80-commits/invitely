import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function syncInvites() {
  console.log("Starting invitation data synchronization...");

  const main = async () => {
    const invites = await prisma.invite.findMany();
    console.log(`Found ${invites.length} invitations to process.`);

    let updatedCount = 0;

    for (const invite of invites) {
      try {
          const data = invite.data as any;
          
          await prisma.invite.update({
            where: { id: invite.id },
            data: {
              template: data.template ? data.template.toUpperCase() : invite.template,
              brideName: data.brideName,
              groomName: data.groomName,
              weddingDate: data.weddingDate ? new Date(data.weddingDate) : null,
            },
          });
          
          updatedCount++;
          console.log(`Updated invite: ${invite.slug}`);
        } catch (error) {
          console.error(`Failed to update invite ${invite.slug}:`, error);
        }
    }

    console.log(`Successfully synchronized ${updatedCount} invitations.`);
  };

  await main();
}

syncInvites()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
