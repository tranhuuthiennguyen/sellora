import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootLayout = () => (
  <>
    <Outlet />
    {/* <TanStackRouterDevtools initialIsOpen={false} /> */}
  </>
);

export const Route = createRootRoute({ component: RootLayout });
