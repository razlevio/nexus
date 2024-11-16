import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export function Logo() {
  return (
    <Link href="/" className="flex items-center justify-center gap-x-1">
      <Image src="/nexus.png" alt="Logo" width={40} height={40} />
      <p className={cn("font-semibold", font.className)}>Nexus</p>
    </Link>
  );
}
