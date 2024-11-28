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
        Router.push(`/doc/${docId}`);
      }
    });
  };

  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? "Creating..." : "New Document"}
    </Button>
  );
};

export default NewDocumentButton;
