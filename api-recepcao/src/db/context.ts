import { Sequelize } from "sequelize";
import { DATABASE_USER, DATABASE_KEY, DATABASE_NAME, DATABASE_HOST } from "../config/env.js";

export const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_KEY, {
  host: DATABASE_HOST,
  dialect: "mariadb",
});

(async () => {
  try {
    await sequelize.authenticate();
    sequelize.sync({ alter: true })
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();
