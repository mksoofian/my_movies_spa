export const dateFormatter = (date: string) => {
  // format of date param "1957-04-10", YYYY-MM-DD
  // to format "Apr 10, 1957"
  return new Date(date.replace(/-/g, "/")).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
