import { Router } from "express";
import {
  getMoviesHandler,
  addMovieHandler,
  removeMovieHandler,
} from "../controllers/movies.controller.js";
import requireUser from "../middleware/requireUser.js";

const router = Router();

// All routes require authentication
router.use(requireUser);

// GET /api/movies → Get the authenticated user's movie list
router.get("/", getMoviesHandler);



// POST /api/movies → Add a movie to the user's list
router.post("/", addMovieHandler);

// DELETE /api/movies/:movieId → Remove a movie from the user's list
router.delete("/:movieId", removeMovieHandler);

export default router;
