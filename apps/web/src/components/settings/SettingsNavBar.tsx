import { Link, useLocation } from "@tanstack/react-router";

const menuItems = [
  { label: "Settings", path: "/settings" },
  { label: "Profile", path: "/settings/profile" },
  { label: "Password", path: "/settings/password" },
];

export default function SettingsNavBar() {
  const location = useLocation();
  return (
    <header>
      {/* headers */}
      <h1 className="text-xl pb-4">Settings</h1>
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
                  ? "bg-black outline outline-gray-500 -outline-offset-1"
                  : "")
              }
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
