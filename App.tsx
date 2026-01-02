
import React, { useState } from 'react';
import Layout from './components/Layout';
import HomeView from './views/HomeView';
import StudentView from './views/StudentView';
import TeacherView from './views/TeacherView';
import ReaderView from './views/ReaderView';
import { ReadingText } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'student' | 'teacher' | 'reader'>('home');
  const [activeText, setActiveText] = useState<ReadingText | null>(null);

  const handleEnterRole = (role: 'student' | 'teacher') => {
    setView(role);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReader = (text: ReadingText) => {
    setActiveText(text);
    setView('reader');
  };

  const handleCloseReader = () => {
    setView('student');
    setActiveText(null);
  };

  const handleLogoClick = () => {
    setView('home');
    setActiveText(null);
  };

  // 如果处于精读模式，渲染独立的全屏阅读器视图
  if (view === 'reader' && activeText) {
    return <ReaderView text={activeText} onClose={handleCloseReader} />;
  }

  return (
    <Layout 
      activeRole={view === 'home' ? 'student' : (view as 'student' | 'teacher')} 
      onRoleSwitch={handleEnterRole}
      onLogoClick={handleLogoClick}
      hideSwitcher={view === 'home'}
      currentPage={
        view === 'home' ? '门户首页' : 
        view === 'student' ? '学生控制台' : '教师工作台'
      }
    >
      {view === 'home' && <HomeView onEnterRole={handleEnterRole} />}
      {view === 'student' && <StudentView onOpenReader={handleOpenReader} />}
      {view === 'teacher' && <TeacherView />}
      
      {/* Floating Support Button - 仅在非精读模式下显示 */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button className="bg-white p-4 rounded-full shadow-2xl border border-slate-200 text-indigo-600 hover:scale-110 active:scale-95 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </Layout>
  );
};

export default App;
