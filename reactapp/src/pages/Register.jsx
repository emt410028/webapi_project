import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  username: z.string().min(5, "至少 5 個字"),
  email: z.string().email("請輸入有效 Email"),
  password: z.string().min(6, "密碼不能為空"),
  confirm: z.string().min(6, "密碼不能為空"),
}).refine(v => v.password === v.confirm, { path: ["confirm"], message: "密碼不一致" });

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(schema) });

    const onSubmit = async ({ username, email, password }) => {
    try {
        const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        });
        if (!res.ok) throw new Error((await res.json()).detail || "註冊失敗");
        alert("註冊成功，請登入");
        navigate("/login");
    } catch (e) { alert(e.message); }
    };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">註冊</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">使用者名稱</label>
            <input placeholder="使用者名稱" {...register("username")}
                   className={`w-full rounded-lg border px-3 py-2 outline-none transition ${errors.name?"border-red-400 focus:ring-2 focus:ring-red-200":"border-gray-300 focus:ring-2 focus:ring-blue-200"}`} />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input type="email" placeholder="you@example.com" {...register("email")}
                   className={`w-full rounded-lg border px-3 py-2 outline-none transition ${errors.email?"border-red-400 focus:ring-2 focus:ring-red-200":"border-gray-300 focus:ring-2 focus:ring-blue-200"}`} />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">密碼</label>
            <input type="password" placeholder="密碼" {...register("password")}
                   className={`w-full rounded-lg border px-3 py-2 outline-none transition ${errors.password?"border-red-400 focus:ring-2 focus:ring-red-200":"border-gray-300 focus:ring-2 focus:ring-blue-200"}`} />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-1">再次輸入密碼</label>
            <input type="password" placeholder="密碼" {...register("confirm")}
                   className={`w-full rounded-lg border px-3 py-2 outline-none transition ${errors.confirm?"border-red-400 focus:ring-2 focus:ring-red-200":"border-gray-300 focus:ring-2 focus:ring-blue-200"}`} />
            {errors.confirm && <p className="mt-1 text-xs text-red-500">{errors.confirm.message}</p>}
          </div>
          <button disabled={isSubmitting} className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2.5 transition">
            {isSubmitting ? "送出中..." : "建立帳號"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">已有帳號？ <Link to="/login" className="text-blue-600 hover:underline">登入</Link></p>
      </div>
    </div>
  );
}