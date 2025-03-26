const { PrismaClient } = require("@prisma/client");
const properties = require("./properties.json");
const agents = require("./agents.json");
const prisma = new PrismaClient();

async function main() {
  // for (const agent of agents) {
  //   await prisma.agent.create({
  //     data: agent,
  //   });
  // }
  for (const property of properties) {
    await prisma.property.create({
      data: {
        ...property,
        agent: { connect: { email: "sarah@realestate.com" } },
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
