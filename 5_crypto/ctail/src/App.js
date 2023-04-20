import './App.css';
import Aos from 'aos';
import 'aos/dist/aos.css'
import Hero from '../src/components/hero/Hero'
import Header from './components/header/Header';
import NavMobile from './components/nav/NavMobile';
import Stats from './components/stats/Stats';
import Why from './components/stats/Why';

import { useEffect, useState } from 'react';
function App() {
  //state management
  const [navMobile, setNavMobile] = useState(false);
  //aos init
  useEffect(() => {
    Aos.init({
      duration: 2500,
      delay: 400,
    });
  }
  );

  return (
    <div className='overflow-hidden'>
      <Header setNavMobile={setNavMobile} />
      <Hero />
      {/* Mobile Nav */}
      <div className={`${navMobile ? 'right-0' : '-right-full'} fixed z-10 top-0 h-full transition-all duration-200`}>
        <NavMobile setNavMobile={setNavMobile} />
      </div>
      <Stats />
      <Why />
      <div className='h-[2000px]'></div>
    </div>
  );
}

export default App;
