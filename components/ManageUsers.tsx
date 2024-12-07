import React, { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Notify } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react";
import useOwner from "@/lib/useOwner";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { DeleteIcon } from "lucide-react";
import { deleteUserFromRoom } from "@/actions/actions";
import { stringToColor } from "@/lib/stringToColor";

const ManageUsers = () => {
  const [open, setOpen] = React.useState(false);
  const { user } = useUser();
  const room = useRoom();
  const isOwner = useOwner();
  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );
  const [isPending, setTransition] = useTransition();
  const handleDelete = (userId: string) => {
    setTransition(async () => {
      if (!user) return;
      const { success } = await deleteUserFromRoom(room.id, userId);
      if (success) {
        Notify({
          message: "User removed successfully",
          type: "success",
        });
      } else {
        Notify({
          message: "Failed to remove user",
          type: "error",
        });
      }
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            Users ({usersInRoom?.docs.length})
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Users with Access</DialogTitle>
            <DialogDescription>
              Below is a list of users who have access to this document.
            </DialogDescription>
          </DialogHeader>
          <hr className="my-2" />
          <div className="flex flex-col space-y-2">
            {usersInRoom?.docs.map((doc) => {
              const data = doc.data();
              return (
                <div key={doc.id} className="flex justify-between items-center">
                  <p className="!font-light text-gray-500">
                    {data.userId === user?.emailAddresses[0].toString() ? (
                      <p style={{ color: `${stringToColor(data.userId)}` }}>
                        You ({data.userId})
                      </p>
                    ) : (
                      `${data.userId}`
                    )}
                  </p>

                  <div className="flex justify-between items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        Notify({
                          message: "Feature not available yet",
                          type: "error",
                        });
                      }}
                    >
                      {data.role.charAt(0).toUpperCase() + data.role.slice(1)}
                    </Button>
                    {isOwner && data.role !== "owner" && (
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(data.userId)}
                        disabled={isPending}
                        security="danger"
                        size={"sm"}
                      >
                        {isPending ? "Removing..." : <DeleteIcon size={16} />}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
