
import React, { useState, useEffect, useRef } from 'react';
import { ReadingText, CapabilityType, Message } from '../types';
import { PISA_CAPABILITIES, MOCK_USER_PROFILE } from '../constants';
import { geminiService } from '../services/geminiService';

interface Note {
  id: string;
  content: string;
  timestamp: number;
  status: 'draft' | 'submitted';
}

interface ReaderViewProps {
  text: ReadingText;
  onClose: () => void;
}

const ReaderView: React.FC<ReaderViewProps> = ({ text, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0); 
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [evaluations, setEvaluations] = useState<Record<string, any>>({});
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  
  // 多笔记管理状态
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 从本地加载笔记
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes_list_${text.id}`);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse notes", e);
        setNotes([]);
      }
    }
  }, [text.id]);

  // 持久化笔记
  useEffect(() => {
    localStorage.setItem(`notes_list_${text.id}`, JSON.stringify(notes));
  }, [notes, text.id]);

  const handleAddNote = () => {
    if (!newNoteContent.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      content: newNoteContent,
      timestamp: Date.now(),
      status: 'draft'
    };
    setNotes([newNote, ...notes]);
    setNewNoteContent('');
  };

  const handleSubmitNote = (id: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, status: 'submitted' as const } : n));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  // Personalized Path Logic
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoadingQuestions(true);
      const textContent = text.segments.map(s => s.content).join('\n');
      
      const learningGoal = (Object.entries(MOCK_USER_PROFILE.capabilities)
        .sort(([, a], [, b]) => a - b)[0][0]) as CapabilityType;

      const generated = await geminiService.generatePISAQuestions(
        textContent, 
        text.title,
        text.type,
        text.difficulty,
        learningGoal
      );
      setQuestions(generated);
      setIsLoadingQuestions(false);
    };
    fetchQuestions();
  }, [text]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg: Message = { role: 'user', text: chatInput };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    const currentQ = questions[0]?.prompt || "正在讨论本文";
    const response = await geminiService.getSocraticBuddyResponse(
      text.segments.map(s => s.content).join(''),
      currentQ,
      chatInput,
      messages
    );

    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  const submitAnswer = async (qId: string, capability: CapabilityType, qPrompt: string) => {
    const answer = answers[qId];
    if (!answer) return;

    setIsTyping(true);
    const result = await geminiService.evaluateAnswer(
      capability,
      qPrompt,
      answer,
      text.segments[0].content
    );
    setEvaluations(prev => ({ ...prev, [qId]: result }));
    setIsTyping(false);
  };

  return (
    <div className="fixed inset-0 bg-white z-[200] flex flex-col md:flex-row h-screen overflow-hidden animate-fadeIn">
      {/* 顶部返回/操作按钮 */}
      <div className="absolute top-4 left-4 z-[210] flex items-center space-x-2">
        <button 
          onClick={onClose}
          className="bg-slate-900 text-white hover:bg-slate-800 p-2.5 rounded-2xl transition-all shadow-xl flex items-center space-x-2 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="pr-2 font-bold text-sm">退出阅读</span>
        </button>
      </div>

      {/* 左侧：文章内容区 */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-20 bg-white selection:bg-indigo-100">
        <div className="max-w-3xl mx-auto space-y-12 py-12">
          <header className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[10px] font-bold tracking-widest uppercase border border-slate-100">
              {text.type} · {text.difficulty === 'Advanced' ? '高级' : text.difficulty === 'Intermediate' ? '中级' : '初级'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold serif-text text-slate-900 leading-tight">{text.title}</h1>
            <p className="text-slate-400 font-medium tracking-wide">作者：{text.author}</p>
          </header>

          <article className="space-y-8 text-xl leading-relaxed text-slate-800 serif-text">
            {text.segments.map((seg) => (
              <div key={seg.id} className="relative group p-6 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <p className="indent-8">{seg.content}</p>
                {seg.hint && (
                  <div className="opacity-0 group-hover:opacity-100 absolute -left-4 top-1/2 -translate-y-1/2 -translate-x-full transition-all duration-300 w-48">
                    <div className="bg-indigo-600 text-white text-[11px] p-3 rounded-2xl shadow-2xl relative">
                      <div className="font-bold mb-1 flex items-center">
                         <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z"/></svg>
                         精读小贴士
                      </div>
                      {seg.hint}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-600"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </article>
        </div>
      </div>

      {/* 右侧：AI 互动与笔记区 */}
      <div className="w-full md:w-[450px] bg-slate-50 flex flex-col h-full border-l border-slate-200 shadow-2xl z-[220]">
        <div className="flex border-b border-slate-200 bg-white overflow-x-auto no-scrollbar">
          {[
            { label: '专项训练', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
            { label: 'AI 伙伴', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> },
            { label: '我的笔记', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> }
          ].map((tab, i) => (
            <button 
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`flex-1 min-w-[100px] py-5 text-xs font-bold transition-all relative flex flex-col items-center space-y-1 ${currentStep === i ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {currentStep === i && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600"></div>}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {currentStep === 0 && (
            <div className="space-y-6 animate-fadeIn">
              {isLoadingQuestions ? (
                <div className="space-y-4 py-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse flex flex-col space-y-3">
                      <div className="h-4 bg-slate-200 rounded-full w-1/3"></div>
                      <div className="h-24 bg-white rounded-3xl w-full border border-slate-100"></div>
                    </div>
                  ))}
                  <p className="text-center text-slate-400 text-[10px] font-bold tracking-widest uppercase">AI 正在生成专属练习...</p>
                </div>
              ) : (
                questions.map((q) => (
                  <div key={q.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 text-[9px] font-bold rounded-full uppercase tracking-wider ${
                        q.capability === (Object.entries(MOCK_USER_PROFILE.capabilities).sort(([, a], [, b]) => a - b)[0][0]) 
                        ? 'bg-rose-600 text-white' 
                        : 'bg-indigo-600 text-white'
                      }`}>
                        {q.capability}
                      </span>
                      <h3 className="text-xs font-bold text-slate-500">{PISA_CAPABILITIES[q.capability as CapabilityType].name}</h3>
                    </div>
                    <p className="text-slate-800 text-sm font-medium leading-relaxed">{q.prompt}</p>
                    
                    <textarea
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 min-h-[100px]"
                      placeholder="请结合文本分享你的见解..."
                    />

                    {evaluations[q.id] ? (
                      <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 text-sm space-y-3 animate-fadeIn">
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-700 font-black text-lg">Score: {evaluations[q.id].score}</span>
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                        </div>
                        <p className="text-slate-700 leading-relaxed"><span className="font-bold text-emerald-800">反馈：</span>{evaluations[q.id].feedback}</p>
                        <div className="pt-2 border-t border-emerald-100">
                          <p className="text-slate-500 italic text-[11px]"><span className="font-bold">提升指南：</span>{evaluations[q.id].suggestions}</p>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => submitAnswer(q.id, q.capability, q.prompt)}
                        disabled={isTyping || !answers[q.id]}
                        className="w-full py-3 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all active:scale-95 shadow-lg shadow-indigo-100"
                      >
                        {isTyping ? '正在进行深度分析...' : '提交作答'}
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {currentStep === 1 && (
            <div className="flex flex-col h-full animate-fadeIn">
              <div className="flex-1 space-y-4 pb-20">
                {messages.length === 0 && (
                  <div className="text-center py-16 space-y-6">
                    <div className="w-20 h-20 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 flex items-center justify-center mx-auto">
                      <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">我是精读伙伴 Buddy</h4>
                      <p className="text-slate-400 text-xs px-12 leading-relaxed mt-2">在这里，我们不寻求标准答案。关于这篇《{text.title}》，你有什么想法？</p>
                    </div>
                  </div>
                )}
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] px-5 py-3.5 rounded-3xl text-sm leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-slate-900 text-white rounded-tr-none shadow-xl' 
                        : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm font-medium'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-100 px-5 py-3.5 rounded-3xl rounded-tl-none shadow-sm flex space-x-1 items-center">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col h-full animate-fadeIn space-y-6">
              {/* 新建笔记区域 */}
              <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 mb-2">
                   <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                   <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">新建笔记记录</span>
                </div>
                <textarea
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="w-full min-h-[120px] p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
                  placeholder="记录此刻的灵感..."
                />
                <button 
                  onClick={handleAddNote}
                  disabled={!newNoteContent.trim()}
                  className="w-full py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 disabled:bg-slate-200 transition-all active:scale-95 shadow-lg shadow-indigo-100"
                >
                  暂存到下方列表
                </button>
              </div>

              {/* 笔记历史列表 */}
              <div className="space-y-4 pb-12">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 flex justify-between items-center">
                  <span>笔记历史记录 ({notes.length})</span>
                  {notes.length > 0 && <span className="text-indigo-500">向下滑动查看更多</span>}
                </h4>
                
                {notes.length === 0 ? (
                  <div className="py-12 text-center space-y-2 opacity-40">
                    <svg className="w-10 h-10 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    <p className="text-xs font-bold">暂无笔记记录</p>
                  </div>
                ) : (
                  notes.map(note => (
                    <div key={note.id} className={`group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden ${note.status === 'submitted' ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-amber-400'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[9px] text-slate-400 font-bold">{new Date(note.timestamp).toLocaleString('zh-CN', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}</span>
                        <div className="flex items-center space-x-1">
                           {note.status === 'draft' ? (
                             <span className="text-[9px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold">草稿</span>
                           ) : (
                             <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">已提交</span>
                           )}
                           <button 
                             onClick={() => handleDeleteNote(note.id)}
                             className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-rose-500 transition-all"
                           >
                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                           </button>
                        </div>
                      </div>
                      <p className="text-slate-800 text-sm leading-relaxed mb-4 whitespace-pre-wrap font-medium">{note.content}</p>
                      
                      {note.status === 'draft' && (
                        <button 
                          onClick={() => handleSubmitNote(note.id)}
                          className="w-full py-2 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center space-x-2"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          <span>确认提交此笔记</span>
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {currentStep === 1 && (
          <div className="p-5 bg-white border-t border-slate-100 sticky bottom-0">
            <div className="flex space-x-2 bg-slate-50 p-2 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="发送你的观察或疑问..."
                className="flex-1 bg-transparent border-none px-3 py-2 text-sm outline-none placeholder:text-slate-300"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || isTyping}
                className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 disabled:bg-slate-200 transition-all active:scale-90 shadow-lg shadow-indigo-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReaderView;
