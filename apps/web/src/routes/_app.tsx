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

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { accessToken } = useAuth();

  const navigate = useNavigate();
  if (!accessToken) {
    navigate({ to: "/login" });
  }
  return (
    <div className="h-screen flex flex-col bg-[#1a1a1a] text-gray-200">
      {/* Top Bar */}
      <div className="border-b border-gray-800 p-4 text-xl font-semibold">
        <Link to={"/"}>Sellora</Link>
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
    <aside className="w-60 h-screen bg-[#0d0d0d] border-r border-neutral-800 overflow-y-auto p-4 flex flex-col">
      <nav className="flex flex-col gap-1">
        {menuItems.map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-neutral-300 hover:bg-neutral-800 hover:text-white transition text-sm"
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
              <Link to="/" className="flex items-center gap-2 w-full">
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
    </aside>
  );
}
