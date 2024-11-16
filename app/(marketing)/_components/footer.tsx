import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import Link from "next/link";

export function Footer() {
  return (
    <div className="flex items-center w-full px-6 py-2 z-50 bg-transparent">
      <div className="hidden md:block">
        <Logo />
      </div>
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Link href="/privacy-policy">
          <Button variant="ghost" size="sm">
            Privacy Policy
          </Button>
        </Link>
        <Link href="/terms-of-service">
          <Button variant="ghost" size="sm">
            Terms & Conditions
          </Button>
        </Link>
      </div>
    </div>
  );
}
