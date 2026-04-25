import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Providers } from "@/app/providers";
import { Counter } from "@/components/Counter";

import "@/index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root not found");

createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Counter />
      </main>
    </Providers>
  </StrictMode>
);
