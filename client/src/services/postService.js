import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.vite_api_base_url + "/api",
});

// Get all posts
export const getAllPosts = () => {
  return API.get("/posts");
};

// Get single post
export const getPostById = (id) => {
  return API.get(`/posts/${id}`);
};

// Search posts
export const searchPosts = (keyword) => {
  return API.get(`/posts/search?keyword=${keyword}`);
};

// Like post
export const toggleLike = (id, token) => {
  return API.put(
    `/posts/${id}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Create post
export const createPost = (formData, token) => {
  return API.post("/posts", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// Categories
export const getCategories = () => {
  return API.get("/categories");
};

// My Posts
export const getMyPosts = (token) => {
  return API.get("/posts/my/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Delete Post
export const deletePost = (id, token) => {
  return API.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Bookmark
export const toggleBookmark = (id, token) => {
  return API.put(
    `/posts/${id}/bookmark`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Update Post
export const updatePost = (id, formData, token) => {
  return API.put(`/posts/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
// Get Bookmarked Posts
export const getBookmarkedPosts = (token) => {
  return API.get("/posts/bookmarks/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};