"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";

// Initialize the Convex client with the provided endpoint.
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * ConvexClientProvider component wraps its children with necessary providers for Convex and Clerk.
 * It facilitates integration with Convex for database interactions and Clerk for authentication.
 *
 * @param {ReactNode} children - Child components to be wrapped by the provider.
 * @returns The ConvexClientProvider component.
 */
export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    // The ClerkProvider wraps the application with Clerk authentication context.
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      {/* ConvexProviderWithClerk integrates Convex with Clerk for authenticated database operations. */}
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
