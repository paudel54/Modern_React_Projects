import './App.css';
import Aos from 'aos';
import 'aos/dist/aos.css'
import Hero from '../src/components/hero/Hero'
import { useEffect } from 'react';
function App() {

  //aos init
  useEffect(() => {
    Aos.init({
      duration: 2500,
      delay: 400,
    });
  });

  return (
    <div className='overflow-hidden'>
      <Hero />
    </div>
  );
}

export default App;
