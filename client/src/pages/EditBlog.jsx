import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategories,
  getPostById,
  updatePost,
} from "../services/postService";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";

function EditBlog() {
  const { id } = useParams();
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
    loadBlog();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  const loadBlog = async () => {
  try {
    const res = await getPostById(id);

    console.log(res.data); // <-- Add this

    const blog = res.data;

    setForm({
      title: blog.title,
      content: blog.content,
      category: blog.category?._id || "",
      tags: Array.isArray(blog.tags)
        ? blog.tags.join(",")
        : blog.tags || "",
      status: blog.status,
    });

    if (blog.coverImage) {
      setPreview(`http://localhost:5000${blog.coverImage}`);
    }
  } catch (error) {
    console.log(error);
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

      await updatePost(id, formData, token);

      toast.success("Blog updated successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to update blog"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-pink-500 mb-10">
          ✏️ Edit Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          <div>
            <label className="font-semibold">
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-xl p-4 outline-pink-400"
            />
          </div>

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
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">
              Tags
            </label>

            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-4 outline-pink-400"
              placeholder="react,node,mongodb"
            />
          </div>

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

          <div>
            <label className="font-semibold">
              Blog Content
            </label>

            <textarea
              rows="12"
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-xl p-4 outline-pink-400 resize-none"
            />

            <p className="text-sm text-gray-400 mt-2">
              Characters: {form.content.length}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-semibold text-lg transition"
          >
            {loading ? "Updating..." : "💾 Update Blog"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditBlog;