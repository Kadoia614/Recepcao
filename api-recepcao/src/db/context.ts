import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("Recepcao", "root", "kadoia", {
  host: "localhost",
  dialect: "mariadb",
});

(async () => {
  try {
    await sequelize.authenticate();
    // sequelize.sync({ alter: true })
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();
