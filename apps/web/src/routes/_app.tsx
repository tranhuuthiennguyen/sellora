import {
  Home,
  Package,
  Users,
  ShoppingCart,
  Mail,
  Workflow,
  DollarSign,
  BarChart3,
  Wallet,
  Compass,
  Book,
  Settings,
  HelpCircle,
} from "lucide-react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="h-screen flex flex-col bg-[#1a1a1a] text-gray-200">
      {/* Top Bar */}
      <div className="border-b border-gray-800 p-4 text-xl font-semibold">
        Sellora
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const menuItems = [
  { label: "Home", to: "/dashboard", icon: Home },
  { label: "Products", to: "/products", icon: Package },
  { label: "Collaborators", to: "/collaborators", icon: Users },
  { label: "Checkout", to: "/checkout", icon: ShoppingCart },
  { label: "Emails", to: "/emails", icon: Mail },
  { label: "Workflows", to: "/workflows", icon: Workflow },
  { label: "Sales", to: "/sales", icon: DollarSign },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Payouts", to: "/payouts", icon: Wallet },
  { label: "Discover", to: "/discover", icon: Compass },
  { label: "Library", to: "/library", icon: Book },
  { label: "Settings", to: "/settings", icon: Settings },
  { label: "Help", to: "/help", icon: HelpCircle },
];

export function Sidebar() {
  return (
    <aside className="w-60 h-screen bg-[#0d0d0d] border-r border-neutral-800 overflow-y-auto p-4 flex flex-col">
      <nav className="flex flex-col gap-1">
        {menuItems.map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-neutral-300 hover:bg-neutral-800 hover:text-white transition text-sm"
            activeProps={{
              className: "bg-neutral-800 text-white border-l-2 border-pink-500",
            }}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
