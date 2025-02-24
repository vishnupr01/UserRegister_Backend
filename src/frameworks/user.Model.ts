import mongoose, { Schema, Document } from "mongoose";

export interface IData {
  email:string
  phone:string
  password:string
  confirmPassword:string
  dob:Date,
  name: string;
  currentAddress: string;
  durationAtAddress: string;
  aboutYourself: string;
  employmentStatus: string;
  savingsInvestments: string;
}
export interface IUser extends Document {
  email: string;
  phone: string;
  password: string;
  personalInfo?: {
    dob: Date;
    name: string;
    currentAddress: string;
    durationAtAddress: string;
    aboutYourself: string;
  };
  financialInfo?: {
    employmentStatus: string;
    savingsInvestments: string;
  };
  status: "basic" | "personal" | "financial" | "completed"; // Form progress
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  personalInfo: {
    dob: { type: Date },
    name: { type: String },
    currentAddress: { type: String },
    durationAtAddress: { type: String },
    aboutYourself: { type: String },
  },
  financialInfo: {
    employmentStatus: { type: String },
    savingsInvestments: { type: String },
  },
  status: { type: String, enum: ["basic", "personal", "financial", "completed"], default: "basic" },
}, { timestamps: true });

export default mongoose.model<IUser>("User", UserSchema);
