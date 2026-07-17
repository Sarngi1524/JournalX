const slugify = require("slugify");
const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { title, content, category, tags, status } = req.body;

    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    const excerpt =
      content.length > 180
        ? content.substring(0, 180) + "..."
        : content;

    const post = await Post.create({
      title,
      slug: slugify(title, {
        lower: true,
        strict: true,
      }),
      excerpt,
      content,
      category,
      coverImage: req.file ? `/uploads/${req.file.filename}` : "",
      tags,
      status,
      readingTime,
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
  .populate("author", "name")
  .populate("category", "name color icon")
  .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const mongoose = require("mongoose");

const getPostById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid post ID",
      });
    }

    const post = await Post.findById(req.params.id)
      .populate("author", "name email")
      .populate("category");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.views += 1;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error(error); // 👈 Important
    res.status(500).json({
      message: error.message,
    });
  }
};
const deletePost = async (req, res) => {
  try {
    // Find post
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this post",
      });
    }

    // Delete post
    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const userId = req.user._id.toString();

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.status(200).json({
  message: alreadyLiked
    ? "Post unliked"
    : "Post liked",
  likes: post.likes,
  totalLikes: post.likes.length,
  liked: !alreadyLiked,
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const User = require("../models/User");

const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const postId = req.params.id;

    const alreadyBookmarked = user.bookmarks.some(
      (id) => id.toString() === postId
    );

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== postId
      );

      await user.save();

      return res.json({
        message: "Bookmark removed",
        bookmarked: false,
      });
    }

    user.bookmarks.push(postId);

    await user.save();

    res.json({
      message: "Post bookmarked",
      bookmarked: true,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBookmarks = async (req, res) => {
  try {
   const user = await User.findById(req.user._id).populate({
  path: "bookmarks",
  populate: [
    { path: "author", select: "name" },
    { path: "category", select: "name color icon" },
  ],
});

res.json(user.bookmarks);


    res.status(200).json(user.bookmarks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const searchPosts = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const posts = await Post.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } },
      ],
    })
      .populate("author", "name")
      .populate("category");

    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getPostsByCategory = async (req, res) => {
  try {

    const posts = await Post.find({
      category: req.params.categoryId,
    })
      .populate("author", "name")
      .populate("category");

    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user._id,
    })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, category, tags, status } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this post",
      });
    }

    if (title) {
      post.title = title;
      post.slug = slugify(title, {
        lower: true,
        strict: true,
      });
    }

    if (content) {
      post.content = content;

      const words = content.trim().split(/\s+/).length;

      post.readingTime = Math.max(
        1,
        Math.ceil(words / 200)
      );

      post.excerpt =
        content.length > 180
          ? content.substring(0, 180) + "..."
          : content;
    }

    if (category) {
      post.category = category;
    }

    if (tags) {
      post.tags = tags;
    }

    if (status) {
      post.status = status;
    }

    // ✅ Update image
    if (req.file) {
      post.coverImage = `/uploads/${req.file.filename}`;
    }

    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  getPostById,
  toggleLike,
  getPostsByCategory,
  searchPosts,
  toggleBookmark,
  getBookmarks,
  updatePost,
  deletePost,
};