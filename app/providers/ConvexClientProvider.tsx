"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Provider from "./provider";
import { Suspense } from "react";
import Loading from "../loading";
function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  return (
    <Suspense fallback={<Loading />}>
      <ConvexProvider client={convex}>
        <Provider>{children}</Provider>
      </ConvexProvider>
    </Suspense>
  );
}

export default ConvexClientProvider;
