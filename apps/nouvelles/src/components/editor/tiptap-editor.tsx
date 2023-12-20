/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';
import { useImperativeHandle, useRef, forwardRef } from 'react';
import type { Editor } from '@tiptap/react';
import { useEditor, EditorContent } from '@tiptap/react';
import { useDebouncedCallback } from 'use-debounce';
import { TiptapEditorProps } from '~/components/editor/props';
import { TiptapExtensions } from '~/components/editor/extensions';
import { cn } from '~/utils/utils';

export interface TipTapRichTextEditorProps {
  value: string;
  name?: string;
  onChange?: (json: any, html: string, empty: boolean) => void;
  onBlur?: () => void;
  setIsSubmitting?: (
    isSubmitting: 'submitting' | 'submitted' | 'saved',
  ) => void;
  setShouldShowAlert?: (showAlert: boolean) => void;
  editable?: boolean;
  forwardedRef?: any;
  debouncedUpdatesEnabled?: boolean;
  noBorder?: boolean;
  borderOnFocus?: boolean;
  customClassName?: string;
  editorContentCustomClassNames?: string;
  className?: string;
}

function Tiptap(props: TipTapRichTextEditorProps) {
  const {
    name,
    className,
    onChange,
    debouncedUpdatesEnabled,
    forwardedRef,
    editable,
    setIsSubmitting,
    setShouldShowAlert,
    onBlur,
    value,
    noBorder,
    borderOnFocus,
    customClassName,
    editorContentCustomClassNames,
  } = props;

  const editor = useEditor({
    editable: editable ?? true,
    editorProps: TiptapEditorProps(className),
    extensions: TiptapExtensions(),
    content: value,
    onUpdate: ({ editor }) => {
      // for instant feedback loop
      setIsSubmitting?.('submitting');
      setShouldShowAlert?.(true);

      if (debouncedUpdatesEnabled) {
        debouncedUpdates({ onChange, editor });
      } else {
        onChange?.(editor.getJSON(), editor.getHTML(), editor.isEmpty);
      }
    },
    onBlur: () => {
      onBlur?.();
    },
  });

  const editorRef: React.MutableRefObject<Editor | null> = useRef(null);

  useImperativeHandle(forwardedRef, () => ({
    clearEditor: () => {
      editorRef.current?.commands.clearContent();
    },
    setEditorValue: (content: string) => {
      editorRef.current?.commands.setContent(content);
    },
    focus: () => editorRef.current?.chain().focus().run(),
    select: () => editorRef.current?.chain().selectAll().run(),
    setCustomValidity: (_: string) => {},
    reportValidity: () => {},
  }));

  const debouncedUpdates = useDebouncedCallback(({ onChange, editor }) => {
    setTimeout(() => {
      if (onChange) {
        onChange(editor.getJSON(), editor.getHTML(), editor.isEmpty);
      }
    }, 500);
  }, 1000);

  const editorClassNames = `relative w-full max-w-full sm:rounded-lg mt-2 p-3 relative focus:outline-none rounded-md
  ${noBorder ? '' : 'border border-custom-border-200'} ${
    borderOnFocus ? 'focus:border border-custom-border-300' : 'focus:border-0'
  } ${customClassName}`;

  if (!editor) return null;
  editorRef.current = editor;

  return (
    <div
      className={cn(
        'tiptap-editor-container relative cursor-text',
        editorClassNames,
      )}
      id="tiptap-container"
      onClick={() => {
        editor.chain().focus().run();
      }}
    >
      <div className={cn(editorContentCustomClassNames)}>
        <EditorContent editor={editor} name={name} />
      </div>
    </div>
  );
}

const TipTapEditor = forwardRef<
  TipTapRichTextEditorProps,
  TipTapRichTextEditorProps
>((props, ref) => <Tiptap {...props} forwardedRef={ref} />);

TipTapEditor.displayName = 'TipTapEditor';

export { TipTapEditor };
