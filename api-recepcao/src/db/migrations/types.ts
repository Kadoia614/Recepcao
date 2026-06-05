import { DataTypes, QueryInterface, Sequelize } from "sequelize";

export type MigrationContext = {
  queryInterface: QueryInterface;
  Sequelize: typeof Sequelize;
  DataTypes: typeof DataTypes;
};

export type Migration = {
  name: string;
  up: (context: MigrationContext) => Promise<void>;
  down: (context: MigrationContext) => Promise<void>;
};
