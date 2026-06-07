import { useState } from "react";
import { adminVerifyPin, adminAddPatient, adminListPatients } from "../api.js";

export default function Admin({ onBack }) {
  const [pin, setPin] = useState("");
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [tab, setTab] = useState("list");
  const [patients, setPatients] = useState([]);
  const [tempCount, setTempCount] = useState(0);
  const [msg, setMsg] = useState("");
  const [newId4, setNewId4] = useState("");
  const [newInitials, setNewInitials] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [adding, setAdding] = useState(false);

  const verify = async () => {
    if (verifying || !pin) return;
    setVerifying(true);
    setMsg("");
    try {
      await adminVerifyPin(pin);
      setVerified(true);
      loadList();
    } catch (e) {
      setMsg(e.message || "密码错误");
      setPin("");
    } finally {
      setVerifying(false);
    }
  };

  const loadList = async () => {
    try {
      const res = await adminListPatients(pin);
      setPatients(res.data || []);
      setTempCount(res.tempCount || 0);
    } catch (e) {
      setMsg(e.message || "加载失败");
    }
  };

  const add = async () => {
    if (adding) return;
    if (!/^\d{3}[\dX]$/.test(newId4)) return setMsg("凭证编号格式不正确");
    if (!/^[A-Z]{1,8}$/.test(newInitials)) return setMsg("凭证字母格式不正确");
    setAdding(true);
    setMsg("");
    try {
      const res = await adminAddPatient(pin, newId4, newInitials, newLabel);
      setMsg(`添加成功，凭证码：${res.identifier}`);
      setNewId4("");
      setNewInitials("");
      setNewLabel("");
      setTab("list");
      loadList();
    } catch (e) {
      setMsg(e.message || "添加失败");
    } finally {
      setAdding(false);
    }
  };

  if (!verified) {
    return (
      <div className="mx-auto max-w-md px-4 py-10">
        <button className="text-sm text-gray-400" onClick={onBack}>‹ 返回登录</button>
        <h2 className="mt-6 text-center text-xl font-bold text-gray-800">研究人员管理</h2>
        <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
          <label className="text-sm font-medium text-gray-600">管理 PIN</label>
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 tracking-widest outline-none focus:border-blue-400"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
            onKeyDown={(e) => e.key === "Enter" && verify()}
          />
          {msg && <p className="mt-3 text-sm text-red-500">{msg}</p>}
          <button
            className="mt-5 w-full rounded-lg bg-blue-500 py-3 font-medium text-white disabled:opacity-50"
            onClick={verify}
            disabled={verifying}
          >
            {verifying ? "验证中…" : "验证"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-4">
      <div className="flex items-center justify-between">
        <button className="text-sm text-gray-400" onClick={onBack}>‹ 返回登录</button>
        <div className="flex rounded-lg bg-gray-100 p-1 text-sm">
          <button
            className={`rounded px-3 py-1 ${tab === "list" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}
            onClick={() => setTab("list")}
          >
            患者列表
          </button>
          <button
            className={`rounded px-3 py-1 ${tab === "add" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}
            onClick={() => setTab("add")}
          >
            新增患者
          </button>
        </div>
      </div>

      {msg && <p className="mt-3 text-sm text-blue-600">{msg}</p>}

      {tab === "list" && (
        <div className="mt-4">
          <p className="mb-2 text-xs text-gray-400">临时新增 {tempCount} 条 · 共 {patients.length} 条</p>
          <div className="space-y-2">
            {patients.map((p) => (
              <div key={p.code + p.source} className="flex items-center justify-between rounded-lg bg-white px-4 py-2.5 text-sm shadow-sm">
                <span className="font-mono font-medium text-gray-800">{p.code}</span>
                <span className="text-gray-500">{p.label || "—"}</span>
                <span className={`text-xs ${p.source === "temp" ? "text-amber-500" : "text-gray-300"}`}>
                  {p.source === "temp" ? "临时" : "基础"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "add" && (
        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
          <label className="text-sm font-medium text-gray-600">凭证编号（身份证后4位）</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-400"
            value={newId4}
            onChange={(e) => setNewId4(e.target.value.replace(/[^\dXx]/g, "").toUpperCase().slice(0, 4))}
          />
          <label className="mt-4 block text-sm font-medium text-gray-600">凭证字母（姓名缩写）</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-400"
            value={newInitials}
            onChange={(e) => setNewInitials(e.target.value.replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 8))}
          />
          <label className="mt-4 block text-sm font-medium text-gray-600">备注（病历号等，可选）</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-400"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value.slice(0, 50))}
          />
          <button
            className="mt-5 w-full rounded-lg bg-blue-500 py-3 font-medium text-white disabled:opacity-50"
            onClick={add}
            disabled={adding}
          >
            {adding ? "提交中…" : "添加患者"}
          </button>
        </div>
      )}
    </div>
  );
}
