import bcrypt from "bcryptjs";
import { UserDB } from "../db/model/user.js";
import {
  UserAtributes,
  UserRequired,
  UserGenericResponse,
  UserQueryParams,
  GetUserGenericResponse,
} from "../types/userTypes.js";
import validatorCPF from "../utils/validatorCPF.js";
import { Op } from "sequelize";

export class UserService {
  static async findUserByUsername(
    username: string
  ): Promise<UserAtributes | null> {
    const user = await UserDB.findOne({ where: { username } });

    return user ? (user.toJSON() as UserAtributes) : null;
  }

  static async CreateUser(data: UserRequired): Promise<UserGenericResponse> {
    // valida role
    if (data.role !== "admin" && data.role !== "user") {
      return {
        ok: false,
        code: 400,
        message: "O campo 'role' deve ser 'admin' ou 'user'",
      };
    }

    // valida CPF
    const isValid = validatorCPF(data.cpf);

    if (!isValid.ok) {
      return {
        ok: false,
        code: 403,
        message: "CPF inválido",
      };
    }

    // verifica se já existe com o mesmo email
    const alreadyCreated = await UserDB.findOne({
      where: {
        email: data.email,
      },
    });

    if (alreadyCreated) {
      return {
        ok: false,
        code: 403,
        message: "Usuário Já existe",
      };
    }

    // define username e criptografa password
    data.username = data.first_name.concat("." + data.last_name).toLowerCase();
    data.password = await bcrypt.hash(data.password, 10);

    // cria user
    const newUser = await UserDB.create({ ...data });

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
      const isUser = await UserDB.findByPk(id);

      if (!isUser) {
        return {
          ok: false,
          code: 404,
          message: "Usuário não encontrado",
        };
      }

      isUser.first_name = data.first_name;
      isUser.last_name = data.last_name;
      isUser.email = data.email;
      isUser.role = data.role;
      isUser.cpf = data.cpf;

      isUser.save();

      return {
        ok: true,
        code: 200,
        message: "Alterado com sucesso",
        user: isUser,
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
            { cpf: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const result = await UserDB.findAndCountAll({
      where,
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
}
