//   .tolocaldatestring subtracts a day... need to fix -- use datefns?
export const dateFormatter = (date: string) => {
  // format of date param "1957-04-10", YYYY-MM-DD
  // to format "Apr 10, 1957"
  console.log(date);
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
