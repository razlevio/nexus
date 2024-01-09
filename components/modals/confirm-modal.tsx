"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/**
 * Props for the ConfirmModal component.
 * @property {React.ReactNode} children - The trigger element that opens the modal.
 * @property {Function} onConfirm - The callback function to execute when the confirm action is taken.
 */
type ConfirmModalProps = {
  children: React.ReactNode;
  onConfirm: () => void;
}

/**
 * ConfirmModal component provides a user interface for confirmation actions.
 * It uses an AlertDialog to prompt the user to confirm or cancel an important action.
 *
 * @param {ConfirmModalProps} props - The props for the component.
 * @returns The ConfirmModal component.
 */
export const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
  /**
   * Handles the confirm action.
   * Prevents event propagation and executes the onConfirm callback.
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The click event.
   */
  const handleConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onConfirm();
  };

  return (
    <AlertDialog>
      {/* Trigger element to open the modal, stopping propagation to prevent unintended behavior. */}
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
        {children}
      </AlertDialogTrigger>

      {/* Content of the modal, including header, description, and footer with actions. */}
      <AlertDialogContent>
        {/* Header section with the title and description of the confirmation. */}
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Footer section with the actions to confirm or cancel. */}
        <AlertDialogFooter>
          {/* Cancel action, also stopping propagation. */}
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          {/* Confirm action, handled by handleConfirm. */}
          <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
