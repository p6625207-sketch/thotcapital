// app/frontend/lib/api.js
import axios from "axios";


const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

const api = axios.create({
  baseURL: import.meta.env.APP_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": csrfToken, 
    "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
  },
  withCredentials: true, 
});

export default api;
