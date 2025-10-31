export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-12">
      <div className="max-w-6xl mx-auto px-6 flex justify-between">
        <p>© {new Date().getFullYear()} Sellora</p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-white">
            Terms
          </a>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
