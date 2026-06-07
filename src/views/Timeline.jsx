import { useEffect, useState, useCallback } from "react";
import { plans } from "../data/plans.js";
import { getPlanProgress } from "../api.js";
import { buildTimelineNodes } from "../utils/timeline.js";
import ResultModal from "../components/ResultModal.jsx";

export default function Timeline({ session, planId, onStartQuestionnaire }) {
  const plan = plans[planId];
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resultRecord, setResultRecord] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const res = await getPlanProgress(session.identifier, planId);
      setNodes(buildTimelineNodes(plan, res.data || []));
    } catch (e) {
      setError(e.message || "加载失败");
    } finally {
      setLoading(false);
    }
  }, [session.identifier, planId, plan]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (!plan) return <div className="p-6 text-center text-gray-500">方案不存在</div>;

  const onTapQuestionnaire = (node, q) => {
    if (q.status === "locked") return;
    if (q.status === "completed") {
      setResultRecord(q.progress);
      return;
    }
    onStartQuestionnaire({ planId, timeNodeId: node.timeNodeId, questionnaireId: q.id });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-4">
      <h2 className="text-lg font-bold text-gray-800">{plan.name}</h2>
      <p className="mt-1 text-sm text-gray-500">{plan.description}</p>

      {loading && <p className="mt-6 text-center text-sm text-gray-400">加载中…</p>}
      {error && <p className="mt-6 text-center text-sm text-red-500">{error}</p>}

      {!loading && (
        <div className="mt-5 space-y-4">
          {nodes.map((node) => (
            <div
              key={node.timeNodeId}
              className={`rounded-2xl border p-4 ${
                node.isLocked ? "border-gray-200 bg-gray-50 opacity-70" : "border-blue-100 bg-white shadow-sm"
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="font-semibold text-gray-800">{node.name}</span>
                {node.isLocked && <span className="text-xs text-gray-400">🔒 待解锁</span>}
              </div>
              <div className="space-y-2">
                {node.questionnaires.map((q) => (
                  <button
                    key={q.id}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ${
                      q.status === "completed"
                        ? "bg-green-50 text-green-700"
                        : q.status === "locked"
                        ? "cursor-not-allowed bg-gray-100 text-gray-400"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}
                    onClick={() => onTapQuestionnaire(node, q)}
                    disabled={q.status === "locked"}
                  >
                    <span>
                      {q.name}
                      {!q.required && <span className="ml-1 text-xs text-gray-400">(选填)</span>}
                    </span>
                    <span className="text-xs">
                      {q.status === "completed" ? "✓ 已完成" : q.status === "locked" ? "🔒" : "去填写 ›"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <ResultModal
        record={resultRecord}
        onClose={() => setResultRecord(null)}
        onRetake={() => {
          const rec = resultRecord;
          setResultRecord(null);
          onStartQuestionnaire({
            planId,
            timeNodeId: rec.timeNodeId,
            questionnaireId: rec.questionnaireId,
          });
        }}
      />
    </div>
  );
}
