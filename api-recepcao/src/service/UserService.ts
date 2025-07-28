import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { UserDB } from "../db/model/user.js";
import {
  UserAtributes,
  UserRequired,
  UserGenericResponse,
  UserQueryParams,
  GetUserGenericResponse,
  GenericResponse,
} from "../types/userTypes.js";
import validatorCPF from "../utils/validatorCPF.js";
import { generateStrongPassword } from "../utils/passwordGenerator.js";
import { sendMail } from "../utils/sendMail.js";

// Função utilitária para validar role
const isValidRole = (role: string) =>
  ["admin", "user", "recepcionist", "superadmin"].includes(role);

// Função utilitária para verificar duplicidade de email/cpf
const isDuplicateUser = async (
  email: string,
  cpf?: string | null,
  excludeUuid?: string
) => {
  const where: any = {
    [Op.or]: [{ email }, { cpf }],
  };
  if (excludeUuid) {
    where.uuid = { [Op.ne]: excludeUuid };
  }
  return await UserDB.findOne({ where });
};

export class UserService {
  static async findUserByUsername(
    username: string
  ): Promise<UserAtributes | null> {
    const user = await UserDB.findOne({ where: { username } });
    return user ? (user.toJSON() as UserAtributes) : null;
  }

  static async CreateUser(data: UserRequired): Promise<UserGenericResponse> {
    // Validações
    if (!isValidRole(data.role)) {
      return {
        ok: false,
        code: 400,
        message:
          "the field 'role' must be 'admin', 'user', 'recepcionist' or 'superadmin'",
      };
    }

    const cpfValidation = validatorCPF(data.cpf);
    if (!cpfValidation.ok) {
      return {
        ok: false,
        code: 403,
        message: "CPF inválido",
      };
    }

    // Verifica duplicidade
    if (await isDuplicateUser(data.email, data.cpf)) {
      return {
        ok: false,
        code: 403,
        message: "Usuário Já existe",
      };
    }

    // Define username e criptografa senha
    const password = generateStrongPassword();
    data.username = `${data.first_name}.${data.last_name}`.toLowerCase();
    const hashPassword = await bcrypt.hash(password, 10);

    // Cria usuário
    const newUser = await UserDB.create({ ...data, password: hashPassword });

    sendMail(data.email, "Reception Password", `Your password is: ${password}`);

    return {
      ok: true,
      code: 201,
      message: "Usuário criado com sucesso.",
      user: newUser.toJSON(),
    };
  }

  static async alterUser(
    id: string,
    data: UserRequired
  ): Promise<UserGenericResponse> {
    try {
      const user = await UserDB.findByPk(id);

      if (!user) {
        return {
          ok: false,
          code: 404,
          message: "Usuário não encontrado",
        };
      }

      if (!isValidRole(data.role)) {
        return {
          ok: false,
          code: 400,
          message:
            "O campo 'role' deve ser 'admin', 'user', 'recepcionist' ou 'superadmin'",
        };
      }

      if (await isDuplicateUser(data.email, null, id)) {
        return {
          ok: false,
          code: 403,
          message: "Usuário Já existe",
        };
      }

      // Atualiza campos
      user.first_name = data.first_name;
      user.last_name = data.last_name;
      user.username = `${data.first_name}.${data.last_name}`.toLowerCase();
      user.email = data.email;
      user.role = data.role;

      await user.save();

      return {
        ok: true,
        code: 200,
        message: "Alterado com sucesso",
        user: user,
      };
    } catch (error: any) {
      return {
        ok: false,
        code: error.status || 500,
        message: error.message || "Erro ao buscar usuários",
      };
    }
  }

  static async listUsers(
    query: UserQueryParams
  ): Promise<GetUserGenericResponse> {
    const {
      page = "0",
      limit = "10",
      search = "",
    } = query as {
      page?: string;
      limit?: string;
      search?: string;
    };

    const offset = Number(page) * Number(limit);

    const where = search
      ? {
          [Op.or]: [
            { first_name: { [Op.like]: `%${search}%` } },
            { last_name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const result = await UserDB.findAndCountAll({
      where,
      attributes: { exclude: ["password", "cpf"] },
      offset,
      limit: Number(limit),
      order: [["createdAt", "DESC"]],
    });

    return {
      ok: true,
      message: "Usuários encontrados com sucesso",
      user: result.rows,
      count: result.count,
    };
  }

  static async deleteUser(uuid: string): Promise<GenericResponse> {
    const user = await UserDB.findByPk(uuid);

    if (!user) {
      return {
        ok: false,
        code: 404,
        message: "Usuário não encontrado",
      };
    }

    await user.destroy();

    return {
      ok: true,
      code: 200,
      message: "user deleted successfully",
    };
  }
}
