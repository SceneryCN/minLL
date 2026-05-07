import { t } from '@/i18n';
import '@/styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar--minimal">
      <div className="navbar-container">
        <button
          type="button"
          className="navbar-logo navbar-logo--text-only"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="logo-text">{t('brand.name')}</span>
        </button>
      </div>
    </nav>
  );
}
