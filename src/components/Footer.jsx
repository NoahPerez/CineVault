import logo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="w-full bg-[rgba(8,16,18,0.94)] text-white px-6 py-4 flex items-center justify-between">
      
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="CineVault logo"
          className="w-16"
        />
        <span className="text-gray-400 text-xs">
          © {new Date().getFullYear()} CineVault <br /> All rights reserved.
        </span>
      </div>

      <div className="flex gap-6">
        <a href="/" className="text-gray-300 hover:text-white transition text-sm">
          Terms of Use
        </a>
        <a href="/watchlist" className="text-gray-300 hover:text-white transition text-sm">
          Privacy Policy
        </a>
        <a href="/profile" className="text-gray-300 hover:text-white transition text-sm">
          Help Center
        </a>
        <a href="/profile" className="text-gray-300 hover:text-white transition text-sm">
          Contact Us
        </a>
      </div>

    </footer>
  );
}
