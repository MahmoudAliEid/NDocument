"use client";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { createNewDocument } from "@/actions/actions";
import { useRouter } from "next/navigation";

const NewDocumentButton = () => {
  const [isPending, startTransition] = useTransition();
  const Router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      if (docId) {
        // navigate to the new document
        Router.replace(`/doc/${docId}`);
      }
    });
  };

  return (
    <Button
      onClick={handleCreateNewDocument}
      disabled={isPending}
      className="py-5 bg-gradient-to-r from-primary via-blue-500 to-purple-500 animate-pulse"
    >
      {isPending ? "Creating..." : "New Document"}
    </Button>
  );
};

export default NewDocumentButton;
