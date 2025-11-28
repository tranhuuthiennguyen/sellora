import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-gray-200">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Getting Started */}
      <section className="mb-10">
        <h2 className="text-lg font-medium mb-4">Getting started</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "Welcome aboard",
            "Make an impression",
            "Showtime",
            "Build your tribe",
            "Cha-ching",
            "Money inbound",
            "Making waves",
            "Smart move",
          ].map((step, i) => (
            <div
              key={i}
              className="bg-[#111] border border-gray-700 rounded-lg p-4 flex justify-between items-center"
            >
              <span className="font-medium">{step}</span>
              <div className="w-3 h-3 rounded-full border border-gray-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Activity */}
      <section>
        <h2 className="text-lg font-medium mb-4">Activity</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Balance", value: "$0 USD" },
            { title: "Last 7 days", value: "$0 USD" },
            { title: "Last 28 days", value: "$0 USD" },
            { title: "Total earnings", value: "$0 USD" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#111] border border-gray-700 rounded-lg p-6"
            >
              <div className="text-sm text-gray-400 mb-2">{item.title}</div>
              <div className="text-2xl font-semibold">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#111] border border-gray-700 rounded-lg mt-6 p-6 text-center text-sm text-gray-400">
          Followers and sales will show up here as they come in. For now,&nbsp;
          <a href="/products/create" className="underline hover:text-gray-300">
            create a product
          </a>
          &nbsp;or&nbsp;
          <a href="/settings/profile" className="underline hover:text-gray-300">
            customize your profile
          </a>
        </div>
      </section>
    </div>
  );
}
