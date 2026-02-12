import { useEffect, useRef, useState } from 'react';
import { BookOpen, Calendar, Tag, Search, ChevronRight } from 'lucide-react';
import { notes } from '@/data/songs';
import '@/styles/Notes.css';

export default function Notes() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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
    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  // Get all unique tags
  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? note.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="notes-page">
      {/* Page Header */}
      <div className="page-header" ref={headerRef}>
        <div className="header-bg">
          <div className="gradient-orb"></div>
        </div>
        <div className="container">
          <div className="header-content">
            <div className="header-badge">
              <BookOpen size={18} />
              <span>文字记录</span>
            </div>
            <h1 className="header-title">杂谈笔记</h1>
            <p className="header-desc">
              记录学唱歌的心得体会、设备分享、以及与音乐相关的思考
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="notes-content">
        <div className="container">
          <div className="notes-layout" ref={contentRef}>
            {/* Sidebar */}
            <aside className="notes-sidebar">
              {/* Search */}
              <div className="sidebar-section">
                <div className="search-box">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="搜索笔记..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="sidebar-section">
                <h3 className="sidebar-title">
                  <Tag size={16} />
                  标签
                </h3>
                <div className="tags-list">
                  <button
                    className={`tag-item ${selectedTag === null ? 'active' : ''}`}
                    onClick={() => setSelectedTag(null)}
                  >
                    全部
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      className={`tag-item ${selectedTag === tag ? 'active' : ''}`}
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="sidebar-section">
                <h3 className="sidebar-title">
                  <BookOpen size={16} />
                  统计
                </h3>
                <div className="stats-list">
                  <div className="stat-row">
                    <span>总笔记</span>
                    <span className="stat-num">{notes.length}</span>
                  </div>
                  <div className="stat-row">
                    <span>标签数</span>
                    <span className="stat-num">{allTags.length}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Notes List */}
            <div className="notes-list">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note, index) => (
                  <article
                    className="note-card"
                    key={note.id}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    {note.cover && (
                      <div className="note-cover">
                        <img src={note.cover} alt={note.title} loading="lazy" />
                      </div>
                    )}
                    <div className="note-content">
                      <div className="note-meta">
                        <span className="note-date">
                          <Calendar size={14} />
                          {note.date}
                        </span>
                        <div className="note-tags">
                          {note.tags.map((tag) => (
                            <span key={tag} className="note-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h2 className="note-title">{note.title}</h2>
                      <p className="note-excerpt">{note.content}</p>
                      <button className="read-more">
                        <span>阅读更多</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-state">
                  <BookOpen size={48} />
                  <p>没有找到匹配的笔记</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
