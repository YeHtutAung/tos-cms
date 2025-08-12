import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let queue: Array<() => void> = [];

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { response, config } = err;
    if (response?.status === 401 && !config.__isRetryRequest) {
      if (isRefreshing) {
        await new Promise<void>((resolve) => queue.push(resolve));
        config.__isRetryRequest = true;
        return api(config);
      }
      isRefreshing = true;
      const { refreshToken, setTokens, clear } = useAuthStore.getState();
      try {
        const r = await axios.post(
          `${api.defaults.baseURL}/api/auth/refresh`,
          { refreshToken }
        );
        const newAccess = r.data?.accessToken;
        const newRefresh = r.data?.refreshToken ?? refreshToken;
        if (!newAccess) throw new Error("No access token from refresh");
        setTokens(newAccess, newRefresh);
        queue.forEach((fn) => fn());
        queue = [];
        const retry = { ...config, __isRetryRequest: true };
        retry.headers = { ...(retry.headers || {}), Authorization: `Bearer ${newAccess}` };
        return api(retry);
      } catch (e) {
        clear();
        window.location.href = "/login";
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

export default api;