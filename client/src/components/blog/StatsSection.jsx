import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaUsers,
  FaHeart,
  FaEye,
} from "react-icons/fa";

function StatsSection({ blogs = [] }) {
  const totalArticles = blogs.length;

  const totalLikes = blogs.reduce(
    (sum, blog) => sum + (blog.likes?.length || 0),
    0
  );

  const totalViews = blogs.reduce(
    (sum, blog) => sum + (blog.views || 0),
    0
  );

  const totalWriters = new Set(
    blogs.map((blog) => blog.author?._id)
  ).size;

  const stats = [
    {
      icon: <FaBookOpen className="text-3xl text-pink-500" />,
      value: totalArticles,
      title: "Articles",
    },
    {
      icon: <FaUsers className="text-3xl text-green-500" />,
      value: totalWriters,
      title: "Writers",
    },
    {
      icon: <FaEye className="text-3xl text-blue-500" />,
      value: totalViews,
      title: "Views",
    },
    {
      icon: <FaHeart className="text-3xl text-red-500" />,
      value: totalLikes,
      title: "Likes",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl shadow-lg p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              {item.icon}
            </div>

            <h2 className="text-4xl font-bold">
              {item.value}
            </h2>

            <p className="text-gray-500 mt-2">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;