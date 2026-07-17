import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

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
    </nav>
  );
}

export default Navbar;