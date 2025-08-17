import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";


const schema = z.object({
  username: z.string().min(3, "至少 3 個字"),
  password: z.string().min(6, "密碼不能為空"),
});

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("登入失敗");
      const json = await res.json();
      localStorage.setItem("access_token", json.access_token);
      navigate("/");
    } catch (e) { alert(e.message); }
  };

  return (
    
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">登入</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">使用者名稱</label>
            <input type="text" placeholder="Your username" {...register("username")}
                  className={`w-full rounded-lg border px-3 py-2 outline-none transition ${errors.username?"border-red-400 focus:ring-2 focus:ring-red-200":"border-gray-300 focus:ring-2 focus:ring-blue-200"}`} />
            {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-1">密碼</label>
            <input type="password" placeholder="••••••••" {...register("password")}
                   className={`w-full rounded-lg border px-3 py-2 outline-none transition ${errors.password?"border-red-400 focus:ring-2 focus:ring-red-200":"border-gray-300 focus:ring-2 focus:ring-blue-200"}`} />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <button disabled={isSubmitting} className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2.5 transition">
            {isSubmitting ? "登入中..." : "登入"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">還沒有帳號？ <Link to="/register" className="text-blue-600 hover:underline">註冊</Link></p>
      </div>
    </div>
    
  );
}