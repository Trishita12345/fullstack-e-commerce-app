"use client";

import { useUncontrolled } from "@mantine/hooks";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Group, Stack, Text } from "@mantine/core";

export interface CustomInputProps<T> {
  withAsterisk?: boolean;
  label?: string;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export function CustomRichTextEditor({
  withAsterisk = false,
  label = "",
  value,
  defaultValue,
  onChange,
}: CustomInputProps<string>) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({ link: false }),
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    // content: defaultValue,
    content: value ?? defaultValue,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <Stack gap={1.5}>
      <Group gap={3}>
        <Text size="sm" fw={500}>
          {label}
        </Text>
        {withAsterisk && (
          <Text c="red" size="sm" fw={500}>
            *
          </Text>
        )}
      </Group>
      <RichTextEditor
        editor={editor}
        styles={{
          content: {
            height: "300px",
            overflowY: "scroll",
          },
          control: {
            color: "var(--mantine-color-primary-7)",
          },
          controlsGroup: {
            backgroundColor: "var(--mantine-color-primaryDark-1) !important",
          },
        }}
      >
        <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Stack>
  );
}
