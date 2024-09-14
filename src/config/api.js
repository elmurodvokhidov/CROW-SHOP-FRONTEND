import axios from "axios";
const api = axios.create({ baseURL: "https://crow-shop-ivory.vercel.app" });
export default api;