import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ROOT_USERNAME = process.env.ROOT_USERNAME ?? "int";
const ROOT_PASSWORD = process.env.ROOT_PASSWORD;

async function main() {
  if (!ROOT_PASSWORD) {
    throw new Error("ROOT_PASSWORD env var is required for seeding");
  }

  const existing = await prisma.user.findUnique({
    where: { username: ROOT_USERNAME },
  });

  if (existing) {
    console.log(`Root account "${ROOT_USERNAME}" already exists — skipped.`);
    return;
  }

  const passwordHash = await bcrypt.hash(ROOT_PASSWORD, 12);

  await prisma.user.create({
    data: {
      username: ROOT_USERNAME,
      passwordHash,
      role: UserRole.ROOT,
    },
  });

  console.log(`Root account "${ROOT_USERNAME}" created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
