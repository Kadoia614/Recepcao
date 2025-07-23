import { FastifyInstance } from "fastify";
import { getVisitorsController } from "../controller/visitors/visitorsController.js";

export async function visitorRouter(app: FastifyInstance) {
  app.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Room"],
      description: "Retrieve a list of rooms",
      summary: "Get Rooms",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
            visitors: { type: "array", items: { type: "object" } },
            count: { type: "integer" },
          },
        },
        500: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      }
    },
    handler: getVisitorsController
  })
}
