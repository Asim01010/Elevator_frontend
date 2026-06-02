import Hero from './components/Hero';
import Overview from './components/Overview';
import Features from './components/Features';
import Process from './components/Process';
import Showcase from './components/Showcase';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Overview />
      <Features />
      <Process />
      <Showcase />
      <Footer />
    </div>
  );
}