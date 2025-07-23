import { Op } from "sequelize";
import { Visitors } from "../db/model/visitors.js";
import { VisitorsQueryParams, GetVisitorssResponse } from "../types/visitorTypes.js";

export class VisitorsService {
  static async listVisitors(query: VisitorsQueryParams): Promise<GetVisitorssResponse> {
    try {
      const { search, page = 1, limit = 10 } = query;
      const offset = (page - 1) * limit;

      const where: any = {};
      if (search) {
        where.name = { [Op.like]: `%${search}%` };
      }

      const { count, rows } = await Visitors.findAndCountAll({
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      if (rows.length === 0) {
        return {
          ok: true,
          message: "Nenhum visitante encontrado",
          visitors: [],
          count: 0,
        };
      }

      return {
        ok: true,
        message: "Visitantes listados com sucesso",
        visitors: rows,
        count,
      };
    } catch (error) {
      return {
        ok: false,
        code: 500,
        message: "Erro ao listar visitantes",
      };
    }
  }
}