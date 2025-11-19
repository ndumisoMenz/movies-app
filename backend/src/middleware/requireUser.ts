import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel, { UserDocument } from "../models/user.model.js";
import { UNAUTHORIZED } from "../constants/http.js";

/**
 * Extend Express Request type to include user and userId
 */
export interface AuthenticatedRequest extends Request {
  user?: UserDocument;
  userId?: string;
}

/**
 * Middleware to verify JWT and attach user info to request.
 */
const requireUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // 1️⃣ Extract token from cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: "Access token missing. Please log in." });
    }

    // 2️⃣ Verify that JWT_SECRET is defined
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }

    // 3️⃣ Verify the token
    const decoded = jwt.verify(
      token,
      secret
    ) as JwtPayload & { userId: string };

    if (!decoded?.userId) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: "Invalid or expired token." });
    }

    // 4️⃣ Fetch the user from database
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: "User not found. Please register again." });
    }

    // 5️⃣ Attach user info to request object
    req.user = user;
    req.userId = user._id.toString();

    next();
  } catch (error: any) {
    console.error("requireUser error:", error.message);
    return res
      .status(UNAUTHORIZED)
      .json({ message: "Authentication failed. Please log in again." });
  }
};

export default requireUser;
