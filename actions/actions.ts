"use server";
// create server actions

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export const createNewDocument = async () => {
  try {
    // ** check if user is authenticated
    auth.protect();

    const { sessionClaims } = await auth();

    // ** create new document
    const docCollectionRef = adminDb.collection("documents");
    const newDocRef = await docCollectionRef.add({
      title: "🎃New Document, let us do magic",
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
  } catch (e) {
    console.error(e);
    return { docId: null };
  }
};

export const deleteDocument = async (roomId: string) => {
  // ** check if user is authenticated
  auth.protect();

  try {
    // ** delete document
    const docRef = adminDb.collection("documents").doc(roomId);
    await docRef.delete();

    // ** delete all rooms associated with user's collection for  ever user in the room
    const roomRef = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();
    const batch = adminDb.batch();
    roomRef.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const inviteUser = async (roomId: string, email: string) => {
  // ** check if user is authenticated
  auth.protect();

  try {
    // ** check if user is already invited
    // const roomRef = await adminDb
    //   .collection("rooms")
    //   .where("roomId", "==", roomId)
    //   .where("userId", "==", email)
    //   .get();
    // if (!roomRef.empty) {
    //   return { success: false, message: "User is already invited" };
    // }

    // ** invite user
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        roomId,
        userId: email,
        role: "editor",
        createdAt: new Date(),
      });

    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
export const deleteUserFromRoom = async (roomId: string, email: string) => {
  // ** check if user is authenticated
  auth.protect();

  try {
    // ** delete user from room
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
