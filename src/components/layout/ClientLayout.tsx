"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import TopBar from "@/components/layout/topbar/TopBar";
import MobileBottomBar from "@/components/layout/sidebar/MobileBottomBar";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import PageLoading from "@/components/loading/PageLoading";

export default function ClientLayout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("SW Registered"))
        .catch((err) => console.log("SW Failed:", err));
    }
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn, isAuthLoading } = useAuth();

  // 🔹 تا وقتی وضعیت auth مشخص نشده، فقط صفحه لودینگ نشان بده
  if (isAuthLoading) return <PageLoading />;

  // مسیرهایی که نباید نوار بالا نمایش داده شود
  const hidePaths = ["/login", "/forgot-password"];
  if (!isLoggedIn) hidePaths.push("/");

  const showTopBar = !hidePaths.includes(pathname);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="flex w-full overflow-x-hidden">
        {showTopBar && (
          <div className="hidden sm:block z-10 flex-shrink-0">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>
        )}

        <div className="flex flex-col h-screen w-full min-w-0">
          {showTopBar && <TopBar />}

          <main
            className={`flex-1 overflow-y-auto overflow-x-hidden transition-all duration-300
            ${showTopBar ? "p-3 md:p-6 pb-36 md:pb-16" : ""}`}
          >
            {children}
          </main>
        </div>
      </div>

      {showTopBar && <MobileBottomBar />}

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            padding: "10px 12px",
            fontSize: "14px",
            fontFamily: "Shabnam, system-ui, sans-serif",
          },
          success: {
            style: {
              background: "var(--color-primary-600)",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "var(--danger)",
              color: "#fff",
            },
          },
          duration: 4000,
        }}
      />

    </div>
  );
}
