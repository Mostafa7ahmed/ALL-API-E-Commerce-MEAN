import Jwt from "jsonwebtoken";
export const createToken = (payload: any, role: string) =>
  Jwt.sign({ _id: payload, role: role }, process.env.JWT_KEY!, {
    expiresIn: process.env.JWT_Expire,
  });
export const createResetToken = (payload: any) =>
  Jwt.sign({ _id: payload }, process.env.JWT_KEY!, {
    expiresIn: process.env.JWT_RESET_EXPIRE,
  });
