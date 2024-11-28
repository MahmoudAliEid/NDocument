"use server";
// create server actions

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export const createNewDocument = async () => {
  // ** check if user is authenticated
  auth.protect();
  const { sessionClaims } = await auth();

  // ** create new document
  const docCollectionRef = adminDb.collection("documents");
  const newDocRef = await docCollectionRef.add({
    title: "🎃New Document for testing , let us do magic",
    createdAt: new Date(),
  });
  if (sessionClaims?.email) {
    await adminDb
      .collection("users")
      .doc(sessionClaims.email)
      .collection("rooms")
      .doc(newDocRef.id)
      .set({
        roomId: newDocRef.id,
        userId: sessionClaims.email,
        role: "owner",
        createdAt: new Date(),
      });
  } else {
    throw new Error("User email is undefined");
  }
  return { docId: newDocRef.id };
};
