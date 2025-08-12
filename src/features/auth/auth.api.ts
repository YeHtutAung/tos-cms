import api from "@/lib/axios";

// export async function login(username: string, password: string) {
//   const { data } = await api.post("/api/auth/login", { username, password });
//   return data as { accessToken: string; refreshToken: string };
// }

// src/features/auth/auth.api.ts (TEMP STUB)
export async function login(username: string, password: string) {
  void username;
  void password;
  await new Promise(r => setTimeout(r, 400));
  return { accessToken: "demo-access", refreshToken: "demo-refresh" };
}
