"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";

const NavBar = () => {
  const { user } = useUser();

  return (
    <div className="flex justify-between p-5 items-center">
      {user && (
        <h1>
          {user.firstName}
          {`'s Space`}
        </h1>
      )}
      {/* breadcrumbs */}
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default NavBar;
