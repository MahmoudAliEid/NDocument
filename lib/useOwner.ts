import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { collectionGroup, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const useOwner = () => {
  const { user } = useUser();
  const room = useRoom();
  const [isOwner, setIsOwner] = useState(false);
  const [userInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  useEffect(() => {
    if (userInRoom?.docs && userInRoom.docs.length > 0) {
      const owner = userInRoom?.docs.filter(
        (doc) => doc.data().role === "owner"
      );

      owner.some((doc) => {
        if (doc.data().userId === user?.emailAddresses[0].toString()) {
          setIsOwner(true);
          return true;
        }
      });
    }
  }, [userInRoom, user]);

  return isOwner;
};

export default useOwner;
