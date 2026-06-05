import { Migration } from "./types.js";

export const createVisits: Migration = {
  name: "202606050003-create-visits",

  async up({ queryInterface, DataTypes }) {
    await queryInterface.createTable("visits", {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      creator_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "uuid",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      visitor_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "visitors",
          key: "uuid",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex("visits", ["creator_uuid"], {
      name: "idx_visits_creator_uuid",
    });
    await queryInterface.addIndex("visits", ["visitor_uuid"], {
      name: "idx_visits_visitor_uuid",
    });
    await queryInterface.addIndex("visits", ["date"], {
      name: "idx_visits_date",
    });
  },

  async down({ queryInterface }) {
    await queryInterface.dropTable("visits");
  },
};
