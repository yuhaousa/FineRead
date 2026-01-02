
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeRole: 'student' | 'teacher';
  onRoleSwitch: (role: 'student' | 'teacher') => void;
  onLogoClick?: () => void;
  hideSwitcher?: boolean;
  currentPage: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeRole, onRoleSwitch, onLogoClick, hideSwitcher, currentPage }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={onLogoClick}
            >
              <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">ReadMind AI</span>
            </div>

            <div className="flex items-center space-x-4">
              {!hideSwitcher && (
                <div className="flex bg-slate-100 p-1 rounded-full text-sm">
                  <button
                    onClick={() => onRoleSwitch('student')}
                    className={`px-4 py-1.5 rounded-full transition-all ${activeRole === 'student' ? 'bg-white shadow text-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    学生端
                  </button>
                  <button
                    onClick={() => onRoleSwitch('teacher')}
                    className={`px-4 py-1.5 rounded-full transition-all ${activeRole === 'teacher' ? 'bg-white shadow text-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    教师端
                  </button>
                </div>
              )}
              
              <div className="flex items-center space-x-2 border-l border-slate-200 pl-4 ml-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-[10px] border border-slate-200">
                  {activeRole === 'student' ? 'ST' : 'TE'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center items-center space-x-2 grayscale opacity-50">
            <div className="bg-slate-600 p-1 rounded text-white text-[10px] font-bold">PISA</div>
            <span className="text-sm font-bold text-slate-600">Reading Framework</span>
          </div>
          <p className="text-slate-400 text-xs">© 2025 ReadMind AI. 让阅读成为思考的阶梯。</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
