const express = require("express");
const router = express.Router();

const { 
    createComment,
     getComments,
     deleteComment
    } = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/:postId", protect, createComment);
router.get("/:postId", getComments);
router.delete("/:id", protect, deleteComment);

module.exports = router;