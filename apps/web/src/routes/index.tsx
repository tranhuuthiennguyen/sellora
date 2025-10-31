import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <section className="bg-black text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Sell your digital products with ease.
          </h1>
          <p className="text-lg text-neutral-300 mb-8">
            Create, share, and sell your work — all in one simple platform.
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-lavender-rose text-black px-6 py-3 rounded-lg font-medium hover:bg-white transition">
              Start selling
            </button>
            <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition">
              Learn more
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            What creators sell
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Ebooks", "Courses", "Templates"].map((item, i) => (
              <div
                key={i}
                className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 hover:border-lavender-rose transition"
              >
                <h3 className="text-xl font-semibold text-white">{item}</h3>
                <p className="text-neutral-400 mt-2">
                  Sell your {item.toLowerCase()} directly to your audience.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Simple checkout",
                desc: "Frictionless payments with Stripe.",
              },
              {
                title: "Instant payouts",
                desc: "Get your earnings sent automatically.",
              },
              {
                title: "Flexible pricing",
                desc: "One-time, subscription, pay-what-you-want.",
              },
            ].map((f, i) => (
              <div key={i}>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-neutral-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-950 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <blockquote className="text-2xl font-light text-neutral-300 leading-relaxed">
            “This platform completely changed the way I sell my digital work.
            It’s simple, beautiful, and takes care of everything.”
          </blockquote>

          <p className="mt-6 text-neutral-500">— A Happy Creator</p>
        </div>
      </section>

      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Fair, transparent pricing</h2>
          <p className="text-neutral-400 mb-8">
            No monthly fees. Pay only when you earn.
          </p>

          <button
            className="bg-lavender-rose text-black px-8 py-3 rounded-lg font-medium 
                            hover:bg-white transition"
          >
            View pricing
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
