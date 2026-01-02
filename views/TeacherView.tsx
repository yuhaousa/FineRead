
import React from 'react';

const TeacherView: React.FC = () => {
  const classStats = [
    { label: '人均每日用时', value: '22.5 min', change: '+2.1%', color: 'text-indigo-600' },
    { label: '任务完成率', value: '92%', change: '+5%', color: 'text-emerald-600' },
    { label: '平均 PISA 得分', value: '78.4', change: '-1.2%', color: 'text-amber-600' },
    { label: '互动活跃度', value: '86%', change: '+12%', color: 'text-purple-600' },
  ];

  const studentIssues = [
    { name: '王同学', issue: 'R4 批判性评价能力连续 3 天处于低分段。', action: '分配引导练习', type: 'urgent' },
    { name: '李同学', issue: '主旨概括倾向于过度引用原文，缺乏提炼。', action: '发起 AI 追问', type: 'warning' },
    { name: '初一（3）班', issue: '整体对“因果推论”理解存在误区。', action: '生成讲评建议', type: 'info' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {classStats.map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <div className="flex justify-between items-end">
              <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Class Insight Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">班级能力分布 (PISA)</h2>
              <button className="text-indigo-600 text-sm font-semibold hover:underline">查看详细报表</button>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'R1 获取信息', value: 95, color: 'bg-indigo-500' },
                { label: 'R2 直接推论', value: 78, color: 'bg-emerald-500' },
                { label: 'R3 整合与解释', value: 65, color: 'bg-amber-500' },
                { label: 'R4 评价与批判', value: 42, color: 'bg-rose-500' },
              ].map(item => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-700">{item.label}</span>
                    <span className="text-slate-500">{item.value}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-slate-50 rounded-2xl space-y-3">
              <div className="flex items-center space-x-2 text-indigo-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-bold text-sm">AI 讲评建议</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                本周学生在《荷塘月色》练习中，R4 能力得分较低。建议下周二的阅读课重点分析“评价理由的充分性”。AI 已为你生成了一份包含 3 个辩论话题的讲评课件。
              </p>
              <button className="text-indigo-600 text-sm font-bold hover:underline">预览课件并下发</button>
            </div>
          </div>
        </div>

        {/* AI Intervention Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6">关注与干预提醒</h2>
            <div className="space-y-4">
              {studentIssues.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">{item.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      item.type === 'urgent' ? 'bg-rose-100 text-rose-700' : 
                      item.type === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.issue}</p>
                  <button className="w-full py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-indigo-50 transition-colors">
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherView;
