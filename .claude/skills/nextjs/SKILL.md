---
name: nextjs-conventions
description: Next.js 16 App Router patterns for Loom & Lume frontend — route groups, server actions, data fetching, component organization, and TypeScript conventions
invokedBy: claude
---

# Next.js 16 Conventions — Loom & Lume

## Route Groups

```
src/app/
├── (customer)/              — Main storefront (header + footer layout)
│   ├── (landing)/           — Homepage sections
│   ├── (authenticated)/     — Protected customer pages (layout checks auth)
│   │   ├── my-profile/
│   │   ├── orders/
│   │   ├── payment-success/
│   │   ├── saved-addresses/
│   │   └── create-checkout-session/
│   ├── products/            — PLP + PDP
│   ├── wishlist/
│   ├── stories/
│   └── about-us/
├── (customer-checkout)/     — Checkout flow (minimal header, no footer)
│   └── checkout/[step]/
├── (authentication)/        — Login/OTP/setup (no header/footer)
│   ├── login/
│   ├── otp/
│   └── setup-account/
├── admin/                   — Admin panel (sidebar layout, role-protected)
│   ├── dashboard/
│   ├── categories/
│   ├── products/
│   └── variants/
├── layout.tsx               — Root layout (MantineProvider, fonts)
└── globals.css
```

## Component Organization

**Shared components:** `src/(components)/[ComponentName]/index.tsx`
- Centralized, reusable across all route groups
- PascalCase directory names
- Each component is a directory with `index.tsx` + optional `.module.css`

**Page-specific components:** `src/app/[route]/(components)/[ComponentName].tsx`
- Co-located with the page that uses them
- Wrapped in parenthesized `(components)` directory (excluded from routing)

## Server vs Client Components

Default to **Server Components**. Only add `"use client"` when the component:
- Uses React hooks (useState, useEffect, useRef)
- Handles browser events (onClick, onChange)
- Accesses browser APIs (localStorage, window)
- Uses Zustand stores

Page-level `page.tsx` files should be Server Components when possible — fetch data with `serverApiFetch` and pass as props to client components.

## Data Fetching

### Client-side: `apiFetch` (`src/lib/apiFetch.ts`)
```typescript
import { apiFetch } from "@/lib/apiFetch";

const data = await apiFetch<ResponseType>("/service-name/endpoint", {
  method: "POST",
  body: requestData,
});
```
- Base URL: `NEXT_PUBLIC_API_URL` (→ `https://api.loomandlume.shop/api`)
- Sends cookies automatically (`credentials: "include"`)
- Auto-retries on 401 (refreshes token, retries once)
- Redirects on 403 via `forbidden()`

### Server-side: `serverApiFetch` (`src/lib/serverApiFetch.ts`)
```typescript
import { serverApiFetch } from "@/lib/serverApiFetch";

const data = await serverApiFetch<ResponseType>("/service-name/endpoint");
```
- Wraps `apiFetch` with cookie injection from `next/headers`
- Use in Server Components and Server Actions

### Current User
```typescript
import { getCurrentUser } from "@/lib/getCurrentUser";

const user = await getCurrentUser(); // cached per request
```

## Server Actions

Location: `actions.ts` files co-located with routes.

```typescript
"use server";

import { serverApiFetch } from "@/lib/serverApiFetch";
import { revalidateTag } from "next/cache";

export async function myAction(data: RequestType): Promise<ResponseType> {
  const result = await serverApiFetch<ResponseType>("/service/endpoint", {
    method: "POST",
    body: data,
  });
  revalidateTag("relevant-tag");
  return result;
}
```

## Zustand Store Pattern

Location: `src/utils/store/[feature].ts`

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FeatureState {
  items: ItemType[];
  actions: {
    fetchItems: () => Promise<void>;
    addItem: (item: ItemType) => void;
    clearData: () => void;
  };
}

export const useFeatureStore = create<FeatureState>()(
  persist(
    (set) => ({
      items: [],
      actions: {
        fetchItems: async () => {
          const data = await apiFetch<ItemType[]>("/endpoint");
          set({ items: data });
        },
        addItem: (item) => set((state) => ({ items: [...state.items, item] })),
        clearData: () => set({ items: [] }),
      },
    }),
    {
      name: "feature-store",  // localStorage key
      partialize: (state) => ({ items: state.items }),  // only persist data, not actions
    }
  )
);

// Export individual selector hooks (prevents unnecessary re-renders)
export const useFeatureItems = () => useFeatureStore((s) => s.items);
export const useFeatureActions = () => useFeatureStore((s) => s.actions);
```

## Protected Routes

```typescript
// layout.tsx for authenticated routes
import { getCurrentUser } from "@/lib/getCurrentUser";
import { unauthorized } from "next/navigation";

export default async function AuthenticatedLayout({ children }) {
  const user = await getCurrentUser();
  if (!user) unauthorized();
  return children;
}
```

## TypeScript Conventions

- Path alias: `@/*` → `src/*`
- Shared types in `src/constants/types.ts`
- Never use `any` — use proper interfaces
- Use `interface` for object shapes, `type` for unions/intersections

## Form Pattern (Mantine)

```typescript
import { useForm } from "@mantine/form";
import { isNotEmpty } from "@mantine/form";

const form = useForm({
  mode: "uncontrolled",
  initialValues: { name: "", email: "" },
  validate: {
    name: isNotEmpty("Name is required"),
    email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
  },
});
```

## Notification Pattern

```typescript
import { notify } from "@/utils/helperFunctions";

notify({
  variant: "success",  // or "error"
  title: "Done",
  message: "Item added to wishlist",
});
```

## Build & Dev

```bash
npm run dev      # Turbopack dev server on :3000 (binds to 127.0.0.1)
npm run build    # Production build with Turbopack
npm run lint     # ESLint with --fix
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` — API Gateway base path (`/api`)
- `NEXT_PUBLIC_FRONTEND` — Frontend URL
- `DATABASE_URL` — Prisma/Better Auth PostgreSQL connection
