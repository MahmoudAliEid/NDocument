"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-wrap justify-between p-3 h-auto items-center bg-white shadow-md">
      {/* Left section */}
      <div className="flex gap-3 items-center flex-shrink-0">
        <Link href="/">
          <div className="w-12 h-auto">
            <Image
              src="/NDocument.png"
              alt="Logo"
              width={50}
              height={40}
              className="w-full h-auto object-contain"
            />
          </div>
        </Link>
        {user && (
          <h1
            className="font-md sm:font-sm font-semibold text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text truncate max-w-xs"
            style={{ fontFamily: "Inter" }}
          >
            {user.firstName}
            {`'s Space`}
          </h1>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
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
