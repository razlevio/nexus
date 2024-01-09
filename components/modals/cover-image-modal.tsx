"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

/**
 * CoverImageModal component provides a user interface for updating the cover image of a document.
 * It utilizes a dialog to present an image dropzone and handles the image uploading and document updating.
 */
export function CoverImageModal() {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Closes the modal and resets the state.
   */
  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  }

  /**
   * Handles changes to the selected file, uploads the new image, and updates the document.
   * @param {File} file - The new image file selected by the user.
   */
  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      // Upload the new image file to the EdgeStore service.
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url
        }
      });

      // Update the document with the new cover image URL.
      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url
      });

      // Close the modal and reset the state.
      onClose();
    }
  }

  return (
    // Dialog component for the modal interface.
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        {/* Header section of the dialog with the title. */}
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Cover Image
          </h2>
        </DialogHeader>
        {/* SingleImageDropzone for selecting and uploading a new image. */}
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
