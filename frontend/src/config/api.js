const API_URL = (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"))
  ? ""
  : "https://careone-ft4z.onrender.com";

export default API_URL;
