import { Visitors } from "../db/model/visitors.js";
import { UserDB } from "../db/model/user.js";
import { Visits as VisitsDB } from "../db/model/visits.js";

export interface VisitsParams {
  uuid: string;
}

export interface VisitsRequired {
  creator_uuid: string;
  visitor_uuid: string;
  subject: string;
  date: Date;
}

export interface VisitsWithAssociation extends VisitsDB {
  Visitor?: Visitors;
  Creator?: UserDB;
}

// bulk
interface getVisitsSucess {
  ok: true;
  message: string;
  visits: VisitsWithAssociation[];
  count: number;
}

interface getVisitsFail {
  ok: false;
  code: number;
  message: string;
}

export type GetVisitsResponse = getVisitsSucess | getVisitsFail;

// just one
interface VisitsSuccessfull {
  ok: true;
  message: string;
  visits: VisitsDB;
}

interface VisitsFail {
  ok: false;
  error?: any;
  code: number;
  message: string;
}

export type VisitsGenericResponse = VisitsSuccessfull | VisitsFail;

export type VisitsQueryParams = {
  search?: string;
  page?: string;
  limit: string;
};
