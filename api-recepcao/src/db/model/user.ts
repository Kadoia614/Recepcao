import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../context.js";

// ─── Classe do modelo ────────────────────────────────────────────
export class UserDB extends Model<
  InferAttributes<UserDB>,
  InferCreationAttributes<UserDB>
> {
  declare uuid: CreationOptional<string>;

  declare first_name: string;
  declare last_name: string;
  declare username: string;
  declare email: string;
  declare cpf: string;
  declare password: string;
  declare role: "admin" | "user" | "recepcionist" | "superadmin";
  
  declare firstLogin: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
}

UserDB.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user", "recepcionist", "superadmin"),
      allowNull: false,
    },
    firstLogin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    // ➜ incluir os três campos controlados pelo Sequelize
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true, // cria createdAt/updatedAt
    paranoid: true, // cria deletedAt
  }
);

