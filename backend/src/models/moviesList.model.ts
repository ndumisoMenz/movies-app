import mongoose from "mongoose";

export interface MovieListDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId; 
  movieId: string;               
  movieTitle: string;
  movieYear?: string;
  poster?: string;
  type: string;                  
  createdAt: Date;
  updatedAt: Date;
}

const moviesListSchema = new mongoose.Schema<MovieListDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: String, required: true },
    movieTitle: { type: String, required: true },
    movieYear: { type: String },
    poster: { type: String },
    type: { type: String, required: true }, 
  },
  { timestamps: true }
);

const MoviesListModel = mongoose.model<MovieListDocument>(
  "MoviesList",
  moviesListSchema
);

export default MoviesListModel;
