import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const agency = await prisma.agency.create({
    data: {
      name: "Demo Agency",
      subdomain: "demo",
      primaryColor: "#0ea5e9",
      secondaryColor: "#111827",
      contactEmail: "owner@demoagency.example",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@platform.local" },
    update: {},
    create: {
      email: "admin@platform.local",
      name: "Platform Admin",
      role: Role.ADMIN,
    },
  });

  await prisma.userAgency.create({
    data: { userId: admin.id, agencyId: agency.id, agencyRole: Role.ADMIN },
  });

  const client = await prisma.client.create({
    data: {
      name: "Acme Co",
      websiteUrl: "https://acme.example",
      industry: "E-commerce",
      targetLocations: { country: "US", cities: ["Chicago"] },
      agencyId: agency.id,
    },
  });

  console.log("Seeded:", { agencyId: agency.id, clientId: client.id });
}

main().finally(() => prisma.$disconnect());
