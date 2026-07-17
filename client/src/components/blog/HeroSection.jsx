import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-pink-100 to-green-100 rounded-[40px] p-12 text-center shadow-lg"
      >

        <h1 className="text-6xl font-bold text-gray-800">
          Write.
          Inspire.
          Share.
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          JournalX is your personal space to share ideas,
          stories, tutorials and experiences with the world.
        </p>

        <div className="mt-10 flex justify-center gap-5">

          <Link
            to="/create-blog"
            className="bg-pink-400 hover:bg-pink-500 text-white px-8 py-4 rounded-full"
          >
            Start Writing
          </Link>

          <Link
            to="/"
            className="border border-pink-300 px-8 py-4 rounded-full"
          >
            Explore Blogs
          </Link>

        </div>

      </motion.div>

    </section>
  );
}

export default HeroSection;