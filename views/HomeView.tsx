
import React, { useState, useEffect } from 'react';

interface HomeViewProps {
  onEnterRole: (role: 'student' | 'teacher') => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onEnterRole }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    {
      url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=2070',
      alt: 'Library background'
    },
    {
      url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=2073',
      alt: 'Deep reading background'
    },
    {
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2104',
      alt: 'Modern classroom'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerImages.length]);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section with Sliding Background Banner - Reduced Height */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden rounded-[2.5rem] mt-4 mx-4 shadow-2xl">
        {/* Banner Images Layer */}
        {bannerImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70 z-10" />
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover scale-105"
            />
          </div>
        ))}

        {/* Hero Content Layer */}
        <div className="relative z-20 text-center space-y-6 max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold text-white animate-fadeIn">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span>基于 PISA 国际阅读评估框架</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold serif-text text-white leading-tight drop-shadow-lg">
            读懂文字，<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
              读深思维
            </span>
          </h1>
          
          <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md hidden md:block">
            ReadMind AI 不只是阅读平台。我们融合 AI 教学智能体，通过苏格拉底式启发，系统性提升核心素养。
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button 
              onClick={() => onEnterRole('student')}
              className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-md shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95"
            >
              我是学生，开始精读
            </button>
            <button 
              onClick={() => onEnterRole('teacher')}
              className="px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold text-md hover:bg-white/20 transition-all active:scale-95"
            >
              我是老师，管理班级
            </button>
          </div>
        </div>

        {/* Banner Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {[
          {
            title: '科学的能力雷达',
            desc: '实时生成 R1-R4 四维能力画像，让思维的成长肉眼可见。',
            icon: (
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            )
          },
          {
            title: '苏格拉底式对话',
            desc: 'AI 伙伴不直接给答案，而是通过追问引导学生自主发现真理。',
            icon: (
              <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            )
          },
          {
            title: '个性化学习路径',
            desc: '根据历史数据自动推荐弱项训练，实现真正的因材施教。',
            icon: (
              <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )
          }
        ].map((feature, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Role Selection Detailed Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-indigo-600 rounded-[2rem] p-10 text-white space-y-8 relative overflow-hidden group shadow-xl">
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl font-bold">赋能学生，训练深度思考</h2>
              <ul className="space-y-3 opacity-90">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  <span>每日精读 20 分钟，突破思维瓶颈</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  <span>海量文本库：从散文到科学说明文</span>
                </li>
              </ul>
              <button 
                onClick={() => onEnterRole('student')}
                className="mt-4 px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
              >
                学生登录
              </button>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-10 text-white space-y-8 relative overflow-hidden group shadow-xl border border-white/5">
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl font-bold">辅助教师，实现智慧讲评</h2>
              <ul className="space-y-3 opacity-90">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  <span>班级共性问题一键聚合，节省批改时间</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  <span>AI 生成个性化作业与干预方案</span>
                </li>
              </ul>
              <button 
                onClick={() => onEnterRole('teacher')}
                className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all active:scale-95"
              >
                教师登录
              </button>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="text-center max-w-2xl mx-auto px-4 py-12">
        <blockquote className="serif-text text-2xl text-slate-700 italic leading-relaxed">
          “未来的核心素养不在于你知道多少，而在于你如何思考。阅读是思维的磨刀石。”
        </blockquote>
      </section>
    </div>
  );
};

export default HomeView;
