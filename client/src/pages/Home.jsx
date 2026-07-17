import { useEffect, useState } from "react";
import { getAllPosts, searchPosts } from "../services/postService";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import SearchBar from "../components/ui/SearchBar";

import HeroSection from "../components/blog/HeroSection";
import FeaturedBlog from "../components/blog/FeaturedBlog";
import StatsSection from "../components/blog/StatsSection";
import CategoryCard from "../components/blog/CategoryCard";
import BlogCard from "../components/blog/BlogCard";
import TrendingSidebar from "../components/blog/TrendingSidebar";

function Home() {
  const categories = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Food",
    "Programming",
    "Design",
  ];

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchBlogs = async () => {
    try {
      const res = await getAllPosts();
      setBlogs(res.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  const handleSearch = async (keyword) => {
  try {
    if (keyword.trim() === "") {
      fetchBlogs();
      return;
    }

    const res = await searchPosts(keyword);
    setBlogs(res.data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Search */}
      <SearchBar onSearch={handleSearch} />

      {/* Stats */}
      <StatsSection blogs={blogs} />

      {/* Featured */}
      <FeaturedBlog blog={blogs[0]} />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">
          Browse Categories
        </h2>

        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              title={category}
            />
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">

          {/* Left */}
          <div className="lg:col-span-3">

            <h2 className="text-3xl font-bold mb-8">
              Latest Articles
            </h2>

            {loading ? (
              <Loader />
            ) : blogs.length === 0 ? (
              <EmptyState message="No blogs available." />
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {blogs.map((blog) => (
                  <BlogCard
  key={blog._id}
  id={blog._id}
  image={blog.coverImage}
  title={blog.title}
  excerpt={blog.excerpt}
  author={blog.author?.name}
  category={blog.category?.name}
  readTime={blog.readingTime}
  likes={blog.likes?.length || 0}
  refreshBlogs={fetchBlogs}
/>
                ))}
              </div>
            )}

          </div>

          {/* Right Sidebar */}
          <div>
           <TrendingSidebar blogs={blogs} />
          </div>

        </div>
      </section>
    </>
  );
}

export default Home;