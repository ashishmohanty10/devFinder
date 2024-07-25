import Logo from "@/../public/Logo.png";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { SignIn } from "./sign-in";
import { SignOut } from "./sign-out";

async function AccountDropDown() {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar className="animate-buttonheartbeat w-8 h-8">
          <AvatarImage src={session?.user?.image ?? ""} alt="Profile Image" />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>

        <p className="text-sm font-medium">{session?.user?.name}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="bg-none">
          {session ? <SignOut /> : <SignIn />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

async function Header() {
  const session = await auth();

  return (
    <header className="py-3 dark:bg-inherit border-b sticky top-0 z-50 backdrop-blur-xl">
      <div className="px-4 flex justify-between items-center ">
        <Link href={"/"} className="flex items-center gap-3 hover:underline">
          <Image src={Logo} alt="Brand Logo" width={30} height={30} />
          <span className="text-xl font-bold">DevFinder</span>
        </Link>

        <div className="flex gap-4 items-center">
          {session ? <AccountDropDown /> : <SignIn />}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
