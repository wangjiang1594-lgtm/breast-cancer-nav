import { useState } from "react";
import { loadSession, clearSession } from "./api.js";
import Login from "./views/Login.jsx";
import Plans from "./views/Plans.jsx";
import Timeline from "./views/Timeline.jsx";
import Questionnaire from "./views/Questionnaire.jsx";
import Admin from "./views/Admin.jsx";

export default function App() {
  const [session, setSession] = useState(loadSession);
  // route: { name: 'plans'|'timeline'|'questionnaire', params }
  const [route, setRoute] = useState({ name: "plans", params: {} });
  const [showAdmin, setShowAdmin] = useState(false);

  // 未登录
  if (!session) {
    if (showAdmin) return <Admin onBack={() => setShowAdmin(false)} />;
    return (
      <Login
        onLogin={(s) => {
          setSession(s);
          setRoute({ name: "plans", params: {} });
        }}
        onAdmin={() => setShowAdmin(true)}
      />
    );
  }

  const logout = () => {
    clearSession();
    setSession(null);
    setShowAdmin(false);
  };

  const go = (name, params = {}) => setRoute({ name, params });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <button className="text-base font-bold text-gray-800" onClick={() => go("plans")}>
          乳甲自我行
        </button>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="font-mono">{session.identifier}</span>
          <button className="text-gray-400 hover:text-red-500" onClick={logout}>
            退出
          </button>
        </div>
      </header>

      {route.name === "plans" && (
        <Plans session={session} onOpenPlan={(planId) => go("timeline", { planId })} />
      )}

      {route.name === "timeline" && (
        <Timeline
          session={session}
          planId={route.params.planId}
          onStartQuestionnaire={(ctx) => go("questionnaire", ctx)}
        />
      )}

      {route.name === "questionnaire" && (
        <Questionnaire
          session={session}
          context={route.params}
          onDone={() => go("timeline", { planId: route.params.planId })}
          onCancel={() => go("timeline", { planId: route.params.planId })}
        />
      )}
    </div>
  );
}
