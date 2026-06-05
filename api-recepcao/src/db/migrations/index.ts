import { createUsers } from "./202606050001-create-users.js";
import { createVisitors } from "./202606050002-create-visitors.js";
import { createVisits } from "./202606050003-create-visits.js";
import { Migration } from "./types.js";

export const migrations: Migration[] = [
  createUsers,
  createVisitors,
  createVisits,
];
