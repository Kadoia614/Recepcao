import { FastifyReply, FastifyRequest } from "fastify";
import { validatePermission } from "../utils/validatePermission.js";

type ProtectedModule = "user" | "visitors" | "visits";

export function checkPermissions(module: ProtectedModule) {
  return async function permissionHandler(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const method = request.method;
    const role = request.user?.role as "user" | "admin" | "superadmin";

    if (!role) {
      return reply.code(403).send({ ok: false, message: "Permissao negada" });
    }

    const validation = validatePermission(
      (request.body as object) || {},
      role,
      method,
      module
    );

    if (!validation.ok) {
      return reply.code(403).send({ ok: false, message: validation.message });
    }
  };
}
