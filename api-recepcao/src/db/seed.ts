import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { sequelize } from "./context.js";
import { UserDB } from "./model/user.js";

const adminPassword = process.env.SEED_ADMIN_PASSWORD;

const admin = {
  first_name: process.env.SEED_ADMIN_FIRST_NAME || "Admin",
  last_name: process.env.SEED_ADMIN_LAST_NAME || "Sistema",
  username: process.env.SEED_ADMIN_USERNAME || "admin.sistema",
  email: process.env.SEED_ADMIN_EMAIL || "admin@example.com",
  cpf: process.env.SEED_ADMIN_CPF || "529.982.247-25",
  role: "superadmin" as const,
  firstLogin: true,
};

async function seedAdmin() {
  if (!adminPassword) {
    throw new Error("Env SEED_ADMIN_PASSWORD is missing");
  }

  const existingAdmin = await UserDB.findOne({
    where: {
      [Op.or]: [
        { username: admin.username },
        { email: admin.email },
        { cpf: admin.cpf },
      ],
    },
  });

  if (existingAdmin) {
    console.log(`Admin seed skipped. User already exists: ${admin.username}`);
    return;
  }

  const password = await bcrypt.hash(adminPassword, 10);

  await UserDB.create({
    ...admin,
    password,
  });

  console.log(`Admin seed created: ${admin.username}`);
}

seedAdmin()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await sequelize.close();
  });
