import React, { FormEvent, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

import { Notify } from "@/lib/utils";
import { inviteUser } from "@/actions/actions";
import { Input } from "./ui/input";

const InviteUser = () => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const pathName = usePathname();
  const [isPending, setTransition] = useTransition();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const roomId = pathName.split("/").pop();
    if (!roomId) return;

    setTransition(async () => {
      const { success } = await inviteUser(roomId, email);
      if (success) {
        setOpen(false);
        setEmail("");
        Notify({
          message: "User invited successfully",
          type: "success",
        });
      } else {
        Notify({ message: "SomeThing went wrong!", type: "error" });
        setOpen(false);
      }
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Invite</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add People to collaborate!</DialogTitle>
            <DialogDescription>Add user email to invite</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={"w-full"}
            />
            <Button type="submit" disabled={isPending || !email}>
              {isPending ? "Inviting..." : "Invite"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InviteUser;
