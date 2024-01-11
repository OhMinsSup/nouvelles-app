import type { EditorProps } from '@tiptap/pm/view';

export function TiptapEditorProps(className?: string): EditorProps {
  return {
    attributes: {
      class: className ?? '',
    },
  };
}
