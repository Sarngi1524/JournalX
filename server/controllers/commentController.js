const Comment = require("../models/Comment");
const Post = require("../models/Post");

const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    // Check if text is provided
    if (!text) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    // Check if post exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Create comment
    const comment = await Comment.create({
      text,
      user: req.user._id,
      post: postId,
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Check ownership
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this comment",
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      message: "Comment deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
    getComments,
    deleteComment
};