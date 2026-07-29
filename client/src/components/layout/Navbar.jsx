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
    <nav className="sticky top-0 z-50 border-b border-pink-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-pink-500 sm:text-3xl">
          JournalX
        </Link>

        {/* Navigation */}
        <div className="hidden gap-8 md:flex">
          <Link to="/">Home</Link>

          {user && (
            <>
              <Link to="/create-blog">Write</Link>
              <Link to="/dashboard">Dashboard</Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button type="button" className="rounded-md border border-pink-200 p-2 text-pink-500">
            <FiSearch size={20} />
          </button>

          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="rounded-md border border-pink-200 p-2 text-pink-500"
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
        <div className="hidden items-center gap-3 sm:gap-4 md:flex">
          <button type="button" className="text-gray-700">
            <FiSearch size={22} />
          </button>

          {user && (
            <Link to="/bookmarks" className="text-gray-700">
              <FaRegBookmark size={22} />
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-full bg-pink-400 px-4 py-2 text-sm font-medium text-white transition hover:bg-pink-500"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full border border-pink-400 px-4 py-2 text-sm font-medium text-pink-500 transition hover:bg-pink-50"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="hidden text-sm font-semibold text-pink-500 lg:inline">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-pink-100 bg-white md:hidden">
          <div className="space-y-2 px-4 py-3">
            <Link to="/" onClick={() => setOpen(false)} className="block py-1">
              Home
            </Link>

            {user && (
              <>
                <Link to="/create-blog" onClick={() => setOpen(false)} className="block py-1">
                  Write
                </Link>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="block py-1">
                  Dashboard
                </Link>
              </>
            )}

            <div className="border-t border-pink-100 pt-2">
              {!user ? (
                <div className="space-y-2">
                  <Link to="/login" onClick={() => setOpen(false)} className="block py-1">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="block py-1">
                    Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="block py-1">Hi, {user.name}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="block py-1 text-left"
                  >
                    Logout
                  </button>
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