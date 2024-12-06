import React from "react";
import Document from "@/components/Document";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return (
    <div className="flex flex-col min-h-screen">
      <Document id={id} />
    </div>
  );
};

export default page;
