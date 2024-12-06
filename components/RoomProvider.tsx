"use client";
import React from "react";

import {
  RoomProvider as RoomProviderWrapper,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import LoadingSpinner from "./LoadingSpinner";
import LiveCursorProvider from "./LiveCursorProvider";

const RoomProvider = ({
  roomId,
  children,
}: {
  roomId: string;
  children: React.ReactNode;
}) => {
  return (
    <RoomProviderWrapper
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        <LiveCursorProvider>{children}</LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProviderWrapper>
  );
};

export default RoomProvider;
