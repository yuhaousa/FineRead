
import React, { useMemo } from 'react';
import CapabilityChart from '../components/CapabilityChart';
import { MOCK_USER_PROFILE, SAMPLE_TEXTS, PISA_CAPABILITIES } from '../constants';
import { ReadingText, CapabilityType } from '../types';

interface StudentViewProps {
  onOpenReader: (text: ReadingText) => void;
}

const StudentView: React.FC<StudentViewProps> = ({ onOpenReader }) => {
  // Core Personalized Path Logic: Identifying the current learning hurdle
  const learningGoal = useMemo(() => {
    return (Object.entries(MOCK_USER_PROFILE.capabilities).sort(([, a], [, b]) => a - b)[0][0]) as CapabilityType;
  }, []);

  const recommendedText = useMemo(() => {
    return SAMPLE_TEXTS.find(t => t.id === 'mission_001') || SAMPLE_TEXTS[0];
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* User Status Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">
            {MOCK_USER_PROFILE.name[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">你好, {MOCK_USER_PROFILE.name}! 👋</h2>
            <p className="text-slate-400 text-sm">已连续阅读 {MOCK_USER_PROFILE.streak} 天 · 保持思考，收获看得见</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
          <span className="text-xs font-bold text-slate-500">今日目标: {PISA_CAPABILITIES[learningGoal].name}</span>
          <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[60%]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Daily Task Card */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col min-h-[600px] relative">
            {/* Task Card Header */}
            <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-indigo-50/50 to-white">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-rose-600 p-2 rounded-xl text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/></svg>
                  </div>
                  <span className="text-xl font-bold serif-text text-slate-800">久阅悦读书房</span>
                </div>
                <div className="text-right">
                  <p className="text-indigo-600 font-bold text-sm">持续阅读 · 收获看得见</p>
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <h1 className="text-3xl font-bold serif-text text-slate-900">《中国文脉》p23-40</h1>
                <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest">阅读提示卡 (3)</span>
              </div>
            </div>

            {/* Task Card Content */}
            <div className="p-8 flex-1 space-y-10 overflow-y-auto">
              <section className="space-y-4">
                <h3 className="flex items-center text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3">
                  阅读语言点训练：<span className="text-indigo-600 ml-1">(需交流回答)</span>
                </h3>
                <div className="space-y-6 text-slate-700 leading-relaxed pl-4">
                  <div className="bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100/50">
                    <p className="font-medium mb-2">- 请你认真阅读《中国文脉》，北大学生曾经给唐代诗人做过一个排序，如果让你来排，你会怎么排呢？结合他们的代表作说说为什么？</p>
                    <p className="font-medium">- 请你结合书本分析一下中国近、现代文学成就较低的原因有哪些？</p>
                  </div>
                  <div className="bg-amber-50/30 p-4 rounded-2xl border border-amber-100/50">
                    <p className="font-medium mb-3">- 认真观看《每日播报》，请选择至少3个你感兴趣的新闻话题，展开评述讨论：</p>
                    <div className="text-sm text-slate-500 italic space-y-1 pl-4">
                      <p>• 关于这件事，我还了解到......</p>
                      <p>• 我认为它之所以会发生，是因为......</p>
                      <p>• 我认为人们应该......才能帮助事情进展</p>
                      <p>• 这件事让我想到...... ；这件事让我觉得......</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h3 className="text-md font-bold text-slate-800 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  阅读策略方法温馨提示：
                </h3>
                <div className="space-y-4 text-sm text-slate-600">
                  <p><span className="font-bold text-slate-900">1. 鼓励孩子大声朗读故事</span>，遇到不会的生字词请注音后，多读两遍。</p>
                  <div className="space-y-2">
                    <p className="font-bold text-slate-900">2. 文学小贴士：</p>
                    <p>唐代诗人的特点主要体现在以下几个方面：</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start">
                        <span className="text-indigo-600 font-bold mr-2">①</span>
                        <span><span className="font-bold">风格多样性：</span>初唐四杰满怀情壮思、王维诗中有画、韩孟追求险怪、刘柳风格刚毅。</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 font-bold mr-2">②</span>
                        <span><span className="font-bold">主题广泛：</span>从山水田园到边塞风光，从政治咏怀到咏史怀古。</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            {/* Task Card Footer */}
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-slate-400">今日突破维度:</span>
                <span className="bg-indigo-600 px-3 py-1 rounded-lg text-xs font-bold">R3 整合与解释</span>
                <span className="bg-rose-600 px-3 py-1 rounded-lg text-xs font-bold">R4 评价与批判</span>
              </div>
              <button 
                onClick={() => onOpenReader(recommendedText)}
                className="px-8 py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center"
              >
                <span>进入 AI 精读间</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Ability Stats & Roadmap */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">能力雷达图</h3>
            <CapabilityChart data={MOCK_USER_PROFILE.capabilities} />
            <div className="mt-6 pt-6 border-t border-slate-50 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">最近进步</span>
                <span className="text-emerald-500 font-bold">+12% (R2)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">待攻克</span>
                <span className="text-rose-500 font-bold">R4 评价批判</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
             <h3 className="text-lg font-bold mb-4 relative z-10">思维进阶路径</h3>
             <div className="space-y-6 relative z-10">
                {[
                  { label: '信息检索', sub: 'R1 事实提取', done: true },
                  { label: '逻辑推演', sub: 'R2 隐含因果', done: true },
                  { label: '整合解释', sub: 'R3 全篇概括', active: true },
                  { label: '审辩思考', sub: 'R4 观点证伪', active: false },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      step.done ? 'bg-indigo-500 border-indigo-500 text-white' : 
                      step.active ? 'bg-white border-white text-indigo-900 ring-4 ring-white/20' : 
                      'border-white/20 text-white/40'
                    }`}>
                      {step.done ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : idx + 1}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${step.done || step.active ? 'text-white' : 'text-white/40'}`}>{step.label}</p>
                      <p className="text-[10px] text-white/50">{step.sub}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Other Texts Grid */}
      <div className="space-y-6 mt-12">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold text-slate-900">自主精读库</h2>
          <div className="flex space-x-6 text-sm font-semibold text-slate-400 border-b border-slate-100 pb-2">
            {['全部', 'Prose', 'Novel', 'Science', 'History'].map(filter => (
              <button key={filter} className={`transition-all ${filter === '全部' ? 'text-indigo-600 border-b-2 border-indigo-600 -mb-[9px] pb-2' : 'hover:text-slate-600'}`}>
                {filter === 'Prose' ? '散文' : filter === 'Novel' ? '小说' : filter === 'Science' ? '科普' : filter === 'History' ? '历史' : filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_TEXTS.filter(t => t.id !== 'mission_001').map(text => (
            <div key={text.id} className="bg-white rounded-2xl border-2 border-slate-100 transition-all group hover:border-slate-300 flex flex-col hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-24 bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors rounded-t-2xl">
                 <div className="p-4 rounded-2xl bg-white shadow-sm text-slate-400 group-hover:text-indigo-500 transition-colors">
                  {text.type === 'Science' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.05.087l-1.068.356A2 2 0 012 13.782V4.218a2 2 0 011.932-1.931l1.068.357a2 2 0 001.05.087l1.534-.383a6 6 0 013.86.517l.318.158a6 6 0 003.86.517l2.387-.477a2 2 0 011.022.547l.63.63a2 2 0 01.572 1.414v9.172a2 2 0 01-2.572 1.414l-.63-.63z" /></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  )}
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-md font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">{text.title}</h3>
                  <p className="text-slate-400 text-[10px] mt-1">{text.author}</p>
                </div>
                
                <div className="flex gap-2 mb-6">
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                    text.difficulty === 'Advanced' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                    text.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    {text.difficulty === 'Advanced' ? '高级' : text.difficulty === 'Intermediate' ? '中级' : '初级'}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] rounded font-medium">{text.type}</span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-bold text-slate-300 uppercase">
                    PISA {text.targetCapabilities[0]}
                  </span>
                  <button 
                    onClick={() => onOpenReader(text)}
                    className="px-4 py-1.5 bg-slate-900 text-white font-bold text-[11px] rounded-lg hover:bg-indigo-600 transition-all active:scale-95"
                  >
                    开始精读
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentView;
