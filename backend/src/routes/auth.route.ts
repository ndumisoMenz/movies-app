import { Router, Response } from "express";
import { logoutHandler,loginHandler, registerHandler } from "../controllers/auth.controller.js";
import requireUser, { AuthenticatedRequest } from "../middleware/requireUser.js";

const authRoutes = Router();

// Register
authRoutes.post("/register", registerHandler);

// Login
authRoutes.post("/login", loginHandler);

// 🔥 Authenticated route: return current user
authRoutes.get(
  "/me",
  requireUser,
  (req: AuthenticatedRequest, res: Response) => {
    return res.json({ user: req.user });
  }
);
authRoutes.post("/logout", logoutHandler)

export default authRoutes;
