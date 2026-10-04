import { PageLoading } from "@/components/States";
import { RouterProvider } from "@tanstack/react-router";
import { Suspense } from "react";
import { router } from "./routes";

export default function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
