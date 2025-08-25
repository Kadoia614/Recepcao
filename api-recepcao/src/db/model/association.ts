import { Visitors } from "./visitors.js";
import { Visits } from "./visits.js";
import { UserDB } from "./user.js";

Visits.belongsTo(UserDB, {
  foreignKey: "creator_uuid",
  as: "VisitCreator",
  onDelete: "CASCADE",
});

Visits.belongsTo(Visitors, {
  foreignKey: "visitor_uuid",
  as: "VisitVisitor",
  onDelete: "CASCADE",
});

UserDB.hasMany(Visits, {
  foreignKey: "creator_uuid",
  as: "CreatedVisits",
  onDelete: "CASCADE",
});

Visitors.hasMany(Visits, {
  foreignKey: "visitor_uuid",
  as: "VisitorVisits",
  onDelete: "CASCADE",
});
