import { Music, Heart, Github, Twitter, Mail } from 'lucide-react';
import type { Page } from '@/App';
import '@/styles/Footer.css';

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: '导航',
      links: [
        { label: '首页', page: 'home' as Page },
        { label: '已学会', page: 'learned' as Page },
        { label: '学习中', page: 'learning' as Page },
        { label: '杂谈笔记', page: 'notes' as Page },
        { label: 'Web LLM', page: 'llm' as Page },
      ],
    },
    {
      title: '关于',
      links: [
        { label: '关于七叔', page: 'home' as Page },
        { label: '音乐风格', page: 'home' as Page },
        { label: '学习历程', page: 'learning' as Page },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com' },
    { icon: Twitter, label: 'Twitter', url: 'https://twitter.com' },
    { icon: Mail, label: 'Email', url: 'mailto:601692037@qq.com' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate?.(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Wave Decoration */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
            fill="#fafafa"
          />
        </svg>
      </div>

      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <button className="brand-logo" onClick={() => handleNavClick('home')}>
                <Music className="logo-icon" />
                <span>七叔</span>
              </button>
              <p className="brand-desc">
                一个热爱唱歌的程序员，用音乐记录生活，用歌声传递感动。
              </p>
              <div className="social-links">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links */}
            {footerLinks.map((group) => (
              <div className="footer-links-group" key={group.title}>
                <h4>{group.title}</h4>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <button onClick={() => handleNavClick(link.page)}>
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="footer-bottom">
            <p className="copyright">
              © {currentYear} 七叔. Made with <Heart size={14} className="heart" /> and Music
            </p>
            <p className="tech-stack">
              Soulmeta
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
