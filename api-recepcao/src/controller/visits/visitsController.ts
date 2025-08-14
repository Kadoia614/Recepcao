import { FastifyReply, FastifyRequest } from "fastify";
import {
  VisitsParams,
  VisitsQueryParams,
  VisitsRequired,
} from "../../types/visitsTypes.js";
import { VisitsService } from "../../service/visitsService.js";

export const getVisits = async (
  request: FastifyRequest<{ Querystring: VisitsQueryParams }>,
  reply: FastifyReply
) => {
  const query = request.query;

  try {
    const response = await VisitsService.listVisits(query);

    if (!response.ok) {
      throw {
        ok: response.ok,
        code: response.code || 500,
        message: response.message || "Erro ao listar visitantes",
      };
    }

    console.log({
      message: response.message,
      visits: response.visits,
      count: response.count,
    });

    reply.status(200).send({
      message: response.message,
      visits: response.visits,
      count: response.count,
    });
  } catch (error: any) {
    throw {
      code: error.code || 500,
      message: error.message || "erro interno no servidor",
      ok: false,
    };
  }
};

export const getVisitsByVisitorId = async (
  request: FastifyRequest<{ Params: VisitsParams }>,
  reply: FastifyReply
) => {
  const { uuid } = request.params;

  console.log(uuid);

  try {
    const response = await VisitsService.listVisitsByVisitorId(uuid);

    if (!response.ok) {
      throw {
        ok: response.ok,
        code: response.code || 500,
        message: response.message || "Erro ao listar visitantes",
      };
    }

    console.log({
      message: response.message,
      visits: response.visits,
    });

    reply.status(200).send({
      message: response.message,
      visits: response.visits,
    });
  } catch (error: any) {
    throw {
      code: error.code || 500,
      message: error.message || "erro interno no servidor",
      ok: false,
    };
  }
};

export const postVisits = async (
  request: FastifyRequest<{ Body: VisitsRequired }>,
  reply: FastifyReply
) => {
  const { visitor_uuid, subject, date } = request.body;

  const payload = {
    creator_uuid: request.user.uuid,
    visitor_uuid,
    subject,
    date,
  };

  const newVisit = await VisitsService.createVisits(payload);

  if (!newVisit.ok) {
    throw { ...newVisit };
  }

  reply
    .status(201)
    .send({ message: newVisit.message, visits: newVisit.visits });
};
