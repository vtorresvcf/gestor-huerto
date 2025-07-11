import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Borrando datos existentes...");

  // ⚠️ Borra en orden: relaciones primero
  await prisma.task.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.botanicalInfo.deleteMany();
  await prisma.plant.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Datos eliminados.");

  // 👤 Usuarios
  const user1 = await prisma.user.create({
    data: {
      name: "Usuario Demo",
      email: "demo@huerto.app",
      password: "plantitas123", // ⚠️ Solo para pruebas
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Marta Plantitas",
      email: "marta@huerto.app",
      password: "plantitas123", // ⚠️ Solo para pruebas
    },
  });

  // 🌱 Plantas
  const tomatera = await prisma.plant.create({
    data: { name: "Tomatera", userId: user1.id },
  });

  const perejil = await prisma.plant.create({
    data: { name: "Perejil", userId: user1.id },
  });

  await prisma.plant.createMany({
    data: [
      { name: "Pimiento Verde", userId: user1.id },
      { name: "Caléndula", userId: user2.id },
      { name: "Hierbabuena", userId: user2.id },
    ],
  });

  // ✅ Tareas asociadas a plantas reales
  await prisma.task.createMany({
    data: [
      {
        title: "Regar tomatera",
        description: "Regar abundantemente por la mañana",
        dueDate: new Date(Date.now() + 86400000),
        plantId: tomatera.id,
      },
      {
        title: "Trasplantar perejil",
        description: "Mover al bancal grande",
        dueDate: new Date(Date.now() + 2 * 86400000),
        plantId: perejil.id,
      },
    ],
  });

  console.log("🌱 Datos semilla insertados correctamente");
}

main()
  .catch((e) => {
    console.error("❌ Error ejecutando seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
