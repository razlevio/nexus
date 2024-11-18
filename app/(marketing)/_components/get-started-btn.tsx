"use client";

import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

export function GetStartedBtn() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <>
      {isAuthenticated && !isLoading && (
        <Link href="/documents">
          <Button className="group text-lg h-12 px-8 w-full">
            Go to Workspace
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button className="group text-lg h-12 px-8">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </SignInButton>
      )}
    </>
  );
}
