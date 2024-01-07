"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

type BannerProps = {
  documentId: Id<"documents">;
};

export function Banner({ documentId }: BannerProps) {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);
  const document = useQuery(api.documents.getById, {
    documentId: documentId,
  });

  const onRemove = () => {
    const promise = remove({ id: documentId })
    toast.promise(promise, {
      loading: "Deleting document...",
      success: "Document deleted successfully",
      error: "Failed to delete document",
    });

    router.push("/documents")
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored successfully",
      error: "Failed to restore document",
    });
  };

  return (
    <>
      <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
        <p>This dcument is archived</p>
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={onRestore}
          className="border-white bg-transparent text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Resotre document
        </Button>
        <ConfirmModal onConfirm={onRemove}>
          <Button
            size={"sm"}
            variant={"outline"}
            className="border-white bg-transparent text-white hover:text-white p-1 px-2 h-auto font-normal"
          >
            Delete forever
          </Button>
        </ConfirmModal>
      </div>
    </>
  );
}
