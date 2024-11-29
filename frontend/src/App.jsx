import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Experts from './Components/Experts';
import Footer from './Components/Footer';
import Gallery from './Components/Gallery';
import NewsLetter from './Components/NewsLetter';
import Fee_structure  from './Pages/Fee_Structure/Fee_Structure';
import Schedule from './Pages/Schedule_Classes/Schedule';
import Admission_Form from './Pages/Admission_Form/Admission_Form';
import Faculty from './Pages/Faculty/Faculty';
import Publications from './Pages/Publications/Publications';
import Alumni from './Pages/Alumni/Alumni';
import WBSE from './Pages/WBSE/WBSE';
import CBSE from './Pages/CBSE/CBSE';
import CISCE from './Pages/CISCE/CISCE';
import Privacy_Policy from './Pages/Privacy_Policy_regulations/Privacy_Policy'
function App() {
  return (
    <Router>
      <div>
        {/* Navbar for handling navigation */}
        
        
        <Routes>
          {/* Route for the main page with all sections */}
          <Route 
            path="/" 
            element={
              <>
                <Navbar />
                <div id="header">
                  <Navbar />
                </div>
                <div id="banner">
                  <Banner />
                </div>
                <div id="experts">
                  <Experts />
                </div>
                <div id="gallery">
                  <Gallery />
                </div>
                <div id="newsletter">
                  <NewsLetter />
                </div>
                <Footer />
              </>
            } 
          />
          
          {/* Route for the Fee Structure page */}
          <Route path="/fee-structure" element={<Fee_structure /> } />
          <Route path="/schedule-classes" element={<Schedule/> }  />
          <Route path="/admission-form" element={<Admission_Form/> }  />
          
          <Route path="/faculty" element={<Faculty/> }  />
          <Route path="/publications" element={<Publications/> }  />
          <Route path="/alumni" element={<Alumni/> }  />
          
          <Route path="/wbse" element={<WBSE/> }  />
          <Route path="/cbse" element={<CBSE/> }  />
          <Route path="/cisce" element={<CISCE/> }  />
          <Route path="/privacy_policy" element={<Privacy_Policy/>}  />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
