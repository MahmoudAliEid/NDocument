"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";
import Breadcrumbs from "./Breadcrumbs";

const NavBar = () => {
  const { user } = useUser();

  return (
    <div className="flex justify-between p-3 h-14 items-center">
      {user && (
        <h1
          className="font-md font-semibold text-slate-900"
          style={{ fontFamily: "Inter" }}
        >
          {user.firstName}
          {`'s Space`}
        </h1>
      )}
      <Breadcrumbs />
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
