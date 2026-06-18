---
name: mantine-conventions
description: Mantine 8.x UI component patterns for Loom & Lume — theme configuration, color system, available packages, form patterns, and notification usage
invokedBy: claude
---

# Mantine 8.x Conventions — Loom & Lume

## Theme Configuration

Defined in `src/app/layout.tsx` via `createTheme()`:

```typescript
const theme = createTheme({
  primaryColor: "primaryDark",
  primaryShade: 6,
  colors: {
    primary: ["#fbebe3", "#f0cfc3", "#e9b5a3", "#e09b82", "#d88163", "#c86c4b", "#b26c51", "#9c5c43", "#864e38", "#70402e"],
    primaryDark: ["#fff1ea", "#f5d5c6", "#e9b9a3", "#dc9d80", "#cf815d", "#c2653a", "#b26c51", "#9c5c43", "#7e452f", "#5f2e1b"],
    gray: ["#f6f6f6", "#ececec", "#e3e3e3", "#d9d9d9", "#d0d0d0", "#c6c6c6", "#ababab", "#919191", "#767676", "#575757"],
    black: ["#f5f5f5", "#e7e7e7", "#cdcdcd", "#b2b2b2", "#9a9a9a", "#8b8b8b", "#848484", "#717171", "#363535ff", "#2c2c2c"],
  },
});
```

**Primary action color:** `primaryDark.6` (`#b26c51` — warm brown)
**Text color:** `black.8` (`#363535`)

## Available Mantine Packages

| Package | Version | Usage |
|---------|---------|-------|
| `@mantine/core` | ^8.3.10 | Core components (Button, TextInput, Modal, etc.) |
| `@mantine/hooks` | ^8.3.10 | useDisclosure, useMediaQuery, useDebouncedValue |
| `@mantine/form` | ^8.3.10 | Form state management with validation |
| `@mantine/notifications` | ^8.3.10 | Toast notifications (configured in root layout) |
| `@mantine/carousel` | ^8.3.10 | Image carousels (Embla-based) |
| `@mantine/spotlight` | ^8.3.10 | Cmd+K search modal |
| `@mantine/dropzone` | ^8.3.10 | File upload drag-and-drop |
| `@mantine/modals` | ^8.3.10 | Modal manager |
| `@mantine/tiptap` | ^8.3.10 | Rich text editor (admin product descriptions) |
| `@mantine/dates` | ^8.3.10 | Date picker components |
| `@mantine/charts` | ^8.3.10 | Chart components (Recharts-based) |
| `@mantine/nprogress` | ^8.3.10 | Navigation progress bar |

## Icon Library

Use `@tabler/icons-react` (NOT FontAwesome for Mantine components):

```typescript
import { IconHeart, IconShoppingCart, IconSearch } from "@tabler/icons-react";

<IconHeart size={20} stroke={1.5} />
```

FontAwesome (`@fortawesome/react-fontawesome`) is also installed but used sparingly.

## Component Usage Patterns

### Buttons
```tsx
<Button color="primaryDark" variant="filled">Primary Action</Button>
<Button variant="outline" color="gray">Secondary</Button>
<Button variant="subtle">Tertiary</Button>
```

### Form with Validation
```tsx
const form = useForm({
  mode: "uncontrolled",
  initialValues: { name: "", email: "" },
  validate: {
    name: isNotEmpty("Name is required"),
    email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
  },
});

<form onSubmit={form.onSubmit(handleSubmit)}>
  <TextInput label="Name" {...form.getInputProps("name")} />
  <Button type="submit">Save</Button>
</form>
```

### Notifications
```tsx
import { notify } from "@/utils/helperFunctions";

notify({ variant: "success", title: "Saved", message: "Profile updated" });
notify({ variant: "error", title: "Error", message: "Something went wrong" });
```

The `<Notifications />` component is mounted in root layout — no additional setup needed.

### Modal
```tsx
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

const [opened, { open, close }] = useDisclosure(false);

<Modal opened={opened} onClose={close} title="Confirm">
  <p>Are you sure?</p>
  <Button onClick={handleConfirm}>Yes</Button>
</Modal>
```

### Loading States
The project uses custom Shimmer components in `src/(components)/Shimmer/` for loading skeletons. Use `<Skeleton />` from Mantine for simpler cases.

## Styling

- **Primary:** Tailwind CSS for layout and spacing
- **Secondary:** Mantine's built-in props (`p`, `m`, `c`, `bg`, etc.)
- **Tertiary:** CSS Modules (`.module.css`) for complex component styles
- PostCSS with `postcss-preset-mantine` for Mantine CSS variable support

## Fonts

| Font | Variable | Usage |
|------|----------|-------|
| Poppins (400, 600, 700) | `--font-poppins` | Headings |
| Inter (400, 500) | `--font-inter` | Body text |
| Jost (500, 600) | `--font-jost` | Secondary text |
| Allura (400) | `--font-allura` | Decorative/script |

## Responsive Design

Use Mantine's responsive props and hooks:
```tsx
<SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
```

```tsx
import { useMediaQuery } from "@mantine/hooks";
const isMobile = useMediaQuery("(max-width: 768px)");
```
