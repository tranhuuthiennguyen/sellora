import { Button } from "@/components/ui/button";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_app/settings")({
  component: Settings,
});

function Settings() {
  const form = useSettingsForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <SettingsHeader />
      <div>
        <Outlet />
      </div>
    </form>
  );
}

const menuItems = [
  { label: "Settings", path: "/settings" },
  { label: "Profile", path: "/settings/profile" },
  { label: "Password", path: "/settings/password" },
];

function SettingsHeader() {
  const location = useLocation();
  return (
    <div className="border-b border-gray-500 p-6">
      {/* headers */}
      <div className="flex justify-between text-center">
        <h1 className="text-xl">Settings</h1>
        <Button className="w-30 bg-lavender-rose text-black font-semi-bold">
          Update Settings
        </Button>
      </div>
      <div className="flex gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              to={item.path}
              key={item.label}
              className={
                "px-3 py-1 rounded-full hover:bg-black text-sm " +
                (isActive
                  ? "bg-black outline-1 outline-white -outline-offset-2"
                  : "")
              }
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
