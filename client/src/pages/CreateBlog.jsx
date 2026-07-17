import { useEffect, useState } from "react";
import { createPost, getCategories } from "../services/postService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";

function CreateBlog() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    status: "Published",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("category", form.category);
      formData.append("tags", form.tags);
      formData.append("status", form.status);

      if (image) {
        formData.append("coverImage", image);
      }

      await createPost(formData, token);

      toast.success("Blog published successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message || "Failed to publish blog"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-12 px-6">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-pink-500 mb-10">
          ✍️ Create New Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* Title */}

          <div>
            <label className="font-semibold">
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter blog title..."
              value={form.title}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-xl p-4 outline-pink-400"
            />
          </div>

          {/* Category */}

          <div>
            <label className="font-semibold">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-xl p-4 outline-pink-400"
            >
              <option value="">
                Select Category
              </option>

              {categories.map((cat) => (
                <option
                  key={cat._id}
                  value={cat._id}
                >
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}

          <div>
            <label className="font-semibold">
              Tags
            </label>

            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="react,node,mongodb"
              className="w-full mt-2 border rounded-xl p-4 outline-pink-400"
            />
          </div>

          {/* Status */}

          <div>
            <label className="font-semibold">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-4 outline-pink-400"
            >
              <option value="Published">
                Published
              </option>

              <option value="Draft">
                Draft
              </option>
            </select>
          </div>

          {/* Image */}

          <div>
            <label className="font-semibold flex items-center gap-2 mb-3">
              <FaImage />
              Cover Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-5 rounded-2xl h-64 object-cover w-full shadow-md"
              />
            )}
          </div>

          {/* Content */}

          <div>
            <label className="font-semibold">
              Blog Content
            </label>

            <textarea
              rows="12"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Start writing your amazing story..."
              required
              className="w-full mt-2 border rounded-xl p-4 outline-pink-400 resize-none"
            />

            <p className="text-sm text-gray-400 mt-2">
              Characters: {form.content.length}
            </p>
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-semibold text-lg transition"
          >
            {loading
              ? "Publishing..."
              : "🚀 Publish Blog"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateBlog;