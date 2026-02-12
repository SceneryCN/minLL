import { useEffect, useRef } from 'react';
import { Mic2, Target, TrendingUp, Clock } from 'lucide-react';
import SongCard from '@/components/SongCard';
import { learningSongs, plannedSongs } from '@/data/songs';
import '@/styles/SongsPage.css';

export default function LearningSongs() {
  const headerRef = useRef<HTMLDivElement>(null);
  const learningRef = useRef<HTMLDivElement>(null);
  const plannedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const headerContent = entry.target.querySelector('.header-content');
            if (headerContent) {
              headerContent.classList.add('animate-in');
            }
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    [headerRef, learningRef, plannedRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const avgProgress = Math.round(
    learningSongs.reduce((acc, song) => acc + (song.progress || 0), 0) / learningSongs.length
  );

  return (
    <div className="songs-page learning-page">
      {/* Page Header */}
      <div className="page-header" ref={headerRef}>
        <div className="header-bg">
          <div className="gradient-orb blue"></div>
        </div>
        <div className="container">
          <div className="header-content">
            <div className="header-badge blue">
              <Mic2 size={18} />
              <span>持续进步</span>
            </div>
            <h1 className="header-title">正在学习的歌曲</h1>
            <p className="header-desc">
              学无止境，每一首新歌都是新的挑战，记录我的成长轨迹
            </p>
            
            {/* Stats */}
            <div className="header-stats">
              <div className="stat-box">
                <TrendingUp className="stat-icon" size={24} />
                <div className="stat-value">{avgProgress}%</div>
                <div className="stat-label">平均进度</div>
              </div>
              <div className="stat-box">
                <Target className="stat-icon" size={24} />
                <div className="stat-value">{learningSongs.length}</div>
                <div className="stat-label">学习中</div>
              </div>
              <div className="stat-box">
                <Clock className="stat-icon" size={24} />
                <div className="stat-value">{plannedSongs.length}</div>
                <div className="stat-label">计划中</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Section */}
      <div className="songs-content">
        <div className="container">
          <div className="section-block" ref={learningRef}>
            <div className="block-header">
              <div className="block-icon blue">
                <Mic2 size={20} />
              </div>
              <div className="block-info">
                <h2>正在学习</h2>
                <p>这些歌曲我正在努力练习中</p>
              </div>
            </div>
            <div className="songs-grid">
              {learningSongs.map((song, index) => (
                <SongCard key={song.id} song={song} index={index} />
              ))}
            </div>
          </div>

          {/* Planned Section */}
          <div className="section-block planned-block" ref={plannedRef}>
            <div className="block-header">
              <div className="block-icon gray">
                <Target size={20} />
              </div>
              <div className="block-info">
                <h2>学习计划</h2>
                <p>接下来想要挑战的歌曲</p>
              </div>
            </div>
            <div className="songs-grid">
              {plannedSongs.map((song, index) => (
                <SongCard key={song.id} song={song} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
