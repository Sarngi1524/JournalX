import { Link } from "react-router-dom";
import { FaFire, FaTag, FaUserEdit } from "react-icons/fa";

function TrendingSidebar({ blogs = [] }) {
  // Top 5 blogs by likes
  const trendingBlogs = [...blogs]
    .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
    .slice(0, 5);

  // Unique tags
  const tags = [
    ...new Set(
      blogs.flatMap((blog) => {
        if (!blog.tags) return [];

        if (Array.isArray(blog.tags)) return blog.tags;

        return blog.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
      })
    ),
  ].slice(0, 10);

  // Top writer
  const writers = {};

  blogs.forEach((blog) => {
    const name = blog.author?.name || "Unknown";
    writers[name] = (writers[name] || 0) + 1;
  });

  const topWriter =
    Object.entries(writers).sort((a, b) => b[1] - a[1])[0] || [];

  return (
    <div className="space-y-8 sticky top-24">

      {/* Trending */}
      <div className="bg-white rounded-3xl shadow p-6">

        <h2 className="flex items-center gap-2 text-xl font-bold mb-5">
          <FaFire className="text-red-500" />
          Trending Today
        </h2>

        {trendingBlogs.length === 0 ? (
          <p className="text-gray-500">
            No trending blogs yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {trendingBlogs.map((blog) => (
              <li key={blog._id}>
                <Link
                  to={`/blog/${blog._id}`}
                  className="hover:text-pink-500"
                >
                  🔥 {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-3xl shadow p-6">

        <h2 className="flex items-center gap-2 text-xl font-bold mb-5">
          <FaTag />
          Popular Tags
        </h2>

        <div className="flex flex-wrap gap-3">

          {tags.length === 0 ? (
            <p className="text-gray-500">
              No tags yet.
            </p>
          ) : (
            tags.map((tag) => (
              <span
                key={tag}
                className="bg-pink-100 text-pink-600 px-3 py-2 rounded-full"
              >
                #{tag}
              </span>
            ))
          )}

        </div>

      </div>

      {/* Top Writer */}
      <div className="bg-white rounded-3xl shadow p-6">

        <h2 className="flex items-center gap-2 text-xl font-bold mb-5">
          <FaUserEdit />
          Top Writer
        </h2>

        {topWriter.length ? (
          <div className="flex items-center gap-4">

            <img
              src="https://i.pravatar.cc/100"
              alt="Writer"
              className="w-14 h-14 rounded-full"
            />

            <div>

              <h3 className="font-bold">
                {topWriter[0]}
              </h3>

              <p className="text-gray-500">
                {topWriter[1]} Articles
              </p>

            </div>

          </div>
        ) : (
          <p className="text-gray-500">
            No writers yet.
          </p>
        )}

      </div>

    </div>
  );
}

export default TrendingSidebar;