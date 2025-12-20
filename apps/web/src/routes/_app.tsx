import {
  Home,
  Package,
  ShoppingCart,
  Mail,
  DollarSign,
  BarChart3,
  Wallet,
  Compass,
  Book,
  Settings,
  HelpCircle,
  User,
  LogOut,
} from "lucide-react";
import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SettingsFormProvider } from "@/contexts/SettingsFormContext";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { isBootstrapping, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate({ to: "/login" });
  }

  if (isBootstrapping) {
    return <div className="text-white p-6">Loading…</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-tuatara text-gray-200">
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <SettingsFormProvider>
            <Outlet />
          </SettingsFormProvider>
        </main>
        <Toaster />
      </div>
    </div>
  );
}

const menuItems = [
  { label: "Home", to: "/dashboard", icon: Home },
  { label: "Products", to: "/products", icon: Package },
  { label: "Checkout", to: "/checkout", icon: ShoppingCart },
  { label: "Emails", to: "/emails", icon: Mail },
  { label: "Sales", to: "/sales", icon: DollarSign },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Payouts", to: "/payouts", icon: Wallet },
  { label: "Discover", to: "/discover", icon: Compass },
  { label: "Library", to: "/library", icon: Book },
  { label: "Settings", to: "/settings", icon: Settings },
  { label: "Help", to: "/help", icon: HelpCircle },
];

export function Sidebar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <aside className="w-45 h-screen bg-main-bg border-r border-neutral-800 overflow-y-auto flex flex-col">
      {/* Top Bar */}
      <div className="border-b border-gray-500 text-4xl font-semibold text-center p-4">
        <Link to={"/"}>Sellora</Link>
      </div>
      <div className="flex flex-col justify-between">
        <nav className="flex flex-col">
          {menuItems.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 px-3 py-3 border-b border-gray-500 text-neutral-300 hover:bg-neutral-800 hover:text-white transition text-sm"
              activeProps={{
                className:
                  "bg-neutral-800 text-white border-l-2 border-lavender-rose",
              }}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-neutral-800">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
              <div className="flex items-center gap-3 p-2 hover:bg-neutral-900 rounded-lg cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-neutral-700 flex items-center justify-center">
                  <User size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium">{user.username}</span>
                  <span className="text-xs text-neutral-400">{user.email}</span>
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-48 bg-neutral-900 border-neutral-700"
            >
              <DropdownMenuItem>
                <Link
                  to="/"
                  className="flex items-center text-white gap-2 w-full"
                >
                  <User size={16} /> Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={logout}
                className="flex items-center gap-2 text-red-400 focus:text-red-400"
              >
                <LogOut size={16} /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}
