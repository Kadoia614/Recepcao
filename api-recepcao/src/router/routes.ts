import { FastifyInstance } from "fastify";
import { loginController } from "../controller/auth/loginController.js";
import {
  createUserController,
  getUsersController,
} from "../controller/user/userController.js";

import { loginRouter } from "./loginRouter.js";
import { userRouter } from "./userRouter.js";
import { visitorRouter } from "./visitorRouter.js";

export async function Router(app: FastifyInstance) {
  

  app.register(loginRouter, {
    prefix: "/login",
  });

  app.register(userRouter, {
    prefix: "/user",
  });

  app.register(visitorRouter, {
    prefix: "/visitors",
  });
}
