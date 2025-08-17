import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <>
      <Navbar />
      {/* h-14 與 Navbar 高度一致；多留 2-4px 安全邊距 */}
      <main className="pt-16 mx-auto max-w-7xl px-4">
        <Outlet />
      </main>
    </>
  );
}