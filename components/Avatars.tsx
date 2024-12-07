"use client";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Avatars = () => {
  const others = useOthers();
  const self = useSelf();

  // Merge self and others into one array safely
  const allUsers = [self, ...others];

  return (
    <div className="flex gap-2 items-center">
      <p className="text-light text-sm">
        {allUsers.length} {allUsers.length > 1 ? "Users" : "User"} currently
        editing this document
      </p>
      <div className="flex -space-x-5">
        {allUsers.map((user, i) => (
          <TooltipProvider key={user?.id || i}>
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="border-2 hover:z-50">
                  <AvatarImage
                    src={user?.info?.avatar || "/default-avatar.png"}
                  />

                  <AvatarFallback>
                    {user?.info?.name?.[0]?.toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {self?.id === user?.id
                    ? "You"
                    : user?.info?.name || "Unknown User"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default Avatars;
