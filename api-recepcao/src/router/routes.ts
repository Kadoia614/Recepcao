import { FastifyInstance } from "fastify";

import { loginRouter } from "./loginRouter.js";
import { userRouter } from "./userRouter.js";
import { visitorRouter } from "./visitorRouter.js";
import { visitsRouter } from "./visitsRouter.js";

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

  app.register(visitsRouter, {
    prefix: "/visits",
  });
}
