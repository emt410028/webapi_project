import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// 定義表單驗證 schema，使用 zod
const schema = z.object({
  username: z.string().min(3, "至少 3 個字"), // 使用者名稱至少 3 個字
  password: z.string().min(6, "密碼不能為空"), // 密碼至少 6 個字
});

export default function Login() {
  const navigate = useNavigate(); // 用於頁面導向
  // 使用 react-hook-form 處理表單，並結合 zod 驗證
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const { setToken } = useAuth(); // 取得 setToken 方法，更新登入狀態

  // 表單送出時執行的函式
  const onSubmit = async (data) => {
    // 呼叫後端 API 進行登入
    const res = await fetch("http://127.0.0.1:8000/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: data.username, password: data.password }),
    });

    // 登入失敗時顯示錯誤訊息
    if (!res.ok) {
      const errorData = await res.json();
      alert(errorData.detail || "登入失敗");
      return;
    }
    // 登入成功，取得 access_token
    const json = await res.json();

    setToken(json.access_token); // 更新 Context，Navbar 會即時 re-render
    navigate("/"); // 導向首頁
  };

  return (
    // 登入頁面 UI
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">登入</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">使用者名稱</label>
            {/* 使用者名稱輸入框 */}
            <input type="text" placeholder="Your username" {...register("username")}
                  className={`w-full rounded-lg border px-3 py-2 outline-none transition ${errors.username?"border-red-400 focus:ring-2 focus:ring-red-200":"border-gray-300 focus:ring-2 focus:ring-blue-200"}`} />
            {/* 顯示驗證錯誤訊息 */}
            {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-1">密碼</label>
            {/* 密碼輸入框 */}
            <input type="password" placeholder="••••••••" {...register("password")}
                   className={`w-full rounded-lg border px-3 py-2 outline-none transition ${errors.password?"border-red-400 focus:ring-2 focus:ring-red-200":"border-gray-300 focus:ring-2 focus:ring-blue-200"}`} />
            {/* 顯示驗證錯誤訊息 */}
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          {/* 登入按鈕，送出表單 */}
          <button disabled={isSubmitting} className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2.5 transition">
            {isSubmitting ? "登入中..." : "登入"}
          </button>
        </form>
        {/* 註冊連結 */}
        <p className="mt-4 text-sm text-center">還沒有帳號？ <Link to="/register" className="text-blue-600 hover:underline">註冊</Link></p>
      </div>
    </div>
  );
}