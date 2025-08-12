import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Providers from "@/app/providers";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);