import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

let user = null;

const storedUser = localStorage.getItem("user");

if (
  storedUser &&
  storedUser !== "undefined" &&
  storedUser !== "null"
) {
  try {
    user = JSON.parse(storedUser);
  } catch (error) {
    console.error("Invalid user in localStorage:", error);
    localStorage.removeItem("user");
  }
}

 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");

  window.location.reload();
};

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-pink-500"
        >
          JournalX
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex gap-10">
          <Link to="/">Home</Link>

          {user && (
            <>
              <Link to="/create-blog">Write</Link>
              <Link to="/dashboard">Dashboard</Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="p-2 rounded-md border"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button>
            <FiSearch size={22} />
          </button>

          {user && (
            <Link to="/bookmarks">
              <FaRegBookmark size={22} />
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-pink-400 px-5 py-2 rounded-full text-white hover:bg-pink-500 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="border border-pink-400 px-5 py-2 rounded-full text-pink-500 hover:bg-pink-50 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold text-pink-500">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-full text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-pink-100">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" onClick={() => setOpen(false)} className="block">Home</Link>

            {user && (
              <>
                <Link to="/create-blog" onClick={() => setOpen(false)} className="block">Write</Link>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="block">Dashboard</Link>
              </>
            )}

            <div className="pt-2 border-t">
              {!user ? (
                <div className="space-y-2">
                  <Link to="/login" onClick={() => setOpen(false)} className="block">Login</Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="block">Register</Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="block">Hi, {user.name}</span>
                  <button onClick={() => { handleLogout(); setOpen(false); }} className="block text-left">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;