// import api from "@/lib/axios";
import type { MenuItem } from "./menu.types";

// If backend is ready:
// export async function getMenu(): Promise<MenuItem[]> {
//   const { data } = await api.get("/api/public/menu"); // adjust endpoint
//   return data;
// }

// If backend is NOT ready, temporarily mock:
export async function getMenu(): Promise<MenuItem[]> {
  await new Promise(r => setTimeout(r, 300));
  return [
    { id: 1, name: "Burger", description: "Juicy beef burger", price: 9.99, available: true, categoryId: 1 },
    { id: 2, name: "Fries", description: "Crispy golden fries", price: 4.99, available: true, categoryId: 1 },
    { id: 3, name: "Coke", description: "Chilled soft drink", price: 2.5, available: true, categoryId: 2 }
  ];
}