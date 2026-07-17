const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    excerpt: {
      type: String,
      maxlength: 250,
    },

    content: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200",
    },

    // Relationship with Category
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    readingTime: {
      type: Number,
      default: 1,
    },

    views: {
      type: Number,
      default: 0,
    },
likes: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Published",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);