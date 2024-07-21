import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/../public/icon.png";
import { SignIn } from "./sign-in";
import { auth } from "@/auth";
import { SignOut } from "./sign-out";
import { ModeToggle } from "./mode-toggle";
async function Header() {
  const session = await auth();

  if (!session) return null;
  if (!session.user) return null;

  return (
    <div className=" py-2 dark:bg-inherit">
      <div className="border-b border-slate-200 dark:border-slate-600 flex justify-between items-center">
        <Link href={"/"} className="flex items-center gap-1 hover:underline">
          <Image src={Logo} alt="Brand Logo" width={60} height={60} />
          <span className="text-2xl font-bold ">devFinder</span>
        </Link>

        <div className="flex items-center gap-2">
          <div>{session.user.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Header;
