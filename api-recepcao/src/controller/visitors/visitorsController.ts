import { FastifyReply, FastifyRequest } from "fastify";
import { VisitorsService } from "../../service/VisitorService.js";
import { VisitorsQueryParams, VisitorsRequired } from "../../types/visitorTypes.js";

export const getVisitorsController = async (
  request: FastifyRequest<{ Querystring: VisitorsQueryParams }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const query = request.query;

    const response = await VisitorsService.listVisitors(query);

    if (!response.ok) {
      throw {
        ok: response.ok,
        code: response.code || 500,
        message: response.message || "Erro ao listar visitantes",
      };
    }

    reply.status(200).send({
      message: response.message,
      visitors: response.visitors,
      count: response.count,
    });
  } catch (error: any) {
    throw {
      ok: error.ok,
      code: error.code || 500,
      message: error.message || "Impossível listar os visitantes",
    };
  }
}

export const createVisitorController = async (
  request: FastifyRequest<{ Body: VisitorsRequired }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const visitorData = request.body;
    const result = await VisitorsService.createVisitor(visitorData);

    if (!result.ok) {
      throw { ok: false, code: result.code, message: result.message };
    }
console.log(result)
    reply.status(201).send({
      message: result.message,
      visitor: result.visitor,
    });
  } catch (error: any) {
    throw {
      ok: error.ok,
      code: error.code || 500,
      message: error.message || "Impossível criar visitante",
    };
  }
}