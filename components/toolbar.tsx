"use client";

import { ElementRef, useRef, useState } from "react";
import { ImageIcon, Smile, X } from "lucide-react";
import { useMutation } from "convex/react";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/use-cover-image";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

import { IconPicker } from "./icon-picker";
import { CoverImageModal } from "./modals/cover-image-modal";

type ToolbarProps = {
  initialData: Doc<"documents">;
  preview?: boolean;
};

/**
 * A toolbar component providing a UI for editing document properties like title, icon, and cover image.
 * It uses several hooks and components to provide its functionality.
 *
 * @param {ToolbarProps} props - The props for the component.
 * @returns The Toolbar component.
 */
export function Toolbar({
  initialData,
  preview
}: ToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const coverImage = useCoverImage();

  // Enables the input for editing the title.
  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  // Disables the input and ends the editing mode.
  const disableInput = () => setIsEditing(false);

  // Handles changes to the input, updating the title in real-time.
  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled"
    });
  };

  // Handles keydown events, specifically to stop editing when Enter is pressed.
  const onKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  // Handles selection of a new icon.
  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  // Handles removal of the current icon.
  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id
    })
  }

 // The main render of the toolbar.
 return (
  <div className="pl-[54px] group relative">
    {/* Conditional rendering for the icon picker and removal button. */}
    {!!initialData.icon && !preview && (
      <div className="flex items-center gap-x-2 group/icon pt-6">
        <IconPicker onChange={onIconSelect}>
          <p className="text-6xl hover:opacity-75 transition">
            {initialData.icon}
          </p>
        </IconPicker>
        <Button
          onClick={onRemoveIcon}
          className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
          variant="outline"
          size="icon"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )}

    {/* Rendering for the icon in preview mode. */}
    {!!initialData.icon && preview && (
      <p className="text-6xl pt-6">
        {initialData.icon}
      </p>
    )}

    {/* Buttons for adding an icon or cover image, visible on hover. */}
    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
      {!initialData.icon && !preview && (
        <IconPicker asChild onChange={onIconSelect}>
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <Smile className="h-4 w-4 mr-2" />
            Add icon
          </Button>
        </IconPicker>
      )}
      {!initialData.coverImage && !preview && (
        <Button
          onClick={coverImage.onOpen}
          className="text-muted-foreground text-xs"
          variant="outline"
          size="sm"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Add cover
        </Button>
      )}
    </div>
    
    {/* Text area for editing the title, visible when in editing mode. */}
    {isEditing && !preview ? (
      <TextareaAutosize
        ref={inputRef}
        onBlur={disableInput}
        onKeyDown={onKeyDown}
        value={value}
        onChange={(e) => onInput(e.target.value)}
        className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
      />
    ) : (
      /* The title of the document, clickable to start editing. */
      <div
        onClick={enableInput}
        className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
      >
        {initialData.title}
      </div>
    )}
  </div>
)
}