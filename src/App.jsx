import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, ExternalLink, Activity, Award, BookOpen, FolderHeart, Plus, X, Save, Link as LinkIcon, FileText, Copy, Check, RefreshCw, Sparkles, Search, ChevronRight } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// ==========================================
// ⚠️ 医生请注意：部署前必须在此处填入您的配置！
// ==========================================

// 1. 请将这里替换为您自己在 Firebase 控制台获取的 Config 参数
const firebaseConfig = {
  apiKey: "AIzaSyBwJEKG-6YgtSEJnImeLg01p2BzO6tLF-s",
  authDomain: "breast-cancer-nav.firebaseapp.com",
  projectId: "breast-cancer-nav",
  storageBucket: "breast-cancer-nav.firebasestorage.app",
  messagingSenderId: "749039838077",
  appId: "1:749039838077:web:94b31b7b9bf09401cde214",
  measurementId: "G-NX2RT69736"
};

// 2. 如果您需要使用“AI智能更新日程”功能，请在 Vercel 环境变量中填入 DEEPSEEK_API_KEY
// 请先注册 DeepSeek 并获取 API Key：https://platform.deepseek.com/
const DEEPSEEK_API_KEY = "在这里填入您的 API Key (仅用于本地调试)"; 

// ==========================================

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);

