import { useEffect, useRef } from 'react';
import { ArrowRight, Music, Heart, Star, Mic2 } from 'lucide-react';
import Hero from '@/components/Hero';
import { learnedSongs, learningSongs, favoriteArtists } from '@/data/songs';
import type { Page } from '@/App';
import '@/styles/Home.css';

interface HomeProps {
  onNavigate?: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

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

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <Hero onNavigate={onNavigate} />

      {/* Featured Songs Section */}
      <section 
        className="featured-section" 
        ref={(el) => { sectionsRef.current[0] = el; }}
      >
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Music size={16} />
              <span>已学会</span>
            </div>
            <h2 className="section-title">精选歌曲</h2>
            <p className="section-desc">这些是我已经掌握的歌曲，每一首都承载着不同的情感</p>
          </div>

          <div className="featured-grid">
            {learnedSongs.slice(0, 3).map((song, index) => (
              <div 
                className="featured-item" 
                key={song.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="featured-image">
                  <img src={song.cover} alt={song.title} loading="lazy" />
                  <div className="featured-overlay">
                    <span className="play-icon">
                      <Music size={24} />
                    </span>
                  </div>
                </div>
                <div className="featured-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="section-footer">
            <button 
              className="view-all-btn"
              onClick={() => onNavigate?.('learned')}
            >
              <span>查看全部歌曲</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Learning Progress Section */}
      <section 
        className="learning-section"
        ref={(el) => { sectionsRef.current[1] = el; }}
      >
        <div className="container">
          <div className="section-header">
            <div className="section-badge blue">
              <Mic2 size={16} />
              <span>学习中</span>
            </div>
            <h2 className="section-title">正在进步</h2>
            <p className="section-desc">持续学习，不断突破自己的舒适区</p>
          </div>

          <div className="learning-list">
            {learningSongs.map((song, index) => (
              <div 
                className="learning-item" 
                key={song.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="learning-image">
                  <img src={song.cover} alt={song.title} loading="lazy" />
                </div>
                <div className="learning-content">
                  <div className="learning-info">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>
                  <div className="learning-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${song.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{song.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-footer">
            <button 
              className="view-all-btn"
              onClick={() => onNavigate?.('learning')}
            >
              <span>查看学习进度</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Favorite Artists Section */}
      <section 
        className="artists-section"
        ref={(el) => { sectionsRef.current[2] = el; }}
      >
        <div className="container">
          <div className="section-header">
            <div className="section-badge purple">
              <Heart size={16} />
              <span>偶像</span>
            </div>
            <h2 className="section-title">喜欢的歌手</h2>
            <p className="section-desc">他们是我音乐路上的灯塔</p>
          </div>

          <div className="artists-grid">
            {favoriteArtists.map((artist, index) => (
              <div 
                className="artist-card" 
                key={artist.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="artist-avatar">
                  <img src={artist.avatar} alt={artist.name} loading="lazy" />
                </div>
                <h3>{artist.name}</h3>
                <p>{artist.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section 
        className="quote-section"
        ref={(el) => { sectionsRef.current[3] = el; }}
      >
        <div className="container">
          <div className="quote-card">
            <Star className="quote-icon" size={32} />
            <blockquote>
              "音乐是我生活中不可或缺的一部分，它让我在代码的世界里找到情感的出口。"
            </blockquote>
            <cite>— 七叔</cite>
          </div>
        </div>
      </section>
    </div>
  );
}
