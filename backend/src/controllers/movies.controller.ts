import { Response } from "express";
import { z } from "zod";
import catchErrors from "../utils/catchErrors.js";
import MoviesListModel, { MovieListDocument } from "../models/moviesList.model.js";
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from "../constants/http.js";
import { AuthenticatedRequest } from "../middleware/requireUser.js";


export const getMoviesHandler = catchErrors(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(BAD_REQUEST).json({ message: "User not authenticated" });
  }

  const movies: MovieListDocument[] = await MoviesListModel.find({ user: userId }).sort({ createdAt: -1 });

  return res.status(OK).json(movies);
});


const addMovieSchema = z.object({
  movieId: z.string().min(1, "movieId is required"),
  movieTitle: z.string().min(1, "movieTitle is required"),
  movieYear: z.string().optional(),
  poster: z.string().optional(),
  type: z.string().min(1, "type is required"),
});


export const addMovieHandler = catchErrors(async (req: AuthenticatedRequest, res: Response) => {
  const data = addMovieSchema.parse(req.body);

  const userId = req.userId;
  if (!userId) {
    return res.status(BAD_REQUEST).json({ message: "User not authenticated" });
  }

  const exists = await MoviesListModel.findOne({ user: userId, movieId: data.movieId });
  if (exists) {
    return res.status(BAD_REQUEST).json({ message: "Movie already in list" });
  }

  const movie: MovieListDocument = await MoviesListModel.create({
    user: userId,
    ...data,
  });

  return res.status(CREATED).json({
    message: "Movie added to list",
    movie,
  });
});


export const removeMovieHandler = catchErrors(async (req: AuthenticatedRequest, res: Response) => {
  const { movieId } = req.params;
  const userId = req.userId;

  if (!userId) {
    return res.status(BAD_REQUEST).json({ message: "User not authenticated" });
  }

  const deleted = await MoviesListModel.findOneAndDelete({
    user: userId,
    movieId,
  });

  if (!deleted) {
    return res.status(NOT_FOUND).json({ message: "Movie not found in list" });
  }

  return res.status(OK).json({ message: "Movie removed from list" });
});
