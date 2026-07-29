import { Link } from "react-router-dom";
import {
  FaHeart,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { toggleBookmark } from "../../services/postService";
import { getAssetUrl } from "../../services/api";

function BlogCard({
  id,
  image,
  title,
  excerpt,
  author,
  category,
  readTime,
  refreshBlogs,
}) {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const res = await toggleBookmark(id, token);

      setBookmarked(res.data.bookmarked);

      toast.success(res.data.message);

      if (refreshBlogs) {
        refreshBlogs();
      }
    } catch (error) {
      console.error(error);
      toast.error("Bookmark failed");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl"
    >
      {/* Cover Image */}
      <img
        src={image ? getAssetUrl(image) : "https://placehold.co/600x400?text=No+Image"}
        alt={title}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">
        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
          {category}
        </span>

        <h2 className="text-2xl font-bold mt-4 line-clamp-2">
          {title}
        </h2>

        <p className="text-gray-500 mt-3 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="font-semibold">{author}</p>

            <p className="text-sm text-gray-400">
              {readTime} min read
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <button className="text-pink-500">
              <FaHeart />
            </button>

            <button
              onClick={handleBookmark}
              className="text-pink-500 text-lg"
            >
              {bookmarked ? (
                <FaBookmark />
              ) : (
                <FaRegBookmark />
              )}
            </button>
          </div>
        </div>

        <Link
          to={`/blog/${id}`}
          className="inline-block mt-6 text-pink-500 font-semibold"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
}

export default BlogCard;