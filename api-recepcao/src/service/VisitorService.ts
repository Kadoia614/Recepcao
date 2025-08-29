import { Op } from "sequelize";
import { Visitors } from "../db/model/visitors.js";
import {
  VisitorsQueryParams,
  GetVisitorssResponse,
  VisitorsGenericResponse,
  VisitorsParams,
  VisitorsRequired,
} from "../types/visitorTypes.js";
import validatorCPF from "../utils/validatorCPF.js";

const isDuplicateUser = async (cpf?: string | null, excludeUuid?: string) => {
  const where: any = {
    [Op.or]: [{ cpf }],
  };
  // to update user or visitor
  if (excludeUuid) {
    where.uuid = { [Op.ne]: excludeUuid };
  }
  return await Visitors.findOne({ where });
};

export class VisitorsService {
  static async listVisitors(
    query: VisitorsQueryParams
  ): Promise<GetVisitorssResponse> {
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
          [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
        }
      : {};

    const { count, rows } = await Visitors.findAndCountAll({
      where,
      attributes: {
        exclude: [
          "cpf",
          // "email",
          // "phone",
          // "address",
          // "city",
          // "state",
          // "zipCode",
        ],
      },
      offset,
      limit: Number(limit),
      order: [["createdAt", "DESC"]],
    });

    if (rows.length === 0) {
      return {
        ok: true,
        message: "Nenhum visitante encontrado",
        visitor: [],
        count: 0,
      };
    }

    return {
      ok: true,
      message: "Visitantes listados com sucesso",
      visitor: rows,
      count,
    };
  }

  static async getVisitorById(uuid: string): Promise<VisitorsGenericResponse> {
    const visitor = await Visitors.findOne({ where: { uuid } });
    if (!visitor) {
      return {
        ok: false,
        code: 404,
        message: "Visitante não encontrado",
      };
    }
    return {
      ok: true,
      message: "Visitante encontrado",
      visitor,
    };
  }

  static async createVisitor(
    visitorData: VisitorsRequired
  ): Promise<VisitorsGenericResponse> {
    const cpfValidation = validatorCPF(visitorData.cpf);
    if (!cpfValidation.ok) {
      throw {
        ok: false,
        code: 403,
        message: "CPF inválido",
      };
    }

    // Verifica duplicidade
    if (await isDuplicateUser(visitorData.cpf)) {
      throw {
        ok: false,
        code: 403,
        message: "Visitante Já existe",
      };
    }

    const newVisitor = await Visitors.create(visitorData);
    return {
      ok: true,
      message: "Visitante criado com sucesso",
      visitor: newVisitor,
    };
  }

  static async updateVisitor(
    uuid: string,
    visitorData: VisitorsRequired
  ): Promise<VisitorsGenericResponse> {
    const updatedVisitor = await Visitors.findByPk(uuid);

    if (!updatedVisitor) {
      return {
        ok: false,
        code: 404,
        message: "Visitante não encontrado",
      };
    }

    // Atualiza os campos do visitante
    Object.assign(updatedVisitor, visitorData);
    await updatedVisitor.save();
    return {
      ok: true,
      message: "Visitante atualizado com sucesso",
      visitor: updatedVisitor,
    };
  }

  static async deleteVisitor(uuid: string): Promise<VisitorsGenericResponse> {
    const deleted = await Visitors.destroy({ where: { uuid } });

    if (deleted) {
      return {
        ok: true,
        message: "Visitante deletado com sucesso",
      };
    }
    return {
      ok: false,
      code: 404,
      message: "Visitante não encontrado",
    };
  }
}
