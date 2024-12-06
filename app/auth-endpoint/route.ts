import liveblocks from "@/lib/liveblocks";
import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  auth.protect();

  // Authenticate the user using Clerk
  const { sessionClaims } = await auth();

  if (!sessionClaims || !sessionClaims.email) {
    return new NextResponse("Unauthorized: Invalid session claims", {
      status: 401,
    });
  }

  // Parse request body for room information
  const { room } = await req.json();
  if (!room) {
    console.error("Missing room information in request body");
    return new NextResponse("Bad Request: Room information is required", {
      status: 400,
    });
  }

  // Prepare a Liveblocks session for the user
  const session = liveblocks.prepareSession(
    sessionClaims?.email || "dummy@example.com",
    {
      userInfo: {
        email: sessionClaims?.email || "dummy@example.com",
        name: sessionClaims?.fullName || "Anonymous",
        avatar: sessionClaims?.image || "default-avatar-url",
      },
    }
  );

  if (!session) {
    console.error("Failed to prepare Liveblocks session");
    return new NextResponse(
      "Internal Server Error: Failed to prepare session",
      { status: 500 }
    );
  }

  // Verify if the user is allowed in the requested room via Firestore
  const roomsQuery = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email) // Ensure we're querying by both room and user email
    .get();

  const userRoom = roomsQuery.docs.find((doc) => doc.data().roomId === room);
  // Authorize the user for the room with full access
  if (userRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    // Finalize the authorization and respond
    const { body, status } = await session.authorize();

    return new NextResponse(body, { status });
  } else {
    return NextResponse.json(
      "Unauthorized: User is not allowed in the requested room",
      { status: 401 }
    );
  }
}
