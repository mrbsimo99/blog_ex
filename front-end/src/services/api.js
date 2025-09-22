import axios from "axios";
import { getToken } from "./auth";

const API = axios.create({
  baseURL: "http://localhost:4040/api",
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Articoli
export const getArticles = async (page = 1) => {
  const res = await API.get(`/articles?page=${page}`);
  return res.data;
};

export const getArticleById = async (id) => {
  const res = await API.get(`/articles/${id}`);
  return res.data;
};

// Commenti
export const getComments = async (articleId) => {
  const res = await API.get(`/comments/${articleId}`);
  return res.data;
};

export const postComment = async (articleId, content) => {
  const res = await API.post(`/comments/${articleId}`, { content });
  return res.data;
};

// Categorie
export const getCategories = async () => {
  const res = await API.get("/categories");
  return res.data;
};

// Tags
export const getTags = async () => {
  const res = await API.get("/tags");
  return res.data;
};
