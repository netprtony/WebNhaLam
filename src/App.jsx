import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingActionDock from './components/layout/FloatingActionDock';
import Hero from './components/sections/Hero';
import PromoBanners from './components/sections/PromoBanners';
import HighlightMenu from './components/sections/HighlightMenu';
import FullMenu from './components/sections/FullMenu';
import AmbianceSpaces from './components/sections/AmbianceSpaces';
import SocialProof from './components/sections/SocialProof';
import LocationContact from './components/sections/LocationContact';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PromoBanners />
        <HighlightMenu />
        <FullMenu />
        <AmbianceSpaces />
        <SocialProof />
        <LocationContact />
      </main>
      <Footer />
      <FloatingActionDock />
    </div>
  );
}

export default App;
