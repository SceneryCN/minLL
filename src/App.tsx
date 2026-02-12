import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';
import Home from '@/pages/Home';
import LearnedSongs from '@/pages/LearnedSongs';
import LearningSongs from '@/pages/LearningSongs';
import Notes from '@/pages/Notes';
import WebLLM from '@/pages/WebLLM';
import '@/styles/variables.css';
import '@/styles/global.css';

export type Page = 'home' | 'learned' | 'learning' | 'notes' | 'llm';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'learned':
        return <LearnedSongs />;
      case 'learning':
        return <LearningSongs />;
      case 'notes':
        return <Notes />;
      case 'llm':
        return <WebLLM />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
      <MusicPlayer />
    </div>
  );
}

export default App;
