import { useEffect, useState, useRef } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);  // 一開始是陣列
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  // 載入歷史紀錄
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("沒有 token，請先登入");
      return;
    }

    fetch("http://127.0.0.1:8000/api/chat/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((r) => {
        if (!r.ok) throw new Error("API 錯誤: " + r.status);
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("回傳非陣列：", data);
          setMessages([]);
        }
      })
      .catch((err) => {
        console.error("載入歷史失敗:", err);
      });
  }, []);

  // 自動滾動到底
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // 送訊息
  const sendMessage = async () => {
    const token = localStorage.getItem("access_token");
    if (!input.trim()) return;

    // 樂觀更新（先顯示使用者訊息）
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    const userInput = input;
    setInput("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!res.ok) throw new Error("API 錯誤: " + res.status);

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("送出訊息失敗:", err);
      setMessages((prev) => [...prev, { role: "assistant", content: "（發送失敗）" }]);
    }
  };

  return (
    <div className="mx-auto max-w-3xl py-6">
      <div
        ref={listRef}
        className="h-[60vh] overflow-y-auto rounded-lg border p-4 bg-white"
      >
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block rounded-xl px-3 py-2 ${
                m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-lg border px-3 py-2"
          placeholder="輸入訊息..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          送出
        </button>
      </div>
    </div>
  );
}