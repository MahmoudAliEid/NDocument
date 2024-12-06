"use client";
import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import React from "react";
import FollowPointer from "./FollowPointer";

const LiveCursorProvider = ({ children }: { children: React.ReactNode }) => {
  //eslint-disable-next-line
  const [myPresence, setMyPresence] = useMyPresence();
  const others = useOthers();

  const handleOnPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    setMyPresence({
      cursor,
    });
  };
  const handleOnPointerLeave = () => {
    setMyPresence({
      cursor: null,
    });
  };

  return (
    <div
      onPointerMove={handleOnPointerMove}
      onPointerLeave={handleOnPointerLeave}
    >
      {/* Render cursor */}
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => (
          <FollowPointer
            key={connectionId}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
            info={info}
          />
        ))}
      {children}
    </div>
  );
};

export default LiveCursorProvider;
