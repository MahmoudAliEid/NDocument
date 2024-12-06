"use client";
import { MenuIcon } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SideBarOptions from "./SideBarOptions";

interface RoomDocument extends DocumentData {
  roomId: string;
  userId: string;
  role: "owner" | "editor";
  createdAt: Date;
}

const SideBar = () => {
  const { user } = useUser();
  const [groupedDocuments, setGroupedDocuments] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({ owner: [], editor: [] });

  const [data] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user?.emailAddresses[0].toString())
      )
  );

  // ** user's documents categories (my documents, shared with me)
  useEffect(() => {
    if (!data) return;

    const groupedByRole = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      ({ owner, editor }, doc) => {
        const docData = doc.data() as RoomDocument;
        if (docData.role === "owner") {
          owner.push({
            id: doc.id,
            ...docData,
          });
        } else {
          editor.push({
            id: doc.id,
            ...docData,
          });
        }
        return { owner, editor };
      },
      { owner: [], editor: [] }
    );

    setGroupedDocuments(groupedByRole);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />

      {/* my documents */}
      <div className="mt-5 flex flex-col md:max-w-36 space-y-4 py-4">
        {groupedDocuments.owner.length === 0 ? (
          <p className="text-slate-500 font-semibold text-sm">
            No documents found
          </p>
        ) : (
          <>
            <h2 className="text-slate-500 font-semibold text-sm">
              My Documents
            </h2>
            {groupedDocuments.owner.map((doc, index) => (
              <SideBarOptions
                key={index + doc.id}
                id={doc.id}
                href={`/doc/${doc.id}`}
              />
            ))}
          </>
        )}
      </div>

      {/* shared with me */}
      <div className="mt-5 flex flex-col md:max-w-36 space-y-4 py-4">
        {groupedDocuments.editor.length === 0 ? (
          <p className="text-slate-500 font-semibold text-sm">
            No documents found
          </p>
        ) : (
          <>
            <h2 className="text-slate-500 font-semibold text-sm">
              Shared with me
            </h2>
            {groupedDocuments.editor.map((doc, index) => (
              <SideBarOptions
                key={index + doc.id}
                id={doc.id}
                href={`/doc/${doc.id}`}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
  return (
    <div
      className="relative p-2 md:p-5 bg-slate-200 
    "
    >
      <div className="md:hidden ">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="rounded-lg hover:opacity-30 p-2" size={40} />
          </SheetTrigger>
          <SheetContent
            side={"left"}
            style={{
              overflow: "visible",
              overflowY: "auto",
            }}
          >
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div
        className="md:inline hidden 

      "
      >
        {menuOptions}
      </div>
    </div>
  );
};

export default SideBar;
