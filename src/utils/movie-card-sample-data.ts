import { Movie, MovieApiResponse } from "../types/movie_types";

export const errorCard: Movie = {
  adult: false,
  backdrop_path: "",
  genre_ids: [0],
  id: 0,
  original_language: "",
  original_title: "Failed to Fetch Title",
  overview: "",
  popularity: 0,
  poster_path: "",
  release_date: "",
  title: "Failed to Fetch Title",
  video: false,
  vote_average: 0,
  vote_count: 0,
};
export const noMatchingMovieIdPage1: MovieApiResponse = {
  page: 1,
  results: [
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
  ],
  total_pages: 4,
  total_results: 61,
};
export const noMatchingMovieIdPage2: MovieApiResponse = {
  page: 2,
  results: [
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
  ],
  total_pages: 4,
  total_results: 61,
};
export const noMatchingMovieIdPage3: MovieApiResponse = {
  page: 3,
  results: [
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
    errorCard,
  ],
  total_pages: 4,
  total_results: 61,
};
export const noMatchingMovieIdPage4: MovieApiResponse = {
  page: 4,
  results: [
    errorCard,
    {
      adult: false,
      backdrop_path: "",
      genre_ids: [0],
      id: 240,
      original_language: "",
      original_title: "Failed to Fetch Title",
      overview: "",
      popularity: 0,
      poster_path: "",
      release_date: "",
      title: "Failed to Fetch Title",
      video: false,
      vote_average: 0,
      vote_count: 0,
    },
    errorCard,
    errorCard,
  ],
  total_pages: 4,
  total_results: 61,
};
