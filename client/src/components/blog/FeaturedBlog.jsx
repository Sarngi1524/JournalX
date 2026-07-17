import { Link } from "react-router-dom";

function FeaturedBlog({ blog }) {

  if (!blog) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      <div className="bg-gradient-to-r from-pink-200 to-green-100 rounded-[40px] overflow-hidden shadow-xl grid lg:grid-cols-2">

        <img
          src={
            blog.coverImage
              ? `http://localhost:5000${blog.coverImage}`
              : "https://placehold.co/800x500?text=JournalX"
          }
          alt={blog.title}
          className="h-full w-full object-cover"
        />

        <div className="p-12 flex flex-col justify-center">

          <span className="bg-white w-fit px-4 py-2 rounded-full font-semibold">
            ⭐ Featured Article
          </span>

          <h2 className="text-5xl font-bold mt-6">
            {blog.title}
          </h2>

          <p className="mt-6 text-gray-700 line-clamp-4">
            {blog.excerpt}
          </p>

          <div className="mt-5 text-gray-600">

            <p>
              ✍️ {blog.author?.name}
            </p>

            <p>
              📖 {blog.readingTime} min read
            </p>

            <p>
              ❤️ {blog.likes?.length || 0} Likes
            </p>

          </div>

          <Link
            to={`/blog/${blog._id}`}
            className="mt-8 bg-pink-500 hover:bg-pink-600 text-white px-6 py-4 rounded-full w-fit transition"
          >
            Read Story →
          </Link>

        </div>

      </div>

    </section>
  );
}

export default FeaturedBlog;