// import { z } from "zod";
// import catchErrors from "../utils/catchErrors.js";
// import { createAccount, loginUser } from "../services/auth.service.js";
// import { BAD_REQUEST, CREATED, OK,NOT_FOUND } from "../constants/http.js";
// import { setAuthCookies } from "../utils/cookies.js";
// import { loginSchema, registerSchema } from "./auth.schemas.js";


// import { Response } from "express";




// export const registerHandler=catchErrors(async(req,res)=>{

//         //validate request

//         const request=registerSchema.parse({
//             ...req.body,
//             userAgent:req.headers["user-agent"]
//         })

//         //call service

//         const {user,accessToken,refreshToken}=await createAccount(request);

//         //return response

//         return setAuthCookies({res,accessToken,refreshToken})
//         .status(CREATED).json(user)
//     }
// )

// export const loginHandler = catchErrors(async (req, res) => {
//   const request = loginSchema.parse({
//     ...req.body,
//     userAgent: req.headers["user-agent"],
//   });

//   const { user, accessToken, refreshToken } = await loginUser(request);


//   // ✅ Return user and tokens in JSON + set cookies
//   return setAuthCookies({ res, accessToken, refreshToken })
//     .status(OK)
//     .json({
//       user,          // include user
//       accessToken,   // include access token
//       refreshToken,  // include refresh token
//       message: "Login successful",
//     });
// });

import { z } from "zod";
import catchErrors from "../utils/catchErrors.js";
import { createAccount, loginUser } from "../services/auth.service.js";
import { BAD_REQUEST, CREATED, OK, NOT_FOUND } from "../constants/http.js";
import { setAuthCookies, clearAuthCookies } from "../utils/cookies.js";
import { loginSchema, registerSchema } from "./auth.schemas.js";
import SessionModel from "../models/session.model.js";
import { verifyToken } from "../utils/jwt.js";
import type { Request, Response } from "express";

// REGISTER HANDLER
export const registerHandler = catchErrors(async (req: Request, res: Response) => {
  // Validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // Create user
  const { user, accessToken, refreshToken } = await createAccount(request);

  // Return response with cookies
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

// LOGIN HANDLER
export const loginHandler = catchErrors(async (req: Request, res: Response) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await loginUser(request);

  // Return user + tokens in JSON + set cookies
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({
      user,
      accessToken,
      refreshToken,
      message: "Login successful",
    });
});

// LOGOUT HANDLER
export const logoutHandler = catchErrors(async (req: Request, res: Response) => {
  // Access token from cookies
  const accessToken = req.cookies?.accessToken as string | undefined;

  if (accessToken) {
    const { payload } = verifyToken(accessToken);
    if (payload?.sessionId) {
      // Delete session from DB
      await SessionModel.findByIdAndDelete(payload.sessionId);
    }
  }

  // Clear cookies and respond
  return clearAuthCookies(res)
    .status(OK)
    .json({
      message: "Logout successful",
    });
});



