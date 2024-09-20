import axios from "axios";
const api = axios.create({ baseURL: "https://crow-shop.onrender.com/api" });
export default api;