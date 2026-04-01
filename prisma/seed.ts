import "dotenv/config";
import { ensureAllSubjectsSeeded, ensureDemoUser } from "../src/lib/demo-runtime";
import { prisma } from "../src/lib/db";

async function main() {
  console.log("Seeding database...");
  await ensureAllSubjectsSeeded();
  const demoUser = await ensureDemoUser();

  console.log(`Demo user: ${demoUser.email} (${demoUser.id})`);
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
