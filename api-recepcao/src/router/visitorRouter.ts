import { FastifyInstance } from "fastify";
import {
  createVisitorController,
  getVisitorsController,
} from "../controller/visitors/visitorsController.js";

const visitorParams = {
  type: "object",
  required: ["name", "cpf"],
  properties: {
    name: { type: "string" },
    cpf: { type: "string" },
    photo: { type: "string", nullable: true },
    email: { type: "string", nullable: true },
    phone: { type: "string", nullable: true },
    address: { type: "string", nullable: true },
    city: { type: "string", nullable: true },
    state: { type: "string", nullable: true },
    zipCode: { type: "string", nullable: true },
  },
  additionalProperties: false,
};

const visitorResponse = {
  type: "object",
  properties: {
    uuid: { type: "string", example: "123e4567-e89b-12d3-a456-426614174000" },
    name: { type: "string", example: "João da Silva" },
    photo: {
      type: "string",
      example: "http://example.com/photo.jpg",
      nullable: true,
    },
    email: {
      type: "string",
      example: "seuemail@itapecerica.sp.gov.br",
      nullable: true,
    },
    phone: { type: "string", example: "11999999999", nullable: true },
    createdAt: {
      type: "string",
      format: "date-time",
      example: "2023-10-01T12:00:00Z",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      example: "2023-10-01T12:00:00Z",
    },
  },
};

export async function visitorRouter(app: FastifyInstance) {
  app.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Visitor"],
      description: "Retrieve a list of Visitors",
      summary: "Get Visitors",
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
            visitors: {
              type: "array",
              items: visitorResponse,
            },
            count: { type: "integer" },
          },
        },
        500: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: getVisitorsController,
  });

  app.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["Visitor"],
      description: "Create a new Visitor",
      summary: "Create Visitor",
      body: visitorParams,

      response: {
        201: {
          type: "object",
          properties: {
            message: { type: "string" },
            visitor: visitorResponse,
          },
        },
        500: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: createVisitorController,
  });
}
