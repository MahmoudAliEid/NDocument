"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";

const Document = ({ id }: { id: string }) => {
  const [title, setTitle] = useState("");
  const [isLoading, setTransition] = useTransition();
  const [data] = useDocumentData(doc(db, "documents", id));
  const isOwner = useOwner();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
    } else return;
  }, [data]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      setTransition(async () => {
        // update title
        await updateDoc(doc(db, "documents", id), { title });
      });
    }
  };

  return (
    <div>
      <div className="flex max-w-6xl mx-auto pb-5 justify-between">
        <form onSubmit={handleUpdate} className="flex flex-1 py-1  space-x-2">
          {/* update title ... */}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg  py-3 bg-gray-100 px-3 rounded-md flex-1"
          />
          <Button type="submit" disabled={isLoading} className="py-3">
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </form>
        <div className="py-1 flex ml-1 space-x-2">
          {/* ifOwner && InviteUser , Delete document */}
          {isOwner && (
            <>
              <InviteUser />
              <DeleteDocument />
            </>
          )}
          {/* management users */}

          {/* avatars */}
        </div>
      </div>
      <hr className="pb-10" />
      {/* collaborative editor  */}
      <Editor />
    </div>
  );
};

export default Document;
