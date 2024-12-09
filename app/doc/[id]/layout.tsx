import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const DocLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  auth.protect();
  const { id } = params;
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
};

export default DocLayout;
