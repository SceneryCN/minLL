import { useState, useEffect } from 'react';
import { Menu, X, Music, Home, BookOpen, Mic2, Cpu } from 'lucide-react';
import type { Page } from '@/App';
import '@/styles/Navbar.css';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { page: Page; label: string; icon: typeof Home }[] = [
  { page: 'home', label: '首页', icon: Home },
  { page: 'learned', label: '已学会', icon: Music },
  { page: 'learning', label: '学习中', icon: Mic2 },
  { page: 'notes', label: '杂谈笔记', icon: BookOpen },
  { page: 'llm', label: 'Web LLM', icon: Cpu },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <button 
          className="navbar-logo" 
          onClick={() => handleNavClick('home')}
        >
          <Music className="logo-icon" />
          <span className="logo-text">七叔</span>
        </button>

        {/* Desktop Navigation */}
        <div className="navbar-links desktop">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="nav-icon" size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`mobile-nav-link ${isActive ? 'active' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon className="nav-icon" size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
