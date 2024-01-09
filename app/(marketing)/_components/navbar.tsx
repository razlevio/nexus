"use client";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div className={cn("z-50 bg-background fixed top-0 flex items-center w-full p-6 justify-between", scrolled && "border-b shadow-sm")} >
      <Logo />
      <div className="flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button size={"sm"}>Log in</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button>
              <Link href="/documents">Workspace</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}
