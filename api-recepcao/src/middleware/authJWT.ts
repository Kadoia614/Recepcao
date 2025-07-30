import { FastifyRequest } from "fastify";
import { decodeToken } from "../utils/DecodeToken.js";

export const authJWT = async (request: FastifyRequest) => {
  const token: string | undefined = request.headers.authorization?.replace("Bearer ", "");

  if(!token) {
    throw { ok: false, code: 401, message: "Token not provider" };
  }

  const tokenResult = await decodeToken(token);

  if (!tokenResult.ok) {
    const error: any = new Error(tokenResult.message);
    error.statusCode = tokenResult.code || 401;
    throw error;
  }

  request.user = {
    role: tokenResult.role,
    uuid: tokenResult.uuid,
  };
};
