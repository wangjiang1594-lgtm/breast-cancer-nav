// 前端 API 客户端：调用 CloudBase HTTP 云函数 web-api（与小程序同云环境，数据打通）
// 部署后把绑定的 HTTP 访问服务地址填到 .env 的 VITE_WEB_API_URL
const defaultApiUrl =
  "https://cloud1-2gel0kpz50ce528a-1373389857.ap-shanghai.app.tcloudbase.com/web-api";

const apiUrl = import.meta.env.VITE_WEB_API_URL || defaultApiUrl;

async function request(action, payload = {}) {
  let res;
  try {
    res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...payload }),
    });
  } catch {
    throw new Error("网络异常，请检查网络后重试");
  }
  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("服务响应异常");
  }
  if (!res.ok || data.success === false) {
    throw new Error(data.message || "请求失败");
  }
  return data;
}

// 患者侧
export const login = (id4, initials) => request("login", { id4, initials });
export const submitAnswer = (payload) => request("submitAnswer", payload);
export const getPlanProgress = (identifier, planId) =>
  request("getPlanProgress", { identifier, planId });
export const getMyStartedPlans = (identifier) =>
  request("getMyStartedPlans", { identifier });

// 管理侧
export const adminVerifyPin = (pin) => request("verifyPin", { pin });
export const adminAddPatient = (pin, id4, initials, label) =>
  request("addPatient", { pin, id4, initials, label });
export const adminListPatients = (pin) => request("listPatients", { pin });

// AI
export const aiAsk = (title, description, question) =>
  request("aiAsk", { title, description, question });

// ---- 会话存储（identifier）----
const SESSION_KEY = "rjzwx_identifier";
export const saveSession = (identifier, label) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify({ identifier, label }));
export const loadSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
};
export const clearSession = () => localStorage.removeItem(SESSION_KEY);
