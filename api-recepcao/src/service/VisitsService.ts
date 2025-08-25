import { Op } from "sequelize";
import {
  GetVisitsResponse,
  VisitsGenericResponse,
  VisitsQueryParams,
  VisitsRequired,
  VisitsWithAssociation,
  VisitsResponse,
} from "../types/visitsTypes.js";
import { Visits } from "../db/model/visits.js";
import { Visitors } from "../db/model/visitors.js";
import { UserDB } from "../db/model/user.js";
import { ok } from "assert";

export class VisitsService {
  static async listVisits(
    query: VisitsQueryParams
  ): Promise<
    | { ok: true; message: string; visits: VisitsResponse[]; count: number }
    | { ok: false; code: number; message: string }
  > {
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
          [Op.or]: [{ date: { [Op.like]: `%${search.split("T")[0]}%` } }],
        }
      : {};

    const { count, rows } = await Visits.findAndCountAll({
      where,
      include: [
        { model: UserDB, as: "Creator" },
        { model: Visitors, as: "Visitor" },
      ],
      offset,
      limit: Number(limit),
      order: [["createdAt", "DESC"]],
    });

    const visits: VisitsResponse[] = rows.map((visit) => {
      const v = visit.toJSON() as VisitsWithAssociation;

      return {
        uuid: v.uuid,
        creator_uuid: v.creator_uuid,
        creator: {
          uuid: v.Creator?.uuid,
          role: v.Creator?.role,
          username: v.Creator?.username,
        },
        visitor_uuid: v.visitor_uuid,
        visitor: {
          uuid: v.Visitor?.uuid,
          name: v.Visitor?.name,
          photo: v.Visitor?.photo ?? null,
        },
        subject: v.subject,
        date: v.date,
        createdAt: v.createdAt,
        updatedAt: v.updatedAt,
        deletedAt: v.deletedAt,
      };
    });

    if (!rows.length) {
      return {
        ok: false,
        code: 404,
        message: "No visits found",
      };
    }

    return {
      ok: true,
      message: "Visits successfully listed",
      visits,
      count,
    };
  }

  static async createVisits(
    visitsData: VisitsRequired
  ): Promise<VisitsGenericResponse> {
    const visitor = await Visitors.findByPk(visitsData.visitor_uuid);
    const creator = await UserDB.findByPk(visitsData.creator_uuid);

    if (!visitor || !creator) {
      return {
        ok: false,
        code: 400,
        message: "Visitor or creator not found...",
      };
    }

    const newVisits = await Visits.create(visitsData);

    return {
      ok: true,
      message: "visit created success",
      visits: newVisits,
    };
  }

  static async listVisitsByVisitorId(uuid: string): Promise<
    | {
        ok: true;
        visits: VisitsResponse[];
        message: string;
      }
    | {
        ok: false;
        code: number;
        message: string;
      }
  > {
    const visits = await Visits.findAll({
      where: { visitor_uuid: uuid },
      order: [["createdAt", "DESC"]],
      include: [
        { model: UserDB, as: "Creator" },
        { model: Visitors, as: "Visitor" },
      ],
    });

    if (!visits.length) {
      return {
        ok: false,
        code: 404,
        message: "No visits found for the given visitor ID",
      };
    }

    const visitsResponse: VisitsResponse[] = visits.map((visit) => {
      const v = visit.toJSON() as VisitsWithAssociation;
      return {
        uuid: v.uuid,
        creator_uuid: v.creator_uuid,
        creator: {
          uuid: v.Creator?.uuid,
          role: v.Creator?.role,
          username: v.Creator?.username,
        },
        visitor_uuid: v.visitor_uuid,
        visitor: {
          uuid: v.Visitor?.uuid,
          name: v.Visitor?.name,
          photo: v.Visitor?.photo ?? null,
        },
        subject: v.subject,
        date: v.date,
        createdAt: v.createdAt,
        updatedAt: v.updatedAt,
        deletedAt: v.deletedAt,
      };
    });

    return {
      ok: true,
      visits: visitsResponse,
      message: "Visits found",
    };
  }
}
