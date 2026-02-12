import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import '@/styles/MusicPlayer.css';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3); // 默认音量30%
  const [isExpanded, setIsExpanded] = useState(false); // 控制展开状态
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 创建音频元素
    audioRef.current = new Audio('/background_music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      const autoPlay = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('自动播放失败，等待用户交互:', error);
        }
      };

      autoPlay();
      // 清理音频元素
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  useEffect(() => {
    // 更新音量
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    // 点击外部收起播放器
    const handleClickOutside = (event: MouseEvent) => {
      if (playerRef.current && !playerRef.current.contains(event.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    };

    // 添加事件监听
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside as EventListener);

    // 清理事件监听
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as EventListener);
    };
  }, [isExpanded]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error('播放失败:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted) {
      setIsMuted(false);
    }
  };

  const togglePlayer = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`music-player ${isExpanded ? 'expanded' : ''}`} 
      ref={playerRef}
      onClick={togglePlayer}
    >
      {/* 唱片 */}
      <div className={`vinyl ${isPlaying ? 'spinning' : ''}`}>
        <div className="vinyl-center"></div>
      </div>

      <div className="player-controls">
        <button
          className="play-btn"
          onClick={(e) => {
            e.stopPropagation(); // 阻止事件冒泡，避免触发展开/收起
            togglePlay();
          }}
          aria-label={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <div className="volume-control">
          <button
            className="mute-btn"
            onClick={(e) => {
              e.stopPropagation(); // 阻止事件冒泡，避免触发展开/收起
              toggleMute();
            }}
            aria-label={isMuted ? '取消静音' : '静音'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              e.stopPropagation(); // 阻止事件冒泡，避免触发展开/收起
              handleVolumeChange(e);
            }}
            className="volume-slider"
            aria-label="音量"
          />
        </div>
      </div>
    </div>
  );
}
