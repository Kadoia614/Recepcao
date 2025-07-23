import { FastifyInstance } from "fastify";
import { createUserController, getUsersController } from "../controller/user/userController.js";

export async function userRouter(app: FastifyInstance) {
  app.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["User"],
      description:
        "Let you create new Users to login and usage the application",
      summary: "Create New User",
      body: {
        type: "object", // Use 'object' para definir o corpo
        required: [
          "first_name",
          "last_name",
          "role",
          "email",
          "password",
          "cpf",
        ], // Definindo as propriedades obrigatórias
        properties: {
          first_name: { type: "string" }, // Definindo os tipos de cada campo
          last_name: { type: "string" },
          role: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
          cpf: { type: "string" },
        },
      },
    },
    handler: createUserController, // Seu controlador
  });

  app.route({
    method: "GET",
    url: "/",
    handler: getUsersController
  })
}
