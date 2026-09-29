import { Document, model, Schema } from "mongoose";

export interface IAuth extends Document {
  username?: string;
  name?: string;
  email: string;
  password: string;
  roles: string[];
  approve: boolean;
}

const authSchema = new Schema<IAuth>(
  {
    username: { type: String, required: false },
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: ["ADMIN", "MANAGER", "USER"],
      default: ["USER"],
    },
    approve: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const authModel = model<IAuth>("users", authSchema);
export const userModel = authModel;
