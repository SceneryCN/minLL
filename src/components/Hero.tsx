import { useEffect, useRef } from 'react';
import { Play, Music, Mic2, BookOpen } from 'lucide-react';
import type { Page } from '@/App';
import '@/styles/Hero.css';

interface HeroProps {
  onNavigate?: (page: Page) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = [
      titleRef.current,
      subtitleRef.current,
      descRef.current,
      buttonsRef.current,
      imageRef.current,
    ];

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: '已学会', value: '6', unit: '首', icon: Music },
    { label: '学习中', value: '4', unit: '首', icon: Mic2 },
    { label: '笔记', value: '6', unit: '篇', icon: BookOpen },
  ];

  return (
    <section className="hero" ref={heroRef}>
      {/* Background Effects */}
      <div className="hero-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="badge">
            <Mic2 size={14} />
            <span>程序员 · 音乐爱好者</span>
          </div>

          <h1 className="hero-title" ref={titleRef}>
            <span className="title-line">你好，我是</span>
            <span className="title-name">七叔</span>
          </h1>

          <p className="hero-subtitle" ref={subtitleRef}>
            用真挚情感演绎灵魂之音
          </p>

          <p className="hero-desc" ref={descRef}>
            一个热爱唱歌的程序员，深受杨宗纬、王力宏、张杰等歌手影响。
            每一次演唱都是通往情感深处的旅程，用音乐记录生活，用歌声传递感动。
          </p>

          <div className="hero-buttons" ref={buttonsRef}>
            <button 
              className="btn-primary"
              onClick={() => onNavigate?.('learned')}
            >
              <Play size={18} />
              <span>收听我的歌</span>
            </button>
            <button 
              className="btn-secondary"
              onClick={() => onNavigate?.('notes')}
            >
              <BookOpen size={18} />
              <span>阅读笔记</span>
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div className="stat-item" key={index} style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="stat-icon">
                    <Icon size={20} />
                  </div>
                  <div className="stat-content">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-unit">{stat.unit}</span>
                  </div>
                  <span className="stat-label">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-image-wrapper" ref={imageRef}>
          <div className="hero-image">
            <img
              src="/mine.jpg"
              alt="七叔 - 歌手照片"
            />
            <div className="image-overlay"></div>
          </div>
          
          {/* Floating Cards */}
          <div className="floating-card card-1">
            <Music size={20} />
            <span>深情演绎</span>
          </div>
          <div className="floating-card card-2">
            <Mic2 size={20} />
            <span>持续进步</span>
          </div>
          
          {/* Decorative Elements */}
          <div className="decoration-circle"></div>
          <div className="decoration-dots"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>向下滚动</span>
      </div>
    </section>
  );
}
