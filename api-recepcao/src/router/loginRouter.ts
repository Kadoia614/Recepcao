import { FastifyInstance } from "fastify";
import { loginController } from "../controller/auth/loginController.js";

export async function loginRouter(app: FastifyInstance) {
  app.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["Login"],
      description: "Let you make login using username and password",
      summary: "Do login into application",
      body: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string", example: "Login sucess" },
            token: { type: "string" },
            user: {
              type: "object",
              properties: {
                uuid: { type: "string" },
                name: { type: "string" },
                role: { type: "string" },
                firstLogin: { type: "boolean" },
              },
            },
            ip: { type: "string" },
          },
          required: ["message", "token", "user", "ip"],
        },
      },
    },
    handler: loginController,
  });
}
