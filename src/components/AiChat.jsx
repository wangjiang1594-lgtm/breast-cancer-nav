import { useState } from "react";
import { aiAsk } from "../api.js";

// 量表 AI 咨询助手，移植自小程序 home 的 askAI
export default function AiChat({ title, description }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (loading) return;
    const q = question.trim() || "这个量表评估什么？";
    setLoading(true);
    setAnswer("");
    setQuestion(q);
    try {
      const res = await aiAsk(title, description, q);
      setAnswer(res.answer || "（暂无回复）");
    } catch (e) {
      setAnswer("AI 回复失败：" + (e.message || "请稍后重试"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 rounded-xl bg-blue-50 p-3">
      <div className="mb-2 flex items-center gap-1 text-sm font-medium text-blue-700">
        <span>✨ AI 助手</span>
        <span className="text-xs font-normal text-blue-400">有关此量表的疑问都可以问我</span>
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
          placeholder="例如：这个量表评估什么？"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
        />
        <button
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          onClick={ask}
          disabled={loading}
        >
          {loading ? "思考中…" : "提问"}
        </button>
      </div>
      {answer && (
        <div className="mt-3 whitespace-pre-wrap rounded-lg bg-white p-3 text-sm leading-relaxed text-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
}
