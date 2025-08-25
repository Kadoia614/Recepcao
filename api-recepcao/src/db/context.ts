import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../config/env.js";

export const sequelize = new Sequelize(DATABASE_URL);

(async () => {
  try {
    await sequelize.authenticate();
    //sequelize.sync({ alter: true })
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();
