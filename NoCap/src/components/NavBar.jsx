import { useEffect, useState } from "react";
import { Shield, Home, Zap, BookOpen, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Detect", icon: Zap, href: "/detect" },
    { name: "Features", icon: Shield, href: "/features" },
    { name: "History", icon: BookOpen, href: "/history" },
    { name: "Report", icon: FileText, href: "/report" },
  ];

  return (
    <div className="min-h-[80px]">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-lg"
            : "bg-red-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-100 rounded-xl blur-md opacity-75"></div>
                <div className="relative bg-gradient-to-br from-red-500 to-red-300 p-1.5 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-red-600">NoCap</h1>
                <p className="text-xs text-gray-600 -mt-1">Fake News Detector</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.name}
                    onClick={() => navigate(link.href)}
                    className="group relative px-4 py-2 rounded-lg transition-all hover:bg-red-100"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-gray-900 group-hover:text-red-600 transition-colors" />
                      <span className="text-gray-900 group-hover:text-red-600 transition-colors">
                        {link.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    setIsLoggedIn(false);
                    navigate("/signin");
                  }}
                  className="relative group px-4 py-2 rounded-lg overflow-hidden bg-gray-700 text-white"
                >
                  Log out
                </button>
              ) : (
                <button
                  onClick={() => navigate("/signup")}
                  className="relative group px-4 py-2 rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-red-600 group-hover:scale-105"></div>
                  <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative text-sm font-semibold text-white">
                    Sign Up Free
                  </span>
                </button>
              )}
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
