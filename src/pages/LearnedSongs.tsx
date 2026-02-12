import { useEffect, useRef } from 'react';
import { Music, Calendar, Award } from 'lucide-react';
import SongCard from '@/components/SongCard';
import { learnedSongs } from '@/data/songs';
import '@/styles/SongsPage.css';

export default function LearnedSongs() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, []);

  const totalDuration = learnedSongs.reduce((acc, song) => {
    const [min, sec] = song.duration.split(':').map(Number);
    return acc + min * 60 + sec;
  }, 0);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}小时${mins}分` : `${mins}分钟`;
  };

  return (
    <div className="songs-page">
      {/* Page Header */}
      <div className="page-header" ref={headerRef}>
        <div className="header-bg">
          <div className="gradient-orb"></div>
        </div>
        <div className="container">
          <div className="header-content">
            <div className="header-badge">
              <Music size={18} />
              <span>我的音乐</span>
            </div>
            <h1 className="header-title">已学会的歌曲</h1>
            <p className="header-desc">
              每一首歌都是一段学习旅程的见证，从陌生到熟悉，从生涩到熟练
            </p>

            {/* Stats */}
            <div className="header-stats">
              <div className="stat-box">
                <Award className="stat-icon" size={24} />
                <div className="stat-value">{learnedSongs.length}</div>
                <div className="stat-label">已学会</div>
              </div>
              <div className="stat-box">
                <Calendar className="stat-icon" size={24} />
                <div className="stat-value">{formatDuration(totalDuration)}</div>
                <div className="stat-label">总时长</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Songs Grid */}
      <div className="songs-content">
        <div className="container">
          <div className="songs-grid" ref={gridRef}>
            {learnedSongs.map((song, index) => (
              <SongCard key={song.id} song={song} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
