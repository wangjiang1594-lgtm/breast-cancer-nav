import Modal from "./Modal.jsx";
import { allQuestionnaires } from "../data/questionnaires.js";
import { computeRetake } from "../utils/timeline.js";

// 已完成问卷的结果弹窗（含重测），移植自小程序 plan-timeline 结果展示
function ScoreView({ resultStyle, totalScore = {}, resultLevel = {} }) {
  switch (resultStyle) {
    case "breastq":
      return (
        <div className="space-y-1 text-sm text-gray-700">
          <p>原始分：<b>{totalScore.raw}</b></p>
          <p>标准化转换分（0-100）：<b className="text-blue-600">{totalScore.qScore}</b></p>
        </div>
      );
    case "cost":
      return (
        <div className="space-y-1 text-sm text-gray-700">
          <p>总分：<b>{totalScore.total}</b></p>
          <p>结果：<b className="text-blue-600">{resultLevel.main}</b></p>
        </div>
      );
    case "hads":
      return (
        <div className="space-y-1 text-sm text-gray-700">
          <p>焦虑（A）：<b>{totalScore.anxiety}</b> — <b className="text-blue-600">{resultLevel.anxiety}</b></p>
          <p>抑郁（D）：<b>{totalScore.depression}</b> — <b className="text-blue-600">{resultLevel.depression}</b></p>
        </div>
      );
    case "bctos":
      return (
        <div className="space-y-1 text-sm text-gray-700">
          <p>美学维度：<b>{totalScore.aesthetic}</b>　功能维度：<b>{totalScore.functional}</b>　总分：<b>{totalScore.total}</b></p>
          <p className="text-blue-600">{resultLevel.main}</p>
        </div>
      );
    case "fcri":
      return (
        <div className="space-y-1 text-sm text-gray-700">
          <p>总分：<b>{totalScore.total}</b></p>
          <p className="text-blue-600">{resultLevel.main}</p>
        </div>
      );
    case "rds":
      return (
        <div className="space-y-1 text-sm text-gray-700">
          <p>后悔分（0-100）：<b>{totalScore.score}</b></p>
          <p className="text-blue-600">{resultLevel.main}</p>
        </div>
      );
    default:
      return <p className="text-sm text-gray-500">已提交</p>;
  }
}

export default function ResultModal({ record, onClose, onRetake }) {
  if (!record) return null;
  const q = allQuestionnaires[record.questionnaireId];
  const resultStyle = q?.resultStyle || "default";
  const { canRetake, retakeUsed, within24Hours, lastSubmitDate } = computeRetake(record);

  return (
    <Modal open onClose={onClose} title={q?.title || "评估结果"}>
      <ScoreView resultStyle={resultStyle} totalScore={record.totalScore} resultLevel={record.resultLevel} />
      <p className="mt-3 text-xs text-gray-400">最后提交：{lastSubmitDate}</p>
      <div className="mt-4 flex gap-2">
        {canRetake ? (
          <button
            className="flex-1 rounded-lg bg-blue-500 py-2.5 text-sm font-medium text-white"
            onClick={onRetake}
          >
            重新作答（限一次）
          </button>
        ) : (
          <div className="flex-1 rounded-lg bg-gray-100 py-2.5 text-center text-xs text-gray-400">
            {retakeUsed ? "本次评估已重测过，不可再修改" : !within24Hours ? "已超过 24 小时，不可重测" : "不可重测"}
          </div>
        )}
        <button className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm text-gray-600" onClick={onClose}>
          关闭
        </button>
      </div>
    </Modal>
  );
}
