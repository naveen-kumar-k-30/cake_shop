import { isProd } from "./isProd";

export const backendURL = isProd() ? "https://cake-shop-backend-1.onrender.com" : "http://localhost:3000";