import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import LoginPage from "@/features/auth/LoginPage.tsx";
import MenuPage from "@/features/menu/MenuPage.tsx";
import CartPage from "@/features/cart/CartPage.tsx";
import { useAuthStore } from "@/stores/auth.store";

function ProtectedLayout() {
  const accessToken = useAuthStore((s) => s.accessToken);
  if (!accessToken) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 border-b bg-white">TOS</header>
      <main className="p-4 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

function PublicLayout() {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 p-4">
      <Outlet />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/", element: <MenuPage /> },
      { path: "/cart", element: <CartPage /> },
    ],
  },
]);