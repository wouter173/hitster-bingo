import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "sonner";
import { AppPage } from "./pages/app.tsx";
import { CallbackPage } from "./pages/callback.tsx";
import { LoginPage } from "./pages/login.tsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppPage />}></Route>
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/login" element={<LoginPage />} />
    </>
  )
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>
);
