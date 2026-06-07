import { useState } from "react";
import { login as apiLogin, saveSession } from "../api.js";
import { allQuestionnaires } from "../data/questionnaires.js";
import Modal from "../components/Modal.jsx";
import AiChat from "../components/AiChat.jsx";

export default function Login({ onLogin, onAdmin }) {
  const [id4, setId4] = useState("");
  const [initials, setInitials] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const questionnaires = Object.values(allQuestionnaires);

  const submit = async () => {
    if (loading) return;
    if (!/^\d{3}[\dX]$/.test(id4)) return setError("请输入正确的4位凭证编号");
    if (!/^[A-Z]{1,8}$/.test(initials)) return setError("请输入正确的凭证字母");
    setError("");
    setLoading(true);
    try {
      const res = await apiLogin(id4, initials);
      saveSession(res.identifier, res.label);
      onLogin({ identifier: res.identifier, label: res.label });
    } catch (e) {
      setError(e.message || "验证失败，请联系研究人员");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">乳甲自我行</h1>
        <p className="mt-1 text-sm text-gray-500">乳腺癌患者随访量表评估系统</p>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
        <label className="text-sm font-medium text-gray-600">凭证编号（身份证后4位）</label>
        <input
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 tracking-widest outline-none focus:border-blue-400"
          placeholder="如 1234"
          value={id4}
          inputMode="text"
          onChange={(e) => setId4(e.target.value.replace(/[^\dXx]/g, "").toUpperCase().slice(0, 4))}
        />
        <label className="mt-4 block text-sm font-medium text-gray-600">凭证字母（姓名缩写）</label>
        <input
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 tracking-widest outline-none focus:border-blue-400"
          placeholder="如 ZS"
          value={initials}
          onChange={(e) => setInitials(e.target.value.replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 8))}
        />
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        <button
          className="mt-5 w-full rounded-lg bg-blue-500 py-3 font-medium text-white disabled:opacity-50"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "验证中…" : "登录并开始"}
        </button>
        <button className="mt-3 w-full text-center text-xs text-gray-400" onClick={onAdmin}>
          研究人员管理入口
        </button>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
        <button
          className="flex w-full items-center justify-between text-left text-sm font-medium text-gray-700"
          onClick={() => setListOpen((v) => !v)}
        >
          <span>本系统包含的量表（{questionnaires.length}）</span>
          <span className="text-gray-400">{listOpen ? "收起 ▲" : "展开 ▼"}</span>
        </button>
        {listOpen && (
          <div className="mt-3 space-y-2">
            {questionnaires.map((q) => (
              <button
                key={q.title}
                className="block w-full rounded-lg bg-gray-50 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setModalItem(q)}
              >
                {q.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <Modal open={!!modalItem} onClose={() => setModalItem(null)} title={modalItem?.title}>
        {modalItem && (
          <>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600">{modalItem.description}</p>
            <AiChat title={modalItem.title} description={modalItem.description} />
          </>
        )}
      </Modal>
    </div>
  );
}
