import { useState } from 'react';
import { Play, Pause, Clock, CheckCircle2, Loader2, Target } from 'lucide-react';
import type { Song } from '@/types';
import '@/styles/SongCard.css';

interface SongCardProps {
  song: Song;
  index?: number;
}

export default function SongCard({ song, index = 0 }: SongCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const getStatusIcon = () => {
    switch (song.status) {
      case 'learned':
        return <CheckCircle2 size={16} />;
      case 'learning':
        return <Loader2 size={16} className="spin" />;
      case 'planned':
        return <Target size={16} />;
    }
  };

  const getStatusText = () => {
    switch (song.status) {
      case 'learned':
        return '已学会';
      case 'learning':
        return '学习中';
      case 'planned':
        return '计划中';
    }
  };

  return (
    <div
      className={`song-card status-${song.status}`}
      style={{ animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="song-cover-wrapper">
        <div className="song-cover">
          <img src={song.cover} alt={song.title} loading="lazy" />
          <div className="cover-overlay">
            <button
              className="play-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? '暂停' : '播放'}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="status-badge">
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </div>

        {/* Progress Bar for learning songs */}
        {song.status === 'learning' && song.progress !== undefined && (
          <div className="progress-ring">
            <svg viewBox="0 0 36 36">
              <path
                className="progress-ring-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="progress-ring-fill"
                strokeDasharray={`${song.progress}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="progress-text">{song.progress}%</span>
          </div>
        )}
      </div>

      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{song.artist}</p>
        
        {song.description && (
          <p className={`song-desc ${isHovered ? 'expanded' : ''}`}>
            {song.description}
          </p>
        )}

        <div className="song-meta">
          <span className="duration">
            <Clock size={14} />
            {song.duration}
          </span>
          {song.learnedDate && (
            <span className="learned-date">
              学会于 {song.learnedDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
