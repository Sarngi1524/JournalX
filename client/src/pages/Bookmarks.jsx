import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaSearch, FaClock, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { getBookmarkedPosts, toggleBookmark } from "../services/postService";
import toast from "react-hot-toast";
import { getAssetUrl } from "../services/api";

function Bookmarks() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await getBookmarkedPosts(token);

      setPosts(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const removeBookmark = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await toggleBookmark(id, token);

      setPosts(posts.filter((post) => post._id !== id));

      toast.success("Bookmark removed");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  const totalLikes = posts.reduce(
    (sum, post) => sum + (post.likes?.length || 0),
    0
  );

  return (
    <div className="bg-[#FFF8F3] min-h-screen">

      {/* Hero */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="rounded-3xl bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100 p-12 shadow-lg">

          <h1 className="text-5xl font-bold">
            📚 My Bookmarks
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Save your favorite blogs and read them anytime.
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl shadow p-8 text-center">
          <FaBookmark className="mx-auto text-pink-500 text-3xl" />
          <h2 className="text-3xl font-bold mt-3">
            {posts.length}
          </h2>
          <p>Saved Blogs</p>
        </div>

        <div className="bg-white rounded-3xl shadow p-8 text-center">
          <FaHeart className="mx-auto text-red-500 text-3xl" />
          <h2 className="text-3xl font-bold mt-3">
            {totalLikes}
          </h2>
          <p>Total Likes</p>
        </div>

        <div className="bg-white rounded-3xl shadow p-8 text-center">
          <FaClock className="mx-auto text-blue-500 text-3xl" />
          <h2 className="text-3xl font-bold mt-3">
            {posts.reduce(
              (sum, post) => sum + (post.readingTime || 0),
              0
            )}
          </h2>
          <p>Minutes Reading</p>
        </div>

      </div>

      {/* Search */}

      <div className="max-w-7xl mx-auto px-6 mt-10">

        <div className="relative">

          <FaSearch className="absolute left-5 top-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search bookmarked blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-pink-300"
          />

        </div>

      </div>

      {/* Cards */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        {loading ? (
          <h2 className="text-center text-2xl">
            Loading...
          </h2>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">

            <FaBookmark className="mx-auto text-7xl text-pink-300" />

            <h2 className="text-3xl font-bold mt-6">
              No Bookmarks Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Bookmark blogs to see them here.
            </p>

            <Link
              to="/"
              className="inline-block mt-8 bg-pink-500 text-white px-8 py-3 rounded-full"
            >
              Explore Blogs
            </Link>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredPosts.map((post) => (

              <motion.div
                key={post._id}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >

                <img
                  src={getAssetUrl(post.coverImage)}
                  alt={post.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">

                  <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                    {post.category?.name}
                  </span>

                  <h2 className="text-2xl font-bold mt-4">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 mt-3 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex justify-between items-center mt-6">

                    <div>

                      <p className="font-semibold">
                        {post.author?.name}
                      </p>

                      <p className="text-gray-400 text-sm">
                        {post.readingTime} min read
                      </p>

                    </div>

                    <button
                      onClick={() => removeBookmark(post._id)}
                      className="bg-pink-500 text-white px-4 py-2 rounded-xl"
                    >
                      Remove
                    </button>

                  </div>

                  <Link
                    to={`/blog/${post._id}`}
                    className="inline-block mt-6 text-pink-500 font-semibold"
                  >
                    Read More →
                  </Link>

                </div>

              </motion.div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Bookmarks;