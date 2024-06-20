// import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import '../node_modules/boxicons/css/boxicons.css'
import AuroraHero from './component/Tools/Tools.js';
import Hero_Section from './component/Hero_sectionhead/Hero_Section.js';
import Navbar from './component/Navbar/Navbar.js';
import CompanyVision from './component/Company_vision/Company_Vision.js';
import Services from './component/Sevices/Services.js';
import Contact from './component/Contact/Contact.js';
import Footer from './component/Footer/Footer.js';


function App() {
  return (
   <>
   <Navbar/>
   <Hero_Section/>
   <CompanyVision/>
   <Services/>
   <AuroraHero/>
   <Contact/>
   <Footer/>
   
   </>
  );
}

export default App;
