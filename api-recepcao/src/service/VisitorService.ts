import { Op } from "sequelize";
import { Visitors } from "../db/model/visitors.js";
import {
  VisitorsQueryParams,
  GetVisitorssResponse,
  VisitorsGenericResponse,
  VisitorsRequired,
} from "../types/visitorTypes.js";

export class VisitorsService {
  static async listVisitors(
    query: VisitorsQueryParams
  ): Promise<GetVisitorssResponse> {
    try {
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
    } catch (error) {
      throw {
        ok: false,
        code: 500,
        message: "Erro ao listar visitantes",
      };
    }
  }

  static async getVisitorById(uuid: string): Promise<VisitorsGenericResponse> {
    try {
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
    } catch (error) {
      return {
        ok: false,
        code: 500,
        message: "Erro ao buscar visitante",
      };
    }
  }

  static async createVisitor(
    visitorData: VisitorsRequired
  ): Promise<VisitorsGenericResponse> {
    try {
      const newVisitor = await Visitors.create(visitorData);
      return {
        ok: true,
        message: "Visitante criado com sucesso",
        visitor: newVisitor.toJSON(),
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        code: 500,
        message: "Erro ao criar visitante",
      };
    }
  }

  static async updateVisitor(
    uuid: string,
    visitorData: VisitorsRequired
  ): Promise<VisitorsGenericResponse> {
    try {
      const updatedVisitor = await Visitors.findOne({ where: { uuid } });

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
    } catch (error) {
      return {
        ok: false,
        code: 500,
        message: "Erro ao atualizar visitante",
      };
    }
  }

  static async deleteVisitor(uuid: string) {
    try {
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
    } catch (error) {
      return {
        ok: false,
        code: 500,
        message: "Erro ao deletar visitante",
      };
    }
  }
}
