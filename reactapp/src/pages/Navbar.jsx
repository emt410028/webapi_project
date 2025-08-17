import { Link, NavLink } from "react-router-dom";



export default function Navbar() {
  const token = localStorage.getItem("access_token");
  const logout = () => { localStorage.removeItem("access_token"); location.href = "/login"; };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-blue-600/95 backdrop-blur supports-[backdrop-filter]:bg-blue-600/80">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="font-semibold text-white">Manson Web</Link>
        <div className="flex items-center gap-4 text-white/90">
        
          {token ? (
            <button onClick={logout} className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20">登出</button>
          ) : (
            <>
              <NavLink to="/login" className="hover:text-white">登入</NavLink>
              <NavLink to="/register" className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20">註冊</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}