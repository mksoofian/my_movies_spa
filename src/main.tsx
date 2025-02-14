import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./Layouts/default-layout.tsx";
import TopRated from "./pages/topRated.tsx";
import Watchlist from "./pages/watchlist.tsx";
import { WatchlistProvider } from "./providers/watchlistProvider.tsx";
import Search from "./pages/search.tsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/toprated",
        element: <TopRated />,
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WatchlistProvider>
        <RouterProvider router={router} />
      </WatchlistProvider>
    </QueryClientProvider>
  </StrictMode>
);
