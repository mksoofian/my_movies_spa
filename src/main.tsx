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

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <WatchlistProvider>
          <RouterProvider router={router} />
        </WatchlistProvider>
      </QueryClientProvider>
    </StrictMode>
  );
});
