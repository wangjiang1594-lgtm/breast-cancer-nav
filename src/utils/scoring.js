// 计分逻辑，移植自小程序 do-questionnaire/index.js 的 calculateResults
// 七种 resultStyle：cost / hads / bctos / breastq / fcri / rds
export function calculateResults(questionnaire, answers) {
  let totalScore = {};
  let resultLevel = {};
  if (!questionnaire) return { totalScore, resultLevel };
  const questions = questionnaire.questions || [];

  switch (questionnaire.resultStyle) {
    case "cost": {
      let costScore = 0;
      questions.forEach((q) => {
        const answer = Number(answers[q.id]);
        if (q.direction === "positive") costScore += answer;
        else costScore += 4 - answer;
      });
      totalScore = { total: costScore };
      if (costScore >= 26) resultLevel = { main: "无经济毒性" };
      else if (costScore >= 14) resultLevel = { main: "轻度经济毒性" };
      else resultLevel = { main: "中/高度经济毒性" };
      break;
    }
    case "hads": {
      let anxietyScore = 0;
      let depressionScore = 0;
      questions.forEach((q) => {
        const s = Number(answers[q.id]);
        if (q.type === "A") anxietyScore += s;
        else if (q.type === "D") depressionScore += s;
      });
      const interpret = (score) => (score <= 7 ? "正常" : score <= 10 ? "可疑" : "异常");
      totalScore = { anxiety: anxietyScore, depression: depressionScore };
      resultLevel = { anxiety: interpret(anxietyScore), depression: interpret(depressionScore) };
      break;
    }
    case "bctos": {
      let aestheticScore = 0;
      let functionalScore = 0;
      for (let i = 0; i < 8; i++) aestheticScore += Number(answers[questions[i].id]) || 0;
      for (let i = 8; i < 12; i++) functionalScore += Number(answers[questions[i].id]) || 0;
      const total = aestheticScore + functionalScore;
      totalScore = { aesthetic: aestheticScore, functional: functionalScore, total };
      if (total <= 20) resultLevel = { main: "总体影响程度：轻度。患者感知到的差异较小，对生活质量影响有限。建议常规随访。" };
      else if (total <= 36) resultLevel = { main: "总体影响程度：中度。患者感知到明显差异，可能影响日常活动和心理状态。建议关注，可考虑针对性干预。" };
      else resultLevel = { main: "总体影响程度：重度。患者感知到巨大差异，严重影响生活质量。必须进行干预。" };
      break;
    }
    case "breastq": {
      let rawSum = 0;
      questions.forEach((q) => {
        let s = Number(answers[q.id]);
        if (isNaN(s)) s = 0;
        if (questionnaire.recode) s = questionnaire.recode(s);
        rawSum += s;
      });
      const qScore = questionnaire.conversionTable ? questionnaire.conversionTable[rawSum] : undefined;
      totalScore = { raw: rawSum, qScore: qScore !== undefined ? qScore : "N/A" };
      resultLevel = { main: "无" };
      break;
    }
    case "fcri": {
      let fcriScore = 0;
      questions.forEach((q) => {
        let s = Number(answers[q.id]) || 0;
        if (q.reverse) s = 4 - s;
        fcriScore += s;
      });
      totalScore = { total: fcriScore };
      if (fcriScore >= 16) resultLevel = { main: "您的复发担忧已达到临床显著的严重程度。强烈建议您与您的医疗团队或专业的心理健康服务提供者进行深入沟通。" };
      else if (fcriScore >= 13) resultLevel = { main: "您的评估结果提示可能存在临床意义上的复发担忧。建议您与医生或心理专业人士进行沟通，分享您的感受。" };
      else resultLevel = { main: "您的复发担忧水平目前处于较低范围。请继续保持积极的心态和健康的生活方式。" };
      break;
    }
    case "rds": {
      let rdsRawSum = 0;
      questions.forEach((q) => {
        let s = Number(answers[q.id]) || 0;
        if (q.reverse) s = 6 - s;
        rdsRawSum += s;
      });
      const finalScore = ((rdsRawSum - 5) * 100) / 20;
      totalScore = { score: Math.round(finalScore) };
      if (finalScore < 25) resultLevel = { main: "结果表明您对自己的决定基本没有或只有非常轻微的后悔。" };
      else resultLevel = { main: "结果表明您对自己的决定存在一定程度的后悔，如果这种情绪困扰到您，建议与医生或专业人士沟通。" };
      break;
    }
    default:
      break;
  }
  return { totalScore, resultLevel };
}
