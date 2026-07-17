import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getPostById, toggleLike } from "../services/postService";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  getComments,
  addComment,
  deleteComment,
} from "../services/commentService";

import { FaTrash } from "react-icons/fa";
function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
const [text, setText] = useState("");
const [commentLoading, setCommentLoading] = useState(false);

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if current user has liked the blog
  const isLiked = blog?.likes?.includes(user?._id);

  const fetchBlog = useCallback(async () => {
    try {
      const res = await getPostById(id);
      setBlog(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load blog");
    } finally {
      setLoading(false);
    }
  }, [id]);

  
  const fetchComments = useCallback(async () => {
  try {
    const res = await getComments(id);
    setComments(res.data);
  } catch (err) {
    console.log(err);
  }
}, [id]);
useEffect(() => {
  fetchBlog();
  fetchComments();
}, [fetchBlog, fetchComments]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const res = await toggleLike(blog._id, token);

      setBlog((prev) => ({
        ...prev,
        likes: res.data.likes,
      }));

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleComment = async () => {
  if (!text.trim()) {
    return toast.error("Enter a comment");
  }

  const token = localStorage.getItem("token");

  if (!token) {
    return toast.error("Please login");
  }

  try {
    setCommentLoading(true);

    await addComment(id, text, token);

    setText("");

    await fetchComments();

    toast.success("Comment added");
  } catch (err) {
    console.log(err);
    toast.error("Failed");
  } finally {
    setCommentLoading(false);
  }
};
const handleDeleteComment = async (commentId) => {
  const token = localStorage.getItem("token");

  try {
   await deleteComment(commentId, token);

await fetchComments();

toast.success("Comment deleted");
  } catch (err) {
    console.log(err);
    toast.error("Delete failed");
  }
};

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20 text-xl">
        Blog Not Found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">

      <img
        src={`http://localhost:5000${blog.coverImage}`}
        alt={blog.title}
        className="rounded-xl mb-8 w-full max-h-[500px] object-cover"
      />

      <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full">
        {blog.category?.name}
      </span>

      <h1 className="text-5xl font-bold mt-6">
        {blog.title}
      </h1>

      <div className="mt-6 flex flex-wrap gap-6 text-gray-500 items-center">

        <p>
          <strong>Author:</strong> {blog.author?.name}
        </p>

        <p>
          {blog.readingTime} min read
        </p>

        <p>
          {blog.views} views
        </p>

        <button
          onClick={handleLike}
          className={`flex items-center gap-2 transition duration-300 ${
            isLiked
              ? "text-red-500"
              : "text-gray-500 hover:text-red-500"
          }`}
        >
          <FaHeart size={20} />
          {blog.likes?.length || 0} Likes
        </button>

      </div>

      <div className="mt-10 whitespace-pre-line leading-9 text-lg">
        {blog.content}
      </div>
      <div className="mt-16">

  <h2 className="text-3xl font-bold mb-6">
    Comments ({comments.length})
  </h2>

  <textarea
    rows="4"
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Write a comment..."
    className="w-full border rounded-xl p-4"
  />

  <button
    onClick={handleComment}
    disabled={commentLoading}
    className="mt-4 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
  >
    {commentLoading ? "Posting..." : "Post Comment"}
  </button>

  <div className="mt-10 space-y-5">

    {comments.map((comment) => (

      <div
        key={comment._id}
        className="border rounded-xl p-5 shadow-sm"
      >

        <div className="flex justify-between">

          <div>

            <h4 className="font-semibold">
              {comment.user?.name}
            </h4>

            <p className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>

          </div>

          {user?._id === comment.user?._id && (

            <button
              onClick={() => handleDeleteComment(comment._id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>

          )}

        </div>

        <p className="mt-4 text-gray-700">
          {comment.text}
        </p>

      </div>

    ))}

  </div>

</div>

    </div>
  );
}

export default BlogDetails;