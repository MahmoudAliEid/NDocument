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
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const { user } = useUser();

  return (
    <div className="flex justify-between p-3 h-16 items-center">
      <div className="py-3 flex gap-3 items-center">
        <Link href="/">
          <Image
            src="/NDocument.png"
            alt="Logo"
            width={50}
            height={40}
            className="align-middle"
          />
        </Link>
        {user && (
          <h1
            className="font-md font-semibold text-slate-900"
            style={{ fontFamily: "Inter" }}
          >
            {user.firstName}
            {`'s Space`}
          </h1>
        )}
      </div>

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
