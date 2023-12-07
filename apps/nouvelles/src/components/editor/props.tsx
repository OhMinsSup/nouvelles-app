import { EditorProps } from "@tiptap/pm/view";
import { cn } from "apps/nouvelles/src/utils/utils";

export function TiptapEditorProps(
  setIsSubmitting?: (
    isSubmitting: "submitting" | "submitted" | "saved"
  ) => void,
  className?: string
): EditorProps {
  return {
    attributes: {
      class: className ?? "",
    },
  };
}
