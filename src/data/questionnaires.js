// /utils/questionnaires.js
// [新增] 这是一个全新的文件，作为所有基础表单的唯一数据源。
const BREASTQ_SOURCE = "该量表来源于 BREAST-Q Version 2.0©，由纪念斯隆·凯特琳癌症中心 (Memorial Sloan Kettering Cancer Center) 和不列颠哥伦比亚大学 (The University of British Columbia) 共同拥有版权 (Copyright ©2017)。";
export const allQuestionnaires = {
    // --- BREAST-Q 基础表单 ---
    'BQ_psychosocial': {
      title: '心理健康',
      stem: '关于您的乳房区域, 在过去1周中, 您多久会感到:',
      description: `评估患者在社交、情感等方面的心理健康状态。\n\n${BREASTQ_SOURCE}`,
      optionStyle: 'default', resultStyle: 'breastq',
      options: [{ value: 1, label: '从未' }, { value: 2, label: '很少' }, { value: 3, label: '有时' }, { value: 4, label: '多数时间' }, { value: 5, label: '一直' }],
      questions: [ { id: 'q1', text: '在社交场合感到自信?' }, { id: 'q2', text: '在情感上可以去做您想做的事?' }, { id: 'q3', text: '情感健康?' }, { id: 'q4', text: '和其他女性相同?' }, { id: 'q5', text: '自信?' }, { id: 'q6', text: '穿衣服有女人味?' }, { id: 'q7', text: '接受您的身体?' }, { id: 'q8', text: '正常的?' }, { id: 'q9', text: '像其它女性一样?' }, { id: 'q10', text: '有吸引力?' } ],
      conversionTable: { 10:0,11:13,12:18,13:21,14:24,15:27,16:29,17:31,18:32,19:34,20:35,21:37,22:38,23:39,24:41,25:42,26:43,27:44,28:45,29:47,30:48,31:49,32:50,33:52,34:53,35:55,36:56,37:58,38:60,39:62,40:64,41:66,42:69,43:71,44:74,45:77,46:80,47:83,48:87,49:93,50:100 }
    },
    'BQ_sexual': {
      title: '性生活健康',
      stem: '关于您的性生活, 您总体多久会感觉到:',
      description: `评估患者在性生活方面的满意度和自信心。\n\n${BREASTQ_SOURCE}`,
      optionStyle: 'default', resultStyle: 'breastq',
      options: [{ value: 1, label: '从未' }, { value: 2, label: '很少' }, { value: 3, label: '有时' }, { value: 4, label: '多数时间' }, { value: 5, label: '一直' }],
      questions: [ { id: 'q1', text: '穿衣服时有性吸引力?' }, { id: 'q2', text: '在性生活时感到舒适/放松?' }, { id: 'q3', text: '在性方面自信?' }, { id: 'q4', text: '对性生活满意?' }, { id: 'q5', text: '不穿衣服时,在性方面对您的乳房外观自信?' }, { id: 'q6', text: '不穿衣服时有性吸引力?' } ],
      conversionTable: { 6:0,7:14,8:20,9:24,10:27,11:31,12:34,13:36,14:39,15:41,16:43,17:46,18:48,19:50,20:53,21:56,22:59,23:62,24:66,25:70,26:74,27:79,28:84,29:91,30:100 }
    },
    'BQ_satisfaction_preop': {
      title: '乳房满意度 (术前)',
      stem: '关于您的乳房区域, 在过去1周中, 您对于以下问题的满意或不满意程度是:',
      description: `评估患者在手术前对其乳房外观、舒适度等方面的满意程度。\n\n${BREASTQ_SOURCE}`,
      optionStyle: 'default', resultStyle: 'breastq',
      options: [{ value: 1, label: '非常不满意' }, { value: 2, label: '有些不满意' }, { value: 3, label: '比较满意' }, { value: 4, label: '非常满意' }],
      questions: [ { id: 'q1', text: '您穿着衣服照镜子时的样子如何?' }, { id: 'q2', text: '您的胸罩与乳房贴合舒适吗?' }, { id: 'q3', text: '能穿更合身的衣服吗?' }, { id: 'q4', text: '您不穿着衣服照镜子时的样子如何?' } ],
      conversionTable: { 4:0,5:23,6:29,7:34,8:39,9:44,10:48,11:53,12:58,13:64,14:71,15:82,16:100 }
    },
    'BQ_satisfaction_postop': {
      title: '乳房满意度 (术后)',
      stem: '以下问题是关于您的乳房和乳腺癌治疗方式。如果您进行过双乳的保乳手术和放疗, 请您按照您认为最不满意的一侧乳房的情况来回答这些问题。在过去1周中, 您对于以下问题的满意或不满意程度是:',
      description: `评估患者在保乳治疗后对其乳房外观、形状、对称性等方面的满意程度。\n\n${BREASTQ_SOURCE}`,
      optionStyle: 'default', resultStyle: 'breastq',
      options: [{ value: 1, label: '非常不满意' }, { value: 2, label: '有些不满意' }, { value: 3, label: '比较满意' }, { value: 4, label: '非常满意' }],
      questions: [ { id: 'q1', text: '您穿着衣服照镜子时的样子?' }, { id: 'q2', text: '当您穿着胸罩时,保乳后乳房的形状?' }, { id: 'q3', text: '穿着衣服时,感觉正常吗?' }, { id: 'q4', text: '能够穿更合身的衣服?' }, { id: 'q5', text: '肿块切除后乳房放着或悬着的方式?' }, { id: 'q6', text: '保乳后乳房外形流畅?' }, { id: 'q7', text: '保乳后乳房的轮廓(外形)?' }, { id: 'q8', text: '您乳房大小相称?' }, { id: 'q9', text: '保乳后乳房看起来的正常程度?' }, { id: 'q10', text: '两个乳房看上去相同程度?' }, { id: 'q11', text: '您不穿着衣服照镜子时的样子?' } ],
      conversionTable: { 11:0,12:15,13:20,14:24,15:26,16:29,17:31,18:33,19:35,20:36,21:38,22:40,23:42,24:43,25:45,26:46,27:48,28:50,29:51,30:53,31:55,32:57,33:59,34:61,35:63,36:65,37:67,38:69,39:72,40:75,41:78,42:82,43:88,44:100 }
    },
    'BQ_physical_preop': {
      title: '生理健康:胸部 (术前)',
      stem: '在过去的1周中, 您多久会体验到:',
      description: `评估患者在手术前，胸部区域是否存在疼痛、不适、活动受限等生理问题。\n\n${BREASTQ_SOURCE}`,
      optionStyle: 'default', resultStyle: 'breastq',
      options: [{ value: 1, label: '从未' }, { value: 2, label: '有时' }, { value: 3, label: '一直' }],
      recode: (val) => (4 - val),
      questions: [ { id: 'q1', text: '胸部肌肉疼痛?' }, { id: 'q2', text: '举起或移动手臂困难?' }, { id: 'q3', text: '因乳房区域不适而入睡困难?' }, { id: 'q4', text: '乳房区域紧绷感?' }, { id: 'q5', text: '乳房区域牵拉感?' }, { id: 'q6', text: '乳房区域一直不舒服?' }, { id: 'q7', text: '乳房区域压痛?' }, { id: 'q8', text: '乳房区域刺痛?' }, { id: 'q9', text: '乳房区域酸痛的感觉?' }, { id: 'q10', text: '乳房区域跳痛?' } ],
      conversionTable: { 10:0,11:8,12:14,13:20,14:24,15:28,16:32,17:36,18:40,19:45,20:50,21:55,22:60,23:64,24:68,25:72,26:76,27:80,28:85,29:92,30:100 }
    },
    'BQ_physical_postop': {
      title: '生理健康:胸部 (术后)',
      stem: '在过去的1-2周中, 您多久会体验到:',
      description: `评估患者在保乳治疗后，胸部区域是否存在疼痛、不适、活动受限等生理问题。\n\n${BREASTQ_SOURCE}`,
      optionStyle: 'default', resultStyle: 'breastq',
      options: [{ value: 1, label: '从未' }, { value: 2, label: '有时' }, { value: 3, label: '一直' }],
      recode: (val) => (4 - val),
      questions: [ { id: 'q1', text: '举起或移动你的手臂困难?' }, { id: 'q2', text: '保乳术后乳房不适而入睡困难?' }, { id: 'q3', text: '乳房区域感到紧绷?' }, { id: 'q4', text: '乳房区域有牵拉感?' }, { id: 'q5', text: '乳房区域触痛?' }, { id: 'q6', text: '乳房区域感到刺痛?' }, { id: 'q7', text: '乳房区有疼痛的感觉?' } ],
      conversionTable: { 7:0,8:13,9:21,10:27,11:33,12:38,13:45,14:52,15:60,16:66,17:71,18:76,19:82,20:89,21:100 }
    },
    // COST 问卷
    'COST': {
      title: '患者经济毒性评估量表 (COST)',
      stem: '请根据您过去7天内的情况，选择最符合您感受的选项。',
      description: '本量表用于评估因疾病及其治疗给患者带来的经济负担，包含11个条目，旨在全面了解患者在财务方面的困扰和满意度。',
      optionStyle: 'default',
      resultStyle: 'cost',
      options: [ { value: 4, label: '完全没有' }, { value: 3, label: '有一点' }, { value: 2, label: '有一些' }, { value: 1, label: '相当多' }, { value: 0, label: '非常多' }, ],
      questions: [ { id: 'cost_q1', text: '我有足够的存款、退休金或其他资产来支付我的治疗费用。', direction: 'positive' }, { id: 'cost_q2', text: '自费医疗费用要多于我预计的。', direction: 'reverse' }, { id: 'cost_q3', text: '我对因疾病及其治疗可能带来的经济问题感到担忧。', direction: 'reverse' }, { id: 'cost_q4', text: '我感到自己无法选择/决定治疗要花多少钱。', direction: 'reverse' }, { id: 'cost_q5', text: '不能工作/不能像以前做同样多的工作让我感到沮丧。', direction: 'reverse' }, { id: 'cost_q6', text: '我对自己目前的经济状况感到满意。', direction: 'positive' }, { id: 'cost_q7', text: '我能够支付每个月的花销。', direction: 'positive' }, { id: 'cost_q8', text: '我感到有经济压力。', direction: 'reverse' }, { id: 'cost_q9', text: '我很担忧能否保持我的工作和收入。', direction: 'reverse' }, { id: 'cost_q10', text: '我的疾病及其治疗已经降低了我对自己经济状况的满意度。', direction: 'reverse' }, { id: 'cost_q11', text: '我可以控制自己的经济状况。', direction: 'positive' }, ]
    },
    // HADS 问卷
    'HADS': {
      title: '医院焦虑抑郁量表 (HADS)',
      stem: '请仔细阅读以下问题，并根据您最近一周的实际情况，选择最能描述您感受的答案。',
      description: '本量表用于快速评估患者的焦虑和抑郁情绪状态，由14个条目组成，其中7个评估焦虑，7个评估抑郁。',
      optionStyle: 'hads',
      resultStyle: 'hads',
      questions: [ { id: 'hads_q1', type: 'A', text: '我感到紧张或痛苦', options: [{ text: '几乎所有时候', score: 3 }, { text: '大多数时候', score: 2 }, { text: '有时', score: 1 }, { text: '根本没有', score: 0 }] }, { id: 'hads_q2', type: 'D', text: '我对以往感兴趣的事情还是有兴趣', options: [{ text: '肯定一样', score: 0 }, { text: '不像以前那样多', score: 1 }, { text: '只有一点儿', score: 2 }, { text: '基本上没有了', score: 3 }] }, { id: 'hads_q3', type: 'A', text: '我感到有点害怕,好象预感到有什么可怕事情要发生', options: [{ text: '非常肯定和十分严重', score: 3 }, { text: '是有,但并不太严重', score: 2 }, { text: '有一点,但并不使我苦恼', score: 1 }, { text: '根本没有', score: 0 }] }, { id: 'hads_q4', type: 'D', text: '我能够哈哈大笑,并看到事物好的一面', options: [{ text: '我经常这样', score: 0 }, { text: '现在已经不大这样了', score: 1 }, { text: '现在肯定是不太多了', score: 2 }, { text: '根本没有', score: 3 }] }, { id: 'hads_q5', type: 'A', text: '我的心中充满烦恼', options: [{ text: '大多数时间', score: 3 }, { text: '常常如此', score: 2 }, { text: '时时,但并不经常', score: 1 }, { text: '偶然如此', score: 0 }] }, { id: 'hads_q6', type: 'D', text: '我感到愉快', options: [{ text: '根本没有', score: 3 }, { text: '并不经常', score: 2 }, { text: '有时', score: 1 }, { text: '大多数', score: 0 }] }, { id: 'hads_q7', type: 'A', text: '我能够安闲而轻松地坐着', options: [{ text: '肯定', score: 0 }, { text: '经常', score: 1 }, { text: '并不经常', score: 2 }, { text: '根本没有', score: 3 }] }, { id: 'hads_q8', type: 'D', text: '我觉得自己行动和思维迟缓', options: [{ text: '几乎所有时候', score: 3 }, { text: '大多数时候', score: 2 }, { text: '有时', score: 1 }, { text: '根本没有', score: 0 }] }, { id: 'hads_q9', type: 'A', text: '我有一种心慌意乱的恐惧感', options: [{ text: '非常经常', score: 3 }, { text: '常常如此', score: 2 }, { text: '有时', score: 1 }, { text: '根本没有', score: 0 }] }, { id: 'hads_q10', type: 'D', text: '我对自己的仪容失去兴趣', options: [{ text: '肯定', score: 3 }, { text: '不大象以前那样注意了', score: 2 }, { text: '我也许不大注意了', score: 1 }, { text: '我还是象以前那样注意', score: 0 }] }, { id: 'hads_q11', type: 'A', text: '我感到心神不宁,坐立不安', options: [{ text: '肯定', score: 3 }, { text: '很经常', score: 2 }, { text: '不很经常', score: 1 }, { text: '根本没有', score: 0 }] }, { id: 'hads_q12', type: 'D', text: '我对未来充满希望', options: [{ text: '象以前一样', score: 0 }, { text: '比以前要少', score: 1 }, { text: '肯定比以前要少', score: 2 }, { text: '基本上没有', score: 3 }] }, { id: 'hads_q13', type: 'A', text: '我突然感到一阵惊恐', options: [{ text: '非常经常', score: 3 }, { text: '常常如此', score: 2 }, { text: '并不经常', score: 1 }, { text: '根本没有', score: 0 }] }, { id: 'hads_q14', type: 'D', text: '我能欣赏一本好书或一个好的广播或电视节目', options: [{ text: '经常', score: 0 }, { text: '有时', score: 1 }, { text: '不常', score: 2 }, { text: '很少', score: 3 }] }, ]
    },
   // 医疗满意度 ---
    'BREASTQ_PRO_info_surgeon': {
      title: '外科医生信息告知',
      stem: '对于您从乳腺外科医生处获得的关于下列问题的信息, 您的满意或不满意程度是:',
      description: `评估患者对于从乳腺外科医生处获得的关于手术方式选择、康复时间、可能并发症等关键信息的满意程度。\n\n${BREASTQ_SOURCE}`,
      optionStyle: 'default', resultStyle: 'breastq',
      options: [{ value: 1, label: '非常不满意' }, { value: 2, label: '有些不满意' }, { value: 3, label: '比较满意' }, { value: 4, label: '非常满意' }],
      questions: [ { id: 'bp_is_1', text: '根据手术方式您可能需要进行放疗?' }, { id: 'bp_is_2', text: '关于乳腺癌手术方式,您被给予的选择?' }, { id: 'bp_is_3', text: '使用两种手术方式中的一种,您可获得相同的生存?' }, { id: 'bp_is_4', text: '愈合和康复的时间?' }, { id: 'bp_is_5', text: '如果发现您的淋巴结有癌转移,治疗方案将会受到什么影响?' }, { id: 'bp_is_6', text: '恢复过程中预期会有多痛?' }, { id: 'bp_is_7', text: '可能的并发症?' }, { id: 'bp_is_8', text: '如何使肿瘤的复发概率相同?' }, { id: 'bp_is_9', text: '保乳术后乳房您可以预期的样子?' }, { id: 'bp_is_10', text: '保乳后的疤痕会看起来如何?' }, { id: 'bp_is_11', text: '保乳后的乳房预期大小如何?' }, { id: 'bp_is_12', text: '保乳后的乳房预期形状如何?' } ],
      conversionTable: { 12:0, 13:8, 14:15, 15:20, 16:24, 17:27, 18:30, 19:33, 20:35, 21:37, 22:38, 23:40, 24:42, 25:43, 26:45, 27:46, 28:47, 29:49, 30:50, 31:51, 32:53, 33:54, 34:55, 35:57, 36:58, 37:60, 38:62, 39:64, 40:66, 41:68, 42:71, 43:73, 44:76, 45:80, 46:85, 47:91, 48:100 }
    },
    'BREASTQ_PRO_satisfaction_surgeon': {
      title: '外科医生满意度',
      stem: '这些问题是关于您的乳腺外科医生。您是否感觉到他/她:',
      description: `评估患者对其乳腺外科医生的专业性、沟通能力、同理心以及整体服务体验的满意程度。\n\n${BREASTQ_SOURCE}`,
      optionStyle: 'default', resultStyle: 'breastq',
      options: [{ value: 1, label: '完全不同意' }, { value: 2, label: '部分不同意' }, { value: 3, label: '部分同意' }, { value: 4, label: '非常同意' }],
      questions: [ { id: 'bp_ss_1', text: '是专业的?' }, { id: 'bp_ss_2', text: '给您信心?' }, { id: 'bp_ss_3', text: '参与到您的决策过程?' }, { id: 'bp_ss_4', text: '是使您安心的?' }, { id: 'bp_ss_5', text: '回答了您所有的问题?' }, { id: 'bp_ss_6', text: '使您感到舒适?' }, { id: 'bp_ss_7', text: '是考虑周全的?' }, { id: 'bp_ss_8', text: '是容易交流的?' }, { id: 'bp_ss_9', text: '理解您的需求?' }, { id: 'bp_ss_10', text: '是心思细腻的?' }, { id: 'bp_ss_11', text: '留出时间解释您的顾虑?' }, { id: 'bp_ss_12', text: '当您有顾虑时能找到他/她?' } ],
      conversionTable: { 12:0, 13:13, 14:18, 15:22, 16:25, 17:27, 18:29, 19:31, 20:33, 21:35, 22:36, 23:38, 24:39, 25:41, 26:42, 27:44, 28:45, 29:46, 30:48, 31:50, 32:51, 33:53, 34:55, 35:57, 36:59, 37:61, 38:63, 39:65, 40:67, 41:70, 42:72, 43:75, 44:78, 45:82, 46:86, 47:92, 48:100 }
    },
    'BREASTQ_PRO_info_radiation': {
      title: '放疗科医生信息告知',
      stem: '对于您从放疗科医生处获得的关于下列问题的信息, 您的满意或不满意程度是:',
      description: `评估患者对于从放疗科医生处获得的关于放疗流程、皮肤保护、潜在副作用等关键信息的满意程度。\n\n${BREASTQ_SOURCE}`,
      optionStyle: 'default', resultStyle: 'breastq',
      options: [{ value: 1, label: '非常不满意' }, { value: 2, label: '有些不满意' }, { value: 3, label: '比较满意' }, { value: 4, label: '非常满意' }],
      questions: [ { id: 'bp_ir_1', text: '每次放疗需要多少时间?' }, { id: 'bp_ir_2', text: '每次放疗您的体位姿势?' }, { id: 'bp_ir_3', text: '为什么保乳后您需要放疗?' }, { id: 'bp_ir_4', text: '您乳房多大区域会被放疗?' }, { id: 'bp_ir_5', text: '放射线是什么感觉?' }, { id: 'bp_ir_6', text: '在放疗过程中如何保护您的皮肤?' }, { id: 'bp_ir_7', text: '可能最后会再乳房上留下永久性的印记?' }, { id: 'bp_ir_8', text: '总体上在放疗治疗中,您会感到多大程度的疲劳感?' }, { id: 'bp_ir_9', text: '长期来看,放疗可能如何改变您的皮肤?' }, { id: 'bp_ir_10', text: '长期来看,放疗可能如何改变您的乳房外观?' }, { id: 'bp_ir_11', text: '放疗可能产生的后续的潜在问题?' } ],
      conversionTable: { 11:0, 12:18, 13:23, 14:26, 15:29, 16:31, 17:33, 18:35, 19:37, 20:38, 21:40, 22:41, 23:42, 24:44, 25:45, 26:46, 27:48, 28:49, 29:50, 30:52, 31:53, 32:55, 33:56, 34:58, 35:60, 36:62, 37:64, 38:67, 39:70, 40:73, 41:77, 42:82, 43:90, 44:100 }
    },
    'BREASTQ_PRO_satisfaction_medical_team': {
      title: '医疗团队满意度',
      stem: '这些问题是关于医疗团队中除外科医生以外的其他成员(例如:保乳手术当天,照顾您的护士和其他医生), 你是否感觉到他们:',
      description: `评估患者对医疗团队中除外科医生以外的其他成员（如护士、其他医生）在专业性、尊重和关怀方面的满意程度。\n\n${BREASTQ_SOURCE}`,
      optionStyle: 'default', resultStyle: 'breastq',
      options: [{ value: 1, label: '完全不同意' }, { value: 2, label: '部分不同意' }, { value: 3, label: '部分同意' }, { value: 4, label: '非常同意' }],
      questions: [ { id: 'bp_smt_1', text: '是专业的?' }, { id: 'bp_smt_2', text: '尊重您?' }, { id: 'bp_smt_3', text: '是有学识的?' }, { id: 'bp_smt_4', text: '是友好善良的?' }, { id: 'bp_smt_5', text: '使您感到舒适?' }, { id: 'bp_smt_6', text: '是考虑周全的?' }, { id: 'bp_smt_7', text: '留出时间解释您的顾虑?' } ],
      conversionTable: { 7:0, 8:13, 9:19, 10:23, 11:27, 12:30, 13:34, 14:37, 15:40, 16:43, 17:46, 18:49, 19:53, 20:57, 21:61, 22:66, 23:70, 24:75, 25:80, 26:85, 27:91, 28:100 }
    },
    'BREASTQ_PRO_satisfaction_office_staff': {
      title: '其他工作人员满意度',
      stem: '这些问题是关于其他工作人员(例如:秘书)。你是否感觉到他们:',
      description: `评估患者对诊所或医院中其他工作人员（如秘书、接待员）在服务专业性、友好度和关怀方面的满意程度。\n\n${BREASTQ_SOURCE}`,
      optionStyle: 'default', resultStyle: 'breastq',
      options: [{ value: 1, label: '完全不同意' }, { value: 2, label: '部分不同意' }, { value: 3, label: '部分同意' }, { value: 4, label: '非常同意' }],
      questions: [ { id: 'bp_sos_1', text: '是专业的?' }, { id: 'bp_sos_2', text: '尊重您?' }, { id: 'bp_sos_3', text: '是有学识的?' }, { id: 'bp_sos_4', text: '是友好善良的?' }, { id: 'bp_sos_5', text: '使您感到舒适?' }, { id: 'bp_sos_6', text: '是考虑周全的?' }, { id: 'bp_sos_7', text: '留出时间解释您的顾虑?' } ],
      conversionTable: { 7:0, 8:11, 9:17, 10:21, 11:25, 12:28, 13:32, 14:36, 15:39, 16:42, 17:46, 18:49, 19:53, 20:57, 21:63, 22:68, 23:73, 24:77, 25:82, 26:87, 27:93, 28:100 }
  },
   // --- [新增] BCTOS-12 基础表单 ---
   'BCTOS_12': {
    title: '保乳手术双侧差异对比量表',
    stem: '您好，请根据您最近一周内的亲身感受，请您比较接受治疗的一侧（患侧，即接受手术和/或放疗的一侧）与未接受治疗的另一侧（健侧），根据您感受到的差异程度，在最符合您情况的数字点圈。',
    description: '该量表由德国学者 Joerg Heil 于 2010 年引进，后由海德堡大学 Andre Hennigs 教授于 2018 年对其进行简化改进，形成 12 个条目的简化版 BCTOS-12 量表，旨在探讨保乳手术后的美学和功能结果与生活质量的关系。',
    optionStyle: 'default', // BCTOS 的选项样式与 BREAST-Q 类似
    resultStyle: 'bctos',   // [新增] 为 BCTOS 定义一个专属的结果样式
    options: [
        { value: 1, label: '无差异' },
        { value: 2, label: '小差异' },
        { value: 3, label: '中等差异' },
        { value: 4, label: '大差异' }
    ],
    questions: [
      // A. 乳房美学状态 (BCTOS-AE) - 8项
      { id: 'AE1', text: '与健侧相比，患侧乳房的质地（如硬块感、发紧感）差异' },
      { id: 'AE2', text: '与健侧相比，患侧乳头的外观（如形状、位置、颜色）差异' },
      { id: 'AE3', text: '与健侧相比，患侧乳房的整体形状（如轮廓、饱满度）差异' },
      { id: 'AE4', text: '与健侧相比，患侧手术疤痕的状况（如外观、感觉）差异' },
      { id: 'AE5', text: '与健侧相比，患侧乳房的肿胀感或水肿差异' },
      { id: 'AE6', text: '与健侧相比，患侧在穿戴胸罩时的贴合度差异' },
      { id: 'AE7', text: '与健侧相比，患侧乳房皮肤的感觉（如麻木、过敏、异样感）差异' },
      { id: 'AE8', text: '与健侧相比，患侧乳房在触摸或按压时的疼痛或不适感差异' },
      // B. 功能状态 (BCTOS-FS) - 4项
      { id: 'FS1', text: '与健侧相比，患侧手臂的沉重感或下坠感差异' },
      { id: 'FS2', text: '与健侧相比，患侧肩关节的活动不适（如活动范围受限、僵硬感）差异' },
      { id: 'FS3', text: '与健侧相比，患侧手臂的不适感（如酸痛、无力）差异' },
      { id: 'FS4', text: '与健侧相比，患侧手臂的肿胀或淋巴水肿差异' }
    ]
  },
  // --- [新增] 癌症复发担忧量表 (FCRI-SF) ---
  'FCRI_SF': {
    title: '癌症复发担忧量表简版 (FCRI-SF)',
    stem: '请仔细阅读以下每个陈述，并根据您在过去一个月的实际感受，选择最符合您情况的选项。',
    description: '癌症复发担忧量表简版（Fear of Cancer Recurrence Inventory-Short Form, FCRI-SF）是目前国际上广泛应用于临床和研究领域，用以评估癌症幸存者复发担忧严重程度的权威工具之一。它专门用于评估与癌症复发相关的侵入性思想的存在和严重性，帮助幸存者和临床医生快速识别复发担忧是否达到了需要关注或干预的水平。',
    optionStyle: 'default',
    resultStyle: 'fcri', // 定义专属结果样式
    options: [
        { value: 0, label: '完全没有' },
        { value: 1, label: '一点点' },
        { value: 2, label: '有一些' },
        { value: 3, label: '很多' },
        { value: 4, label: '非常多' }
    ],
    questions: [
      { id: 'q1', text: '我为癌症复发的可能性感到担忧或焦虑。' },
      { id: 'q2', text: '我害怕癌症复发。' },
      { id: 'q3', text: '我认为为癌症复发的可能性感到担忧或焦虑是正常的。' },
      { id: 'q4', text: '当想到癌症复发的可能性时，会引发我不愉快的想法或画面（例如死亡、痛苦、对家人的影响）。' },
      { id: 'q5', text: '我相信我已经痊愈，癌症不会再复发。（此题为反向计分）', reverse: true },
      { id: 'q6', text: '在我看来，我有癌症复发的风险吗？' },
      { id: 'q7', text: '我多久会想到一次癌症复发的可能性？' },
      { id: 'q8', text: '我每天花多少时间思考癌症复发的可能性？' },
      { id: 'q9', text: '我思考癌症复发的可能性有多久了？' }
    ]
  },

  // --- [新增] 决定后悔量表 (RDS) ---
  'RDS': {
    title: '乳腺癌保乳手术决定后悔量表 (RDS)',
    stem: '请仔细阅读以下5个陈述句，并根据您对“接受保乳手术”这一决定的真实感受，选择最符合您情况的选项。',
    description: '本量表（Decision Regret Scale, RDS）由 Brehaut, O\'Connor 等人开发，用于测量个体在做出健康相关决定后的后悔程度。它是一个简短、可靠且有效的工具。\n\n原始文献: Brehaut JC, O\'Connor AM, Wood TJ, et al. Validation of a decision regret scale. Med Decis Making. 2003;23(4):281-292.',
    optionStyle: 'rds', // RDS 选项文本特殊，定义专属样式
    resultStyle: 'rds',
    questions: [
      { id: 'q1', text: '接受保乳手术，是一个正确的决定。', options: [{ value: 1, label: '非常正确' }, { value: 2, label: '正确' }, { value: 3, label: '不确定' }, { value: 4, label: '不正确' }, { value: 5, label: '非常不正确' }] },
      { id: 'q2', text: '我后悔做出了这个选择。', reverse: true, options: [{ value: 1, label: '非常后悔' }, { value: 2, label: '后悔' }, { value: 3, label: '不确定' }, { value: 4, label: '不后悔' }, { value: 5, label: '非常不后悔' }] },
      { id: 'q3', text: '如果再选一次，我还是会做同样的选择。', options: [{ value: 1, label: '非常同意' }, { value: 2, label: '同意' }, { value: 3, label: '不确定' }, { value: 4, label: '不同意' }, { value: 5, label: '非常不同意' }] },
      { id: 'q4', text: '这个选择给我带来了很多伤害。', reverse: true, options: [{ value: 1, label: '非常同意' }, { value: 2, label: '同意' }, { value: 3, label: '不确定' }, { value: 4, label: '不同意' }, { value: 5, label: '非常不同意' }] },
      { id: 'q5', text: '这个决定是明智的。', options: [{ value: 1, label: '非常明智' }, { value: 2, label: '明智' }, { value: 3, label: '不确定' }, { value: 4, label: '不明智' }, { value: 5, label: '非常不明智' }] } 
    ]}
} 