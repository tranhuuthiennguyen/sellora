import React from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Tag,
  ShoppingCart,
  Mail,
  Workflow,
  DollarSign,
  BarChart2,
  Wallet,
  Compass,
  Library,
  Settings,
  HelpCircle,
  Users,
} from "lucide-react";

const sidebarItems = [
  { label: "Home", icon: Home },
  { label: "Products", icon: Tag },
  { label: "Collaborators", icon: Users },
  { label: "Checkout", icon: ShoppingCart },
  { label: "Emails", icon: Mail },
  { label: "Workflows", icon: Workflow },
  { label: "Sales", icon: DollarSign },
  { label: "Analytics", icon: BarChart2 },
  { label: "Payouts", icon: Wallet },
  { label: "Discover", icon: Compass },
  { label: "Library", icon: Library },
  { label: "Settings", icon: Settings },
  { label: "Help", icon: HelpCircle },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0d0d0d] border-r border-neutral-800 flex flex-col">
        <div className="px-4 py-6 font-semibold text-lg tracking-tight">
          YourLogo
        </div>

        <nav className="flex-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </nav>

        <div className="p-4 text-xs text-neutral-500 border-t border-neutral-800">
          © 2025 Your Company
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

function SidebarItem({
  label,
  icon: Icon,
}: {
  label: string;
  icon: React.ElementType;
}) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 px-5 py-3",
        "text-neutral-300 hover:bg-neutral-900 hover:text-white",
        "transition-colors group text-sm",
      )}
    >
      <Icon className="h-4 w-4 text-neutral-400 group-hover:text-white" />
      <span>{label}</span>
    </button>
  );
}
