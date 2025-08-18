import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../context.js";

export class Visits extends Model<
  InferAttributes<Visits>,
  InferCreationAttributes<Visits>
> {
  declare uuid: CreationOptional<string>;
  declare creator_uuid: string;
  declare visitor_uuid: string;
  declare subject: string;
  declare date: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
}

Visits.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    creator_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "uuid",
      },
    },

    visitor_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Visitors",
        key: "uuid",
      },
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Visits",
    tableName: "Visits",
  }
);
