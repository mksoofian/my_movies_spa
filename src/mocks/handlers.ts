import {
  noMatchingMovieIdPage1,
  noMatchingMovieIdPage2,
  noMatchingMovieIdPage3,
  noMatchingMovieIdPage4,
} from "./../utils/movie-card-sample-data";
import { http, HttpResponse } from "msw";

export const handlers = [
  // An example handler
  http.get("https://api.themoviedb.org/3/search/*", ({ request }) => {
    const url = new URL(request.url);

    // Identifies what page number is being requested
    const pageNum = url.searchParams.get("page");
    console.log("hello from msw", `page: ${pageNum}`);

    // Switch to return the correct page
    // switch (pageNum) {
    //   case "1":
    //     return HttpResponse.json(noMatchingMovieIdPage1);
    //   case "2":
    //     return HttpResponse.json(noMatchingMovieIdPage2);
    //   case "3":
    //     return HttpResponse.json(noMatchingMovieIdPage3);
    //   case "4":
    //     return HttpResponse.json(noMatchingMovieIdPage4);
    //   default: {
    //     return HttpResponse.json({ name: "No data matching your request" });
    //   }
    // }
    if (pageNum === "1")
      return HttpResponse.json({ response: "Page 1 was requested" });
    return HttpResponse.json({ name: "John Maverick" });
  }),
];
