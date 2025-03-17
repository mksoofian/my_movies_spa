import { http, HttpResponse } from "msw";

export const handlers = [
  // An example handler
  http.get("https://api.themoviedb.org/3/search/", () => {
    return HttpResponse.json({ name: "John Maverick" });
  }),
];
