import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import type { SessionDocument } from "../models/session.model.js";
import type { UserDocument } from "../models/user.model.js";
import { JWT_SECRET,JWT_REFRESH_SECRET } from "../constants/env.js";

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET,
};

export const refreshTokenSignOptions:SignOptionsAndSecret={
    expiresIn:"30d",
    secret:JWT_REFRESH_SECRET,
}

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret,{...defaults,
    ...signOpts});
};
