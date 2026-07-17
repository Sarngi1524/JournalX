const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const { 
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    toggleLike,
    toggleBookmark,
    getBookmarks,
    searchPosts,
    getPostsByCategory,
    getMyPosts
 } = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAllPosts);
router.get("/bookmarks/my", protect, getBookmarks);
router.get("/search", searchPosts);
router.get("/category/:categoryId", getPostsByCategory);
router.get("/my/posts", protect, getMyPosts);
router.get("/:id", getPostById);

router.post("/", protect, upload.single("coverImage"), createPost);

router.put(
  "/:id",
  protect,
  upload.single("coverImage"),
  updatePost
);
router.put("/:id/like", protect, toggleLike);
router.put("/:id/bookmark", protect, toggleBookmark);

router.delete("/:id", protect, deletePost);

module.exports = router;