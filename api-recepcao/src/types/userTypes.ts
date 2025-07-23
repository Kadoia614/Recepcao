// Base Types
export interface UserParams {
    uuid: string;
}

export interface UserRequired {
  first_name: string;
  last_name: string;
  username: string;
  role: "admin" | "user";
  email: string;
  password: string;
  cpf: string;
}

export interface UserOptional extends UserParams {
  firstLogin: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface UserAtributes extends UserRequired, UserOptional {}


// response to methodes
interface getUserSucess {
  ok: true;
  message: string;
  user: UserAtributes[];
  count: number
}

interface getUserFail {
  ok: false;
  code: number;
  message: string;
}

export type GetUserGenericResponse = getUserSucess | getUserFail

interface userSuccessful {
  ok: true;
  code: number;
  message: string;
  user: UserAtributes;
}

interface UserFail {
  ok: false;
  code: number;
  message: string;
}

export type UserGenericResponse = userSuccessful | UserFail;


export type UserQueryParams = {
  search?: string;
  page?: number;
  limit?: number;
};
