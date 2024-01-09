"use client";

import { useEffect, useState } from "react";
import { SettingsModal } from "@/components/modals/settings-modal";
import { CoverImageModal } from "@/components/modals/cover-image-modal";

/**
 * ModalProvider component is responsible for rendering modals throughout the application.
 * It ensures that the modals are only mounted client-side to prevent issues with SSR.
 * 
 * @returns The ModalProvider component.
 */
export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  // Effect to set the component as mounted after initial render.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render null until the component has mounted to prevent SSR hydration issues.
  if (!isMounted) return null;

  // Render the modals.
  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
}
