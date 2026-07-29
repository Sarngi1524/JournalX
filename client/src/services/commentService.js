import axios from "axios";

import { API_BASE } from "./api";

const API = axios.create({
  baseURL: API_BASE,
});

// Get all comments
export const getComments = (postId) => {
  return API.get(`/comments/${postId}`);
};

// Add comment
export const addComment = (postId, text, token) => {
  return API.post(
    `/comments/${postId}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Delete comment
export const deleteComment = (commentId, token) => {
  return API.delete(`/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};