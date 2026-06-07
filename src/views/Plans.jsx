import { useState } from "react";
import { plans } from "../data/plans.js";
import { allQuestionnaires } from "../data/questionnaires.js";
import { getMyStartedPlans } from "../api.js";
import Modal from "../components/Modal.jsx";
import AiChat from "../components/AiChat.jsx";

const TABS = ["问卷方案", "问卷列表", "我的方案"];

export default function Plans({ session, onOpenPlan }) {
  const [tab, setTab] = useState(0);
  const [modalItem, setModalItem] = useState(null);
  const [myPlans, setMyPlans] = useState(null);
  const [loadingMine, setLoadingMine] = useState(false);
  const [mineError, setMineError] = useState("");

  const planList = Object.values(plans);
  const qList = Object.values(allQuestionnaires);

  const queryMine = async () => {
    setLoadingMine(true);
    setMineError("");
    try {
      const res = await getMyStartedPlans(session.identifier);
      setMyPlans((res.data || []).map((id) => plans[id]).filter(Boolean));
    } catch (e) {
      setMineError(e.message || "查询失败");
    } finally {
      setLoadingMine(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-4">
      <div className="mb-4 flex rounded-xl bg-gray-100 p-1">
        {TABS.map((t, i) => (
          <button
            key={t}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
              tab === i ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div className="space-y-3">
          {planList.map((p) => (
            <button
              key={p.id}
              className="block w-full rounded-2xl bg-white p-4 text-left shadow-sm hover:shadow"
              onClick={() => onOpenPlan(p.id)}
            >
              <div className="font-semibold text-gray-800">{p.name}</div>
              <div className="mt-1 text-sm text-gray-500">{p.description}</div>
              <div className="mt-2 text-xs text-blue-500">{p.timeline.length} 个评估节点 ›</div>
            </button>
          ))}
        </div>
      )}

      {tab === 1 && (
        <div className="space-y-2">
          {qList.map((q) => (
            <button
              key={q.title}
              className="block w-full rounded-xl bg-white px-4 py-3 text-left text-sm text-gray-700 shadow-sm hover:bg-gray-50"
              onClick={() => setModalItem(q)}
            >
              {q.title}
            </button>
          ))}
        </div>
      )}

      {tab === 2 && (
        <div>
          <button
            className="w-full rounded-lg bg-blue-500 py-3 font-medium text-white disabled:opacity-50"
            onClick={queryMine}
            disabled={loadingMine}
          >
            {loadingMine ? "查询中…" : "查询我已开始的方案"}
          </button>
          {mineError && <p className="mt-3 text-sm text-red-500">{mineError}</p>}
          {myPlans && myPlans.length === 0 && (
            <p className="mt-4 text-center text-sm text-gray-400">您还没有开始任何方案</p>
          )}
          {myPlans && myPlans.length > 0 && (
            <div className="mt-4 space-y-3">
              {myPlans.map((p) => (
                <button
                  key={p.id}
                  className="block w-full rounded-2xl bg-white p-4 text-left shadow-sm hover:shadow"
                  onClick={() => onOpenPlan(p.id)}
                >
                  <div className="font-semibold text-gray-800">{p.name}</div>
                  <div className="mt-1 text-xs text-blue-500">继续作答 ›</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

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
