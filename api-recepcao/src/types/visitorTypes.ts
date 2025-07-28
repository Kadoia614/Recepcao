export interface VisitorsParams {
    uuid: string;
}
  
export interface VisitorsRequired {
  name: string;
  cpf: string;
  photo?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
}

export interface VisitorsOptional extends VisitorsParams {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface VisitorsAtributes extends VisitorsRequired, VisitorsOptional {}

// response to methodes
interface getVisitorsSucess {
  ok: true;
  message: string;
  visitor: VisitorsAtributes[];
  count: number
}

interface getVisitorsFail {
  ok: false;
  code: number;
  message: string;
}

export type GetVisitorssResponse = getVisitorsSucess | getVisitorsFail;

interface VisitorsSuccessful {
  ok: true;
  message: string;
  visitor: VisitorsAtributes;
}

interface VisitorsFail {
  ok: false;
  code: number;
  message: string;
}

export type VisitorsGenericResponse = VisitorsSuccessful | VisitorsFail;

export type VisitorsQueryParams = {
  search?: string;
  page?: number;
  limit?: number;
};
