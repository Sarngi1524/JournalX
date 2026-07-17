import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyPosts, deletePost } from "../services/postService";
import toast from "react-hot-toast";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await getMyPosts(token);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this blog?"
  );

  if (!confirmDelete) return;

  try {
    await deletePost(id, token);

    toast.success("Blog deleted successfully");

    setPosts(posts.filter((post) => post._id !== id));
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete blog");
  }
};

  if (loading) {
    return (
      <h1 className="text-center mt-20 text-2xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold text-pink-500">
        Welcome, {user?.name}
      </h1>

      <p className="text-gray-500 mt-2">
        Manage all your blogs here.
      </p>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-gray-500">Total Posts</h2>

          <p className="text-4xl font-bold mt-2">
            {posts.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-gray-500">Published</h2>

          <p className="text-4xl font-bold mt-2">
            {
              posts.filter((p) => p.status === "Published")
                .length
            }
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-gray-500">Drafts</h2>

          <p className="text-4xl font-bold mt-2">
            {
              posts.filter((p) => p.status === "Draft")
                .length
            }
          </p>
        </div>

      </div>

      {/* Button */}

      <div className="mt-10">

        <Link
          to="/create-blog"
          className="bg-pink-500 text-white px-6 py-3 rounded-xl"
        >
          + Create New Blog
        </Link>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow mt-10 overflow-x-auto">

        <table className="w-full">

          <thead className="bg-pink-50">

            <tr>

              <th className="p-4 text-left">Title</th>

              <th className="p-4">Category</th>

              <th className="p-4">Views</th>

              <th className="p-4">Likes</th>

              <th className="p-4">Status</th>

              <th className="p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {posts.map((post) => (

              <tr
                key={post._id}
                className="border-t"
              >

                <td className="p-4 font-semibold">
                  {post.title}
                </td>

                <td className="text-center">
                  {post.category?.name}
                </td>

                <td className="text-center">
                  {post.views}
                </td>

                <td className="text-center">
                  {post.likes.length}
                </td>

                <td className="text-center">
                  {post.status}
                </td>

                <td className="text-center space-x-3">

                 <Link
  to={`/edit/${post._id}`}
  className="text-blue-500 hover:text-blue-700 font-medium"
>
  Edit
</Link>
                 <button
  onClick={() => handleDelete(post._id)}
  className="text-red-500 hover:text-red-700"
>
  Delete
</button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;