// 会议静态数据
const conferenceData = [
  {
    id: 'esmo-breast-2026', shortName: 'ESMO Breast 2026', fullName: '欧洲肿瘤内科学会乳腺癌大会',
    date: '2026-05-13 至 05-15 (预计)', location: '欧洲 (待定)', url: 'https://www.esmo.org/',
    status: 'upcoming', year: 2026, tags: ['欧洲前沿', 'ADC药物', '转化医学'],
    description: '欧洲专门针对乳腺癌的顶级学术会议，近年来新型靶向和免疫治疗数据分量极重。'
  },
  {
    id: 'asco-2026', shortName: 'ASCO 2026', fullName: '美国临床肿瘤学会年会',
    date: '2026-05-29 至 06-02', location: '美国, 芝加哥', url: 'https://conferences.asco.org/',
    status: 'upcoming', year: 2026, tags: ['综合性', '重磅研究', '改变指南'],
    description: '全球规模最大的肿瘤学盛会，通常会公布改变临床实践的 III 期临床结果。'
  },
  {
    id: 'esmo-2026', shortName: 'ESMO 2026', fullName: '欧洲肿瘤内科学会年会',
    date: '2026-10 (预计)', location: '待定', url: 'https://www.esmo.org/',
    status: 'upcoming', year: 2026, tags: ['综合性', '欧洲指南', '晚期乳腺癌'],
    description: '综合性肿瘤大会，每年秋季举行，重磅 LBA 密集发布的舞台。'
  },
  {
    id: 'sabcs-2026', shortName: 'SABCS 2026', fullName: '圣安东尼奥乳腺癌研讨会',
    date: '2026-12-08 至 12-12 (预计)', location: '美国, 圣安东尼奥', url: 'https://www.sabcs.org/',
    status: 'upcoming', year: 2026, tags: ['最高权威', '全领域', '年度总结'],
    description: '全球最大、最具影响力的乳腺癌专属会议，涵盖基础到临床所有层面。'
  },
  {
    id: 'stgallen-2027', shortName: 'St. Gallen 2027', fullName: '圣加仑国际早期乳腺癌大会',
    date: '2027-03 (预计)', location: '奥地利, 维也纳 (预计)', url: 'https://www.oncoconferences.ch/sgbcc',
    status: 'upcoming', year: 2027, tags: ['两年一届', '早期乳腺癌', '专家共识'],
    description: '以发布早期乳腺癌国际专家共识指南闻名，指导日常临床实践。'
  },
  {
    id: 'sabcs-2025', shortName: 'SABCS 2025', fullName: '第48届圣安东尼奥乳腺癌研讨会',
    date: '2025-12-09 至 12-12', location: '美国, 圣安东尼奥', url: 'https://sabcs.org/',
    status: 'past', year: 2025, tags: ['权威发布', '年度最重磅'],
    description: '发布了多项新型内分泌治疗及下一代 ADC 药物在晚期乳腺癌中的突破性数据。'
  },
  {
    id: 'esmo-breast-2025', shortName: 'ESMO Breast 2025', fullName: '2025 ESMO 乳腺癌大会',
    date: '2025-05-14 至 05-17', location: '德国, 慕尼黑', url: 'https://www.esmo.org/meeting-calendar/esmo-breast-cancer-2025',
    status: 'past', year: 2025, tags: ['ctDNA', '年轻乳腺癌', '免疫治疗'],
    description: '重点讨论了 ctDNA 的临床应用及免疫疗法和 ADC 在早中期乳腺癌中的演变。'
  },
  {
    id: 'stgallen-2025', shortName: 'St. Gallen 2025', fullName: '第19届圣加仑早期乳腺癌大会',
    date: '2025-03-12 至 03-15', location: '奥地利, 维也纳', url: 'https://www.oncoconferences.ch/sgbcc',
    status: 'past', year: 2025, tags: ['专家共识', '降阶梯治疗'],
    description: '更新了2025版早期乳腺癌诊疗共识，探讨了“降阶梯”与“升阶梯”策略。'
  },
  {
    id: 'sabcs-2024', shortName: 'SABCS 2024', fullName: '第47届圣安东尼奥乳腺癌研讨会',
    date: '2024-12-10 至 12-13', location: '美国, 圣安东尼奥', url: 'https://breastcancer.knowledgehub.wiley.com/sabcs-2024/',
    status: 'past', year: 2024, tags: ['历史经典', '新型靶点'],
    description: '确立了多款新药在特定分型乳腺癌（如 HER2 低表达）中的标准治疗地位。'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [conferences, setConferences] = useState(conferenceData);
  const [isUpdatingDates, setIsUpdatingDates] = useState(false);
  const [user, setUser] = useState(null);
  const [materials, setMaterials] = useState({});
  const [updateError, setUpdateError] = useState(null); // 修改为存储错误信息字符串

  const [editingConf, setEditingConf] = useState(null);
  const [tempNotes, setTempNotes] = useState('');
  const [tempLinks, setTempLinks] = useState([]);
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const copyTextAreaRef = useRef(null);

  useEffect(() => {
    // 真实部署环境使用匿名登录
    signInAnonymously(auth).catch((error) => console.error("Auth error:", error));
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    // 真实部署环境中，直接存入该用户的集合下
    const materialsRef = collection(db, 'users', user.uid, 'conference_materials');
    const unsubscribe = onSnapshot(materialsRef, (snapshot) => {
      const data = {};
      snapshot.forEach((doc) => { data[doc.id] = doc.data(); });
      setMaterials(data);
    }, (error) => console.error("Error fetching materials:", error));
    return () => unsubscribe();
  }, [user]);

  const openSheet = (conf) => {
    setEditingConf(conf);
    const existingData = materials[conf.id] || { notes: '', links: [] };
    setTempNotes(existingData.notes || '');
    setTempLinks(existingData.links || []);
    setNewLinkTitle('');
    setNewLinkUrl('');
    document.body.style.overflow = 'hidden';
  };

  const closeSheet = () => {
    setEditingConf(null);
    document.body.style.overflow = 'auto';
  };

  const handleAddLink = () => {
    if (!newLinkTitle.trim() || !newLinkUrl.trim()) return;
    let urlToSave = newLinkUrl.trim();
    if (!urlToSave.startsWith('http://') && !urlToSave.startsWith('https://')) {
      urlToSave = 'https://' + urlToSave;
    }
    setTempLinks([...tempLinks, { title: newLinkTitle.trim(), url: urlToSave }]);
    setNewLinkTitle('');
    setNewLinkUrl('');
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...tempLinks];
    updatedLinks.splice(index, 1);
    setTempLinks(updatedLinks);
  };

  const handleSaveMaterials = async () => {
    if (!user || !editingConf) return;
    setIsSaving(true);
    try {
      const docRef = doc(db, 'users', user.uid, 'conference_materials', editingConf.id);
      await setDoc(docRef, { notes: tempNotes, links: tempLinks, updatedAt: new Date().toISOString() }, { merge: true });
      closeSheet();
    } catch (error) { console.error("Error saving materials:", error); }
    finally { setIsSaving(false); }
  };

  const handleUpdateDates = async () => {
    setIsUpdatingDates(true);
    setUpdateError(null);

    try {
      const promptText = `现在是2026年。请以专家身份搜索并核实以下乳腺癌会议的最新召开时间和地点：
      ${conferences.map(c => c.shortName).join(', ')}。
      如果尚未官宣，请根据惯例预估并标注“(预计)”。请严格按照 JSON 格式返回，包含一个名为 "conferences" 的数组。`;

      const payload = {
        messages: [{ role: "user", content: promptText }]
      };

      let response;
      let attempt = 0;
      const delays = [1000, 2000, 4000];

      while (attempt < 3) {
        try {
          // 本地开发模式下尝试直连 DeepSeek (如果网络允许)，线上通过 Vercel Proxy
          const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
          const apiUrl = isLocal 
            ? `https://api.deepseek.com/chat/completions` 
            : `/api/ai`;

          response = await fetch(apiUrl, {
            method: 'POST', 
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            }, 
            body: JSON.stringify(isLocal ? { ...payload, model: "deepseek-chat", response_format: { type: 'json_object' } } : payload)
          });
          if (response.ok) break;
        } catch (e) {
          console.error(`Attempt ${attempt + 1} failed:`, e);
        }
        if (attempt < 2) await new Promise(r => setTimeout(r, delays[attempt]));
        attempt++;
      }

      if (!response || !response.ok) {
        const status = response ? response.status : "Network Error";
        const msg = `AI 服务请求失败 (状态码: ${status})。请检查 Vercel 环境变量 (DEEPSEEK_API_KEY) 是否已设置。`;
        setUpdateError(msg);
        throw new Error(msg);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (content) {
        const parsedData = JSON.parse(content);
        const updates = parsedData.conferences || [];
        let updatedCount = 0;
        setConferences(prev => prev.map(conf => {
          const update = updates.find(u => u.shortName === conf.shortName);
          if (update && (update.date !== conf.date || update.location !== conf.location)) {
            updatedCount++;
            return { ...conf, date: update.date, location: update.location };
          }
          return conf;
        }));
        
        alert(`智能更新完成！共更新了 ${updatedCount} 场会议的日程信息。`);
      }
    } catch (error) {
      console.error("更新会议信息时出错:", error);
      let errorMsg = error.message || "未知错误";
      if (errorMsg === "Failed to fetch") {
        errorMsg = "网络请求被拦截 (Failed to fetch)。这通常是由于 VPN 未开启（本地测试）或 域名解析/SSL 问题（线上测试）导致。";
      }
      if (!updateError) setUpdateError(errorMsg);
    } finally {
      setIsUpdatingDates(false);
    }
  };

  const handleCopyToObsidian = () => {
    if (!editingConf) return;
    const tags = editingConf.tags.map(tag => `#${tag.replace(/\s+/g, '_')}`).join(' ');
    let markdownContent = `---\ntype: conference\nstatus: ${editingConf.status}\nyear: ${editingConf.year}\n---\n# ${editingConf.shortName} - ${editingConf.fullName}\n\n📍 **地点:** ${editingConf.location}\n📅 **时间:** ${editingConf.date}\n🔗 **官网:** [访问链接](${editingConf.url})\n🏷️ **标签:** ${tags}\n\n## 📋 会议简介\n> ${editingConf.description}\n\n## 📝 我的笔记\n${tempNotes ? tempNotes : '*暂无笔记*'}\n\n## 📎 关联资料\n`;
    if (tempLinks && tempLinks.length > 0) {
      tempLinks.forEach(link => { markdownContent += `- [${link.title}](${link.url})\n`; });
    } else { markdownContent += '*暂无外部链接*\n'; }

    if (copyTextAreaRef.current) {
      copyTextAreaRef.current.value = markdownContent;
      copyTextAreaRef.current.select();
      try {
        document.execCommand('copy');
        setCopiedSuccess(true);
        setTimeout(() => setCopiedSuccess(false), 2000);
      } catch (err) { console.error('复制失败', err); }
    }
  };

  const filteredData = conferences.filter(conf => conf.status === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 mx-auto max-w-lg shadow-xl relative pb-8">

      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-rose-100 p-1.5 rounded-lg"><Activity className="w-5 h-5 text-rose-600" /></div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">乳腺癌会议导航</h1>
        </div>

        <button
          onClick={handleUpdateDates}
          disabled={isUpdatingDates}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors text-sm font-medium"
          title="AI 联网智能更新日程"
        >
          {isUpdatingDates ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>更新</span>
        </button>
      </div>

      {updateError && (
        <div className="bg-red-50 text-red-600 text-xs px-4 py-2 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold">AI 更新失败</span>
            <span>{updateError}</span>
          </div>
          <button onClick={() => setUpdateError(null)}><X className="w-3 h-3" /></button>
        </div>
      )}

      <div className="px-4 py-3 bg-white">
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button onClick={() => setActiveTab('upcoming')} className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${activeTab === 'upcoming' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'}`}>近期预告</button>
          <button onClick={() => setActiveTab('past')} className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${activeTab === 'past' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>历史资料</button>
        </div>
      </div>

      <div className="px-4 space-y-4 mt-2">
        {filteredData.map((conf) => {
          const confMaterials = materials[conf.id];
          const hasData = (confMaterials?.notes?.trim().length > 0) || (confMaterials?.links?.length > 0);

          return (
            <div key={conf.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className={`h-1 w-full ${conf.status === 'upcoming' ? 'bg-gradient-to-r from-rose-400 to-orange-400' : 'bg-slate-300'}`} />

              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="pr-2">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${conf.status === 'upcoming' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'}`}>{conf.year}</span>
                      {conf.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="text-[10px] text-slate-400 border border-slate-100 px-1.5 py-0.5 rounded-md">{tag}</span>
                      ))}
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 leading-tight">{conf.shortName}</h2>
                    <h3 className="text-xs text-slate-500 mt-0.5 line-clamp-1">{conf.fullName}</h3>
                  </div>
                  {conf.shortName.includes('SABCS') ? <Award className="text-amber-500 w-8 h-8 opacity-20 shrink-0" /> : <BookOpen className="text-indigo-400 w-8 h-8 opacity-20 shrink-0" />}
                </div>

                <div className="bg-slate-50 rounded-xl p-3 mb-3 space-y-2">
                  <div className="flex items-center text-xs text-slate-700 font-medium">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-400 shrink-0" />{conf.date}
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <MapPin className="w-4 h-4 mr-2 text-rose-400 shrink-0" />{conf.location}
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">{conf.description}</p>

                <div className="flex items-center overflow-x-auto pb-2 mb-2 scrollbar-hide gap-2 border-b border-slate-50">
                  <span className="text-[10px] text-slate-400 flex items-center shrink-0">
                    <Search className="w-3 h-3 mr-1" /> 检索
                  </span>
                  <a href={`https://cn.bing.com/search?q=${encodeURIComponent(conf.shortName + ' dates location official')}`} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[10px] font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded-full">Bing</a>
                  <a href={`https://www.baidu.com/s?wd=${encodeURIComponent(conf.shortName + ' 会议 时间 地点')}`} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[10px] font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded-full">Baidu</a>
                  <a href={`https://weixin.sogou.com/weixin?type=2&query=${encodeURIComponent(conf.shortName)}`} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[10px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-2.5 py-1 rounded-full">微信文章</a>
                </div>

                <div className="flex gap-2 mt-1">
                  <a href={conf.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 active:bg-slate-200">
                    官网 <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                  <button onClick={() => openSheet(conf)} className={`flex-[2] flex items-center justify-center py-2.5 rounded-xl text-xs font-semibold active:opacity-80 transition-all ${hasData ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' : 'bg-white border border-slate-200 text-slate-700'}`}>
                    <FolderHeart className={`w-3.5 h-3.5 mr-1.5 ${hasData ? 'text-indigo-200' : 'text-slate-400'}`} />
                    {hasData ? '我的资料库' : '添加资料/笔记'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <textarea ref={copyTextAreaRef} style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true" />

      {editingConf && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={closeSheet}>
          <div className="bg-white w-full sm:max-w-md h-[85vh] sm:h-auto sm:max-h-[85vh] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

            <div className="flex items-center justify-between px-5 pt-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{editingConf.shortName}</h3>
                <p className="text-[10px] text-slate-500">云端资料库</p>
              </div>
              <button onClick={closeSheet} className="p-2 bg-slate-100 text-slate-500 rounded-full active:bg-slate-200"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 space-y-6">
              <div>
                <label className="flex items-center text-sm font-bold text-slate-700 mb-2">
                  <FileText className="w-4 h-4 mr-2 text-indigo-500" />重点笔记
                </label>
                <textarea
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[100px] resize-y"
                  placeholder="记录临床感悟或科室讨论..."
                  value={tempNotes} onChange={(e) => setTempNotes(e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-bold text-slate-700 mb-2">
                  <LinkIcon className="w-4 h-4 mr-2 text-emerald-500" />网盘/文献链接
                </label>

                {tempLinks.length > 0 && (
                  <ul className="mb-4 space-y-2">
                    {tempLinks.map((link, idx) => (
                      <li key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-indigo-600 truncate max-w-[85%]">
                          <span className="truncate">{link.title}</span><ChevronRight className="w-3 h-3 ml-1 shrink-0 opacity-50" />
                        </a>
                        <button onClick={() => handleRemoveLink(idx)} className="p-1.5 text-slate-400 active:text-red-500 bg-white rounded-md shadow-sm border border-slate-100"><X className="w-3.5 h-3.5" /></button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <input type="text" placeholder="标题 (如: SABCS 解读PPT)" className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={newLinkTitle} onChange={(e) => setNewLinkTitle(e.target.value)} />
                  <div className="flex gap-2">
                    <input type="url" placeholder="粘贴网页或网盘URL" className="flex-1 p-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} />
                    <button onClick={handleAddLink} disabled={!newLinkTitle.trim() || !newLinkUrl.trim()} className="px-4 bg-emerald-100 text-emerald-700 font-bold rounded-lg disabled:opacity-50 active:bg-emerald-200"><Plus className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white space-y-2 pb-6 sm:pb-4">
              <button onClick={handleSaveMaterials} disabled={isSaving} className="w-full py-3.5 text-sm font-bold text-white bg-indigo-600 active:bg-indigo-700 rounded-xl shadow-sm transition-all flex items-center justify-center disabled:opacity-70">
                {isSaving ? <><Activity className="w-5 h-5 mr-2 animate-spin" /> 保存中...</> : <><Save className="w-5 h-5 mr-2" /> 保存至云端</>}
              </button>

              <button onClick={handleCopyToObsidian} className={`w-full py-3.5 text-sm font-bold rounded-xl flex items-center justify-center border transition-all ${copiedSuccess ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-700 border-slate-200 active:bg-slate-50'}`}>
                {copiedSuccess ? <><Check className="w-5 h-5 mr-2" /> 已复制至剪贴板</> : <><Copy className="w-5 h-5 mr-2 text-indigo-500" /> 导出到 Obsidian (MD)</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
