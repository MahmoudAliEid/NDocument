import LiveBlocksProvider from "@/components/LiveBlocksProvider";
import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>;
};

export default PageLayout;
