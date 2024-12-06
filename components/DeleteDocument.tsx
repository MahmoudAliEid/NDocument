import React, { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import { Notify } from "@/lib/utils";
import { deleteDocument } from "@/actions/actions";

const DeleteDocument = () => {
  const [open, setOpen] = React.useState(false);
  const pathName = usePathname();
  const [isPending, setTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    const roomId = pathName.split("/").pop();
    if (!roomId) return;

    setTransition(async () => {
      const { success } = await deleteDocument(roomId);
      if (success) {
        // Redirect to home page
        router.replace("/");
        setOpen(false);
        Notify({ message: "Document deleted successfully", type: "success" });
      } else {
        Notify({ message: "Failed to delete document", type: "error" });
        setOpen(false);
      }
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"destructive"}>Delete</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure to delete?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              document, all of its contents, and remove all collaborators from
              document.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 flex justify-between">
            <Button
              onClick={handleDelete}
              disabled={isPending}
              variant={"destructive"}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
            <DialogClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteDocument;
