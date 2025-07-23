import { FastifyReply, FastifyRequest } from "fastify";
import {
  UserParams,
  UserRequired,
  UserQueryParams,
} from "../../types/userTypes.js";

import { UserService } from "../../service/UserService.js";

export const createUserController = async (
  request: FastifyRequest<{ Body: UserRequired }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const user = request.body;
    const result = await UserService.CreateUser(user);

    if (!result.ok) {
      throw { ok: false, code: result.code, message: result.message };
    }

    reply
      .status(result.code)
      .send({ message: result.message, newUser: result.user });
  } catch (error: any) {
    throw {
      ok: error.ok,
      code: error.code || 500,
      message: error.message || "Impossível criar o usuário",
    };
  }
};

export const getUsersController = async (
  request: FastifyRequest<{ Querystring: UserQueryParams }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const query = request.query;

    const response = await UserService.listUsers(query);

    if (!response.ok) {
      return reply.status(response.code).send({ message: response.message });
    }

    reply.status(200).send({
      message: response.message,
      user: response.user,
      count: response.count,
    });
  } catch (error: any) {
    throw {
      ok: error.ok,
      code: error.code || 500,
      message: error.message || "Impossível listar os usuários",
    };
  }
};

export const updateUserController = async (
  request: FastifyRequest<{ Params: UserParams; Body: UserRequired }>,
  reply: FastifyReply
) => {
  try {
    const data = request.body;
    const { uuid } = request.params;

    const response = await UserService.alterUser(uuid, data);

    response.ok
      ? reply
          .status(response.code)
          .send({ message: response.message, user: response.user })
      : reply.status(response.code).send({ message: response.message });
  } catch (error: any) {
    throw {
      ok: error.ok,
      code: error.code || 500,
      message: error.message || "Impossível atualizar o usuário",
    };
  }
};
