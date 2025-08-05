import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../../service/UserService.js";
import { ok } from "assert";

export const AlterPwdController = async (
  request: FastifyRequest<{
    Body: { old_password: string; new_password: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const { old_password, new_password } = request.body;

    const result = await UserService.alterPassword(
      request.user.uuid,
      old_password,
      new_password
    );

    if (!result.ok) {
      throw { ok: result.ok, message: result.message, code: result.code };
    }

    reply.status(200).send({ message: result.message, ok: result.ok });
  } catch (error: any) {
    throw {
      ok: false,
      code: error.code,
      message: error.message,
    };
  }
};
