// /utils/plans.js

// 定义所有精确的基础表单ID常量
const BQ_PSYCHOSOCIAL = 'BQ_psychosocial';
const BQ_SEXUAL = 'BQ_sexual';
const BQ_SATISFACTION_PREOP = 'BQ_satisfaction_preop';
const BQ_SATISFACTION_POSTOP = 'BQ_satisfaction_postop';
const BQ_PHYSICAL_PREOP = 'BQ_physical_preop';
const BQ_PHYSICAL_POSTOP = 'BQ_physical_postop';
const HADS = 'HADS';
const COST = 'COST';
const BCTOS_12 = 'BCTOS_12';
const FCRI_SF = 'FCRI_SF';
const RDS = 'RDS';

export const plans = {
  'PLAN_A': {
    id: 'PLAN_A',
    name: '方案A：标准保乳术后随访（前瞻性）',
    description: '适用于接受标准保乳手术患者的常规随访方案，覆盖术前至术后5年的关键节点。',
    timeline: [
      { 
        timeNodeId: 'preop', 
        name: '术前评估', 
        questionnaires: [{ id: BQ_PSYCHOSOCIAL,       required: true },
            { id: BQ_SEXUAL,             required: true },
            { id: BQ_SATISFACTION_PREOP, required: true },
            { id: BQ_PHYSICAL_PREOP,     required: true },
            { id: BCTOS_12,              required: true },
            { id: COST,                  required: true }, 
            { id: HADS,                  required: true } ] 
      },
      { 
        timeNodeId: 'postop_1m', 
        name: '术后1个月', 
        questionnaires: [{ id: BQ_SATISFACTION_POSTOP,required: true},
            {id: BQ_PHYSICAL_POSTOP, required: true},
            {id: BCTOS_12,required: true},
            {id: COST,required:true} ,
            { id: FCRI_SF,                required: false },
            { id: RDS,                    required: false } ] 
      },
      { 
        timeNodeId: 'postop_3m', 
        name: '术后3个月', 
        questionnaires: [{ id: BQ_SATISFACTION_POSTOP,required: true},
            {id: BQ_PHYSICAL_POSTOP, required: true},
            {id: BCTOS_12,required: true},
            { id: FCRI_SF,                required: false },
            { id: RDS,                    required: false } ] 
      },
      { 
        timeNodeId: 'postop_6m', 
        name: '术后6个月', 
        questionnaires: [{ id: BQ_PSYCHOSOCIAL,       required: true },
             { id: BQ_SEXUAL,             required: true }, 
            { id: BQ_SATISFACTION_POSTOP,required: true},
            {id: BQ_PHYSICAL_POSTOP, required: true},
            {id: BCTOS_12,required: true},
            { id: FCRI_SF,                required: false },
            { id: RDS,                    required: false } ] 
      },
      { 
        timeNodeId: 'postop_1y', 
        name: '术后1年', 
        questionnaires: [{ id: BQ_PSYCHOSOCIAL,       required: true },
            { id: BQ_SEXUAL,             required: true }, 
           { id: BQ_SATISFACTION_POSTOP,required: true},
           {id: BQ_PHYSICAL_POSTOP, required: true},
           {id: BCTOS_12,required: true},
           { id: COST,                  required: true }, 
           { id: HADS,                  required: true },
           { id: FCRI_SF,                required: false },
           { id: RDS,                    required: false } ] 
      },
      { 
        timeNodeId: 'postop_2y', 
        name: '术后2年', 
        questionnaires: [{ id: BQ_PSYCHOSOCIAL,       required: true },
            { id: BQ_SEXUAL,             required: true }, 
           { id: BQ_SATISFACTION_POSTOP,required: true},
           {id: BQ_PHYSICAL_POSTOP, required: true},
           {id: BCTOS_12,required: true},
           { id: COST,                  required: true }, 
           { id: HADS,                  required: true },
           { id: FCRI_SF,                required: false },
           { id: RDS,                    required: false } ]
      },
      { 
        timeNodeId: 'postop_3y', 
        name: '术后3年', 
        questionnaires: [{ id: BQ_PSYCHOSOCIAL,       required: true },
            { id: BQ_SEXUAL,             required: true }, 
           { id: BQ_SATISFACTION_POSTOP,required: true},
           {id: BQ_PHYSICAL_POSTOP, required: true},
           {id: BCTOS_12,required: true},
           { id: COST,                  required: true }, 
           { id: HADS,                  required: true },
           { id: FCRI_SF,                required: false },
           { id: RDS,                    required: false } ]
      },
      { 
        timeNodeId: 'postop_4y', 
        name: '术后4年', 
        questionnaires: [{ id: BQ_PSYCHOSOCIAL,       required: true },
            { id: BQ_SEXUAL,             required: true }, 
           { id: BQ_SATISFACTION_POSTOP,required: true},
           {id: BQ_PHYSICAL_POSTOP, required: true},
           {id: BCTOS_12,required: true},
           { id: COST,                  required: true }, 
           { id: HADS,                  required: true },
           { id: FCRI_SF,                required: false },
           { id: RDS,                    required: false } ]
      },
      { 
        timeNodeId: 'postop_5y', 
        name: '术后5年', 
        questionnaires: [{ id: BQ_PSYCHOSOCIAL,       required: true },
           { id: BQ_SEXUAL,             required: true }, 
           { id: BQ_SATISFACTION_POSTOP,required: true},
           {id: BQ_PHYSICAL_POSTOP, required: true},
           {id: BCTOS_12,required: true},
           { id: COST,                  required: true }, 
           { id: HADS,                  required: true },
           { id: FCRI_SF,                required: false },
           { id: RDS,                    required: false } ]
      },
    ]
  },
  'PLAN_B': {
    id: 'PLAN_B',
    name: '方案B：既往标准保乳术后随访（回顾性）',
    description: '一次性评估各生活质量指标。',
    timeline: [
        { 
            timeNodeId: 'onetime_first', 
            name: '一次性评估（首次）', 
            questionnaires: [
                { id: BQ_PSYCHOSOCIAL,       required: true },
                { id: BQ_SEXUAL,             required: true }, 
               { id: BQ_SATISFACTION_POSTOP,required: true},
               {id: BQ_PHYSICAL_POSTOP, required: true},
               {id: BCTOS_12,required: true},
               { id: COST,                  required: true }, 
               { id: HADS,                  required: true },
               { id: FCRI_SF,                required: false },
               { id: RDS,                    required: false } 
             ] 
           },
          { 
            timeNodeId: 'onetime_second', 
            name: '一次性评估（第2次）', 
            questionnaires: [
                { id: BQ_PSYCHOSOCIAL,       required: true },
                { id: BQ_SEXUAL,             required: true }, 
               { id: BQ_SATISFACTION_POSTOP,required: true},
               {id: BQ_PHYSICAL_POSTOP, required: true},
               {id: BCTOS_12,required: true},
               { id: COST,                  required: true }, 
               { id: HADS,                  required: true },
               { id: FCRI_SF,                required: false },
               { id: RDS,                    required: false } 
             ] 
             },
 ]
 },
  'PLAN_C': {
    id: 'PLAN_C',
    name: '方案C：心理健康专项随访',
    description: '重点关注患者在治疗过程中的心理和情绪健康。',
    timeline: [
       { timeNodeId: 'preop', name: '术前评估', questionnaires: [{ id: BQ_PSYCHOSOCIAL, required: true }, { id: HADS, required: true }] },
       { timeNodeId: 'postop_3m', name: '术后3个月', questionnaires: [{ id: BQ_PSYCHOSOCIAL, required: true }, { id: HADS, required: true }] },
       { timeNodeId: 'postop_1y', name: '术后1年', questionnaires: [{ id: BQ_PSYCHOSOCIAL, required: true }, { id: HADS, required: true }] },
    ]
  }
};
