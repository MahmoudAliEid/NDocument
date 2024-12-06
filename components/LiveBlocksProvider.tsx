"use client";
import { LiveblocksProvider } from "@liveblocks/react";
// import { createClient, Client } from "@liveblocks/client";
import { ReactNode } from "react";

interface LiveBlocksProviderProps {
  children: ReactNode;
}

const LiveBlocksProvider = ({ children }: LiveBlocksProviderProps) => {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not defined");
  }
  return (
    <LiveblocksProvider authEndpoint={"/auth-endpoint"} throttle={16}>
      {children}
    </LiveblocksProvider>
  );
};

export default LiveBlocksProvider;
