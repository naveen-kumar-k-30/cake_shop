import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // You can customize the animation duration
    });
  }, []);
  return (
    <>
   <div className="flex flex-col min-h-screen ">
   <Header />
   <div className="flex-grow ">
   <Outlet/>
   </div>
    <Footer className="fixed bottom-0 left-0 right-0 z-10"/>
   </div>
   
    </>
  )
}

export default App;
