import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "./context.js";
import { migrations } from "./migrations/index.js";

const META_TABLE = "SequelizeMeta";
const command = process.argv[2] || "up";

async function ensureMetaTable() {
  const queryInterface = sequelize.getQueryInterface();
  const tables = await queryInterface.showAllTables();
  const hasMetaTable = tables.includes(META_TABLE);

  if (hasMetaTable) {
    return;
  }

  await queryInterface.createTable(META_TABLE, {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });
}

async function getAppliedMigrations(): Promise<string[]> {
  const rows = await sequelize
    .getQueryInterface()
    .select(null, META_TABLE, { raw: true } as object);

  return (rows as { name: string }[]).map((row) => row.name);
}

async function recordMigration(name: string) {
  await sequelize.getQueryInterface().bulkInsert(META_TABLE, [{ name }]);
}

async function removeMigration(name: string) {
  await sequelize.getQueryInterface().bulkDelete(META_TABLE, { name });
}

async function migrateUp() {
  await ensureMetaTable();

  const applied = new Set(await getAppliedMigrations());
  const pending = migrations.filter((migration) => !applied.has(migration.name));

  for (const migration of pending) {
    console.log(`Running migration ${migration.name}`);
    await migration.up({
      queryInterface: sequelize.getQueryInterface(),
      Sequelize,
      DataTypes,
    });
    await recordMigration(migration.name);
  }

  console.log(
    pending.length
      ? `Applied ${pending.length} migration(s).`
      : "No pending migrations."
  );
}

async function migrateDown(all = false) {
  await ensureMetaTable();

  const applied = new Set(await getAppliedMigrations());
  const appliedMigrations = migrations.filter((migration) =>
    applied.has(migration.name)
  );
  const toRollback = (all ? appliedMigrations : appliedMigrations.slice(-1))
    .reverse();

  for (const migration of toRollback) {
    console.log(`Rolling back migration ${migration.name}`);
    await migration.down({
      queryInterface: sequelize.getQueryInterface(),
      Sequelize,
      DataTypes,
    });
    await removeMigration(migration.name);
  }

  console.log(
    toRollback.length
      ? `Rolled back ${toRollback.length} migration(s).`
      : "No migrations to roll back."
  );
}

async function main() {
  try {
    if (command === "up") {
      await migrateUp();
      return;
    }

    if (command === "down") {
      await migrateDown();
      return;
    }

    if (command === "down:all") {
      await migrateDown(true);
      return;
    }

    throw new Error(`Unknown migration command: ${command}`);
  } finally {
    await sequelize.close();
  }
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
