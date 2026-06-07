import { useState } from "react";
import { allQuestionnaires } from "../data/questionnaires.js";
import { calculateResults } from "../utils/scoring.js";
import { submitAnswer } from "../api.js";

// 取得某题的选项列表，统一成 {value, label}
function optionsForQuestion(questionnaire, question) {
  if (questionnaire.optionStyle === "hads") {
    return (question.options || []).map((o) => ({ value: o.score, label: o.text }));
  }
  if (questionnaire.optionStyle === "rds") {
    return (question.options || []).map((o) => ({ value: o.value, label: o.label }));
  }
  return (questionnaire.options || []).map((o) => ({ value: o.value, label: o.label }));
}

export default function Questionnaire({ session, context, onDone, onCancel }) {
  const { planId, timeNodeId, questionnaireId } = context;
  const questionnaire = allQuestionnaires[questionnaireId];
  const questions = questionnaire?.questions || [];
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!questionnaire) return <div className="p-6 text-center text-gray-500">问卷不存在</div>;

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const percent = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;

  const select = (qid, value) => setAnswers((prev) => ({ ...prev, [qid]: value }));

  const submit = async () => {
    if (!allAnswered || submitting) return;
    setSubmitting(true);
    setError("");
    const { totalScore, resultLevel } = calculateResults(questionnaire, answers);
    try {
      await submitAnswer({
        identifier: session.identifier,
        planId,
        timeNodeId,
        questionnaireId,
        answers,
        totalScore,
        resultLevel,
      });
      onDone();
    } catch (e) {
      setError(e.message || "提交失败，请重试");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 pb-28 pt-4">
      <div className="sticky top-0 z-10 -mx-4 bg-gray-50/95 px-4 pb-3 pt-1 backdrop-blur">
        <div className="flex items-center justify-between">
          <button className="text-sm text-gray-400" onClick={onCancel}>‹ 返回</button>
          <span className="text-xs text-gray-500">{answeredCount} / {questions.length}</span>
        </div>
        <h2 className="mt-1 text-base font-bold text-gray-800">{questionnaire.title}</h2>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {questionnaire.stem && (
        <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm leading-relaxed text-amber-800">
          {questionnaire.stem}
        </p>
      )}

      <div className="mt-4 space-y-5">
        {questions.map((q, idx) => {
          const opts = optionsForQuestion(questionnaire, q);
          return (
            <div key={q.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-sm font-medium text-gray-800">
                <span className="mr-1 text-blue-500">{idx + 1}.</span>
                {q.text}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {opts.map((o) => {
                  const active = answers[q.id] === o.value;
                  return (
                    <button
                      key={String(o.value) + o.label}
                      className={`rounded-lg border px-3 py-2 text-sm transition ${
                        active
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-300"
                      }`}
                      onClick={() => select(q.id, o.value)}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}

      <div className="fixed inset-x-0 bottom-0 border-t border-gray-200 bg-white p-4">
        <div className="mx-auto max-w-md">
          <button
            className="w-full rounded-lg bg-blue-500 py-3 font-medium text-white disabled:opacity-40"
            onClick={submit}
            disabled={!allAnswered || submitting}
          >
            {submitting ? "正在提交…" : allAnswered ? "完成，提交问卷" : `还有 ${questions.length - answeredCount} 题未答`}
          </button>
        </div>
      </div>
    </div>
  );
}
