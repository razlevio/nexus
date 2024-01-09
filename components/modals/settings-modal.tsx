"use client"

import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";

/**
 * SettingsModal component provides a user interface for application settings.
 * It utilizes a dialog to present various setting options like theme mode toggle.
 */
export function SettingsModal() {
  // Hook to manage settings state.
  const settings = useSettings();

  return (
    // Dialog component for the modal interface.
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        {/* Header section of the dialog with the title. */}
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>
        {/* Content section with setting options. */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            {/* Label for the appearance settings section. */}
            <Label>
              Appearance
            </Label>
            {/* Description for the appearance settings section. */}
            <span className="">
              Customize how workspace looks on your device
            </span>
          </div>
          {/* Toggle component for changing the mode (e.g., dark/light). */}
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  )
}
