import Type, { Static } from "typebox";

export const baseSchema = Type.Object({
  id: Type.String(),
  isEnabled: Type.Boolean(),
  isDeleted: Type.Boolean(),
  createdBy: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedBy: Type.String(),
  updatedAt: Type.String({ format: "date-time" }),
  deletedBy: Type.Union([Type.String(), Type.Null()]),
  deletedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
});

export type BaseModel = Static<typeof baseSchema>;

export type BasePersistedProps = BaseModel;
