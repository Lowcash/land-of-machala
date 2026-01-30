# Component Architecture Patterns

This document outlines the core architectural patterns used in the `land-of-machala` codebase to ensure performance, consistency, and type safety.

## 1. Server Components & Client Islands

We prioritize **Server Components** by default to reduce client bundle size and improve initial load performance. Interactive elements are isolated into "Client Islands".

**Pattern:**

- **Pages** (`page.tsx`) are Server Components.
- **Layouts** (`layout.tsx`) are Server Components.
- Interactive parts are extracted into small Client Components (Islands).
- **Slots Pattern**: When a Server Component needs to be nested inside a Client Component (e.g., dynamic tabs switching between server-rendered content), pass the Server Component as a `prop` (Slot) rather than importing it.

**Example:**

```tsx
// Server Component (Parent)
;<DashboardClient tab1={<ServerComponentA />} tab2={<ServerComponentB />} />

// Client Component (Container)
export function DashboardClient({ tab1, tab2 }) {
  return activeTab === '1' ? tab1 : tab2
}
```

## 2. Container / Presentation Pattern

For complex interactive features (like Combat), we separate Logic/State from Rendering.

- **Controller (Container)**: A Client Component that manages state, hooks, and data fetching/mutations. It renders the Presentation component.
- **Layout (Presentation)**: A stateless (or near-stateless) component that accepts data and callbacks. It focuses on UI structure and styling.

**Example:**

- `CombatClient.tsx` (Controller): Uses `useCombatLogic` hook.
- `CombatLayout.tsx` (Presentation): Receives `hp`, `enemy`, `logs`, `onAction`.

## 3. Generic Shop System

Shops use a unified Server Component architecture.

- **`GenericShopDisplay`**: A reusable Server Component layout for shops.
- **`getItemAction` Binding**: We bind server actions with arguments on the server, passing a ready-to-execute function to the client button. This keeps sensitive logic (prices, item IDs) secure on the server.

## 4. Unified Server Actions

All UI interactions triggering server mutations use the `useServerAction` hook.

**Benefits:**

- **Consistent Error Handling**: Automatic Toast notifications.
- **Pending States**: Standardized `isPending` for disabling UI.
- **Optimistic Updates**: (Where applicable) handled via React's `useOptimistic`.
- **Automatic Refresh**: Triggers `router.refresh()` on success to update Server Component data.

**Usage:**

```tsx
const { execute, isPending } = useServerAction({
  shouldRefresh: true,
  onSuccess: (data) => toast.success(data.message),
})

;<Button onClick={() => execute(myServerAction)} disabled={isPending} />
```

## 5. Middleware-based Pathname

To avoid converting Layouts to Client Components just to read the current URL, we use a middleware-injected header `x-pathname`.

## 6. Generic View Layout

To ensure strict consistency between different game modes (City, Combat, Shops), we use a unified `GenericGameLayout`.

- **Top Content**: Character stats, enemy stats, or info boxes (Standardized Top Padding).
- **Bottom Content**: Actions, Shops, or Combat controls (Standardized Bottom Padding & Inset).
- **Right Panel**: Activity logs or contextual info.

This ensures that switching between "Peaceful" mode (City) and "Combat" mode feels like the same application, just with different "Modules" plugged into the slots.
