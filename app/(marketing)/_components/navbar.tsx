"use client";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="z-50 flex items-center w-full px-6 py-2 justify-between bg-transparent">
      <Logo />
      <div className="flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant={"outline"} size={"sm"}>
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </SignInButton>
            <ModeToggle />
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Link href="/documents">
              <Button size="sm" className="group">
                Workspace
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </div>
    </div>
  );
}
