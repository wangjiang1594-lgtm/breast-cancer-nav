// 时间轴节点解锁 + 重测判断，移植自小程序 plan-timeline/index.js
import { allQuestionnaires } from "../data/questionnaires.js";

// 根据进度记录渲染时间轴节点；必填项全部完成才解锁下一节点
export function buildTimelineNodes(plan, progress) {
  let isPreviousNodeCompleted = true; // 允许开始第一个节点
  return plan.timeline.map((node) => {
    const requiredInNode = node.questionnaires.filter((q) => q.required);
    let requiredCompletedCount = 0;

    const questionnaires = node.questionnaires.map((qInfo) => {
      const qId = qInfo.id;
      const progressRecord = progress.find(
        (p) => p.timeNodeId === node.timeNodeId && p.questionnaireId === qId
      );
      const isCompleted = !!progressRecord;
      if (isCompleted && qInfo.required) requiredCompletedCount++;
      return {
        id: qId,
        name: allQuestionnaires[qId]?.title || "未知问卷",
        status: isCompleted ? "completed" : "pending",
        required: qInfo.required,
        progress: progressRecord || null,
      };
    });

    const isLocked = !isPreviousNodeCompleted;
    if (isLocked) questionnaires.forEach((q) => (q.status = "locked"));

    isPreviousNodeCompleted = requiredCompletedCount === requiredInNode.length;

    return { ...node, questionnaires, isLocked };
  });
}

// 计算某条已完成记录是否可重测（首次提交起 24 小时内、且未重测过）
export function computeRetake(record) {
  const now = Date.now();
  const firstSubmitTime = new Date(record.firstSubmitTime || record.submitTime).getTime();
  const submitTime = new Date(record.submitTime).getTime();
  const within24Hours = now - firstSubmitTime < 24 * 60 * 60 * 1000;
  const retakeUsed =
    record.submitCount != null
      ? record.submitCount >= 2
      : Math.abs(firstSubmitTime - submitTime) > 1000; // 兼容无 submitCount 的旧记录
  return {
    within24Hours,
    retakeUsed,
    canRetake: within24Hours && !retakeUsed,
    lastSubmitDate: new Date(submitTime).toLocaleString(),
  };
}
