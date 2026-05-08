import Hero from '@/components/Hero';
import PhotoGallery from '@/components/PhotoGallery';
import Footer from '@/components/Footer';
import '@/styles/Home.css';

export default function Home() {
  return (
    <div className="home-page home-page--folio">
      <Hero />
      <PhotoGallery />
      <Footer />
    </div>
  );
}
