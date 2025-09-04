import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="mt-2 text-gray-600">找不到這個頁面</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        回首頁
      </Link>
    </div>
  );
}