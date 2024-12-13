import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/HomePage/Navbar';
import Banner from './Components/HomePage/Banner';
import Experts from './Components/HomePage/Experts';
import Footer from './Components/HomePage/Footer';
import Gallery from './Components/HomePage/Gallery';
import NewsLetter from './Components/HomePage/NewsLetter';
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
import Login from './Pages/Login/Login';
import AdminDashboard from './Components/AdminPage/AdminDashboard';
import AdminAlumni from './Components/AdminPage/AdminAlumni/AdminAlumni';
import AdminBanner from './Components/AdminPage/AdminBanner/AdminBanner';
import AdminFee from './Components/AdminPage/AdminFee/AdminFee';
import AdminGallery from './Components/AdminPage/AdminGallery/AdminGallery';
import AdminNotes from './Components/AdminPage/AdminNotes/AdminNotes';
import AdminPublications from './Components/AdminPage/AdminPublications/AdminPublications';
import AdminSchedule from './Components/AdminPage/AdminSchedule/AdminSchedule';
import AdminTeacher from './Components/AdminPage/AdminTeacher/AdminTeacher';
import AdminUsers from './Components/AdminPage/AdminUsers/AdminUsers';
import AdminData from './Components/AdminPage/AdminData/AdminData';
import UserProfile from './Components/UserPage/UserProfile/UserProfile';
import UserNavbar from './Components/UserPage/UserNavbar/UserNavbar';
import UserSchedule from './Components/UserPage/UserSchedule/UserSchedule';
import UserNotes from './Components/UserPage/UserNotes/UserNotes';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
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
          <Route path="/login" element={<Login/>} />
          
          <Route path="/admin" element={<AdminDashboard/>} />          
          <Route path="/admin/alumni" element={<AdminAlumni/>} />
          <Route path="/admin/banner" element={<AdminBanner/>} />
          <Route path="/admin/fee" element={<AdminFee/>} />
          <Route path="/admin/gallery-images" element={<AdminGallery/>} />
          <Route path="/admin/notes" element={<AdminNotes/>} />
          <Route path="/admin/data" element={<AdminData/>} />
          <Route path="/admin/publication" element={<AdminPublications/>} />
          <Route path="/admin/schedule" element={<AdminSchedule/>} />
          <Route path="/admin/teacher" element={<AdminTeacher/>} />
          <Route path="/admin/users" element={<AdminUsers/>} />
          

          <Route 
            path="/userDashboard" 
            element={
              <>
                
                <div id="header">
                  <UserNavbar />
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
             
          <Route path="/user/navbar" element={<UserNavbar/>}/>
          <Route path="/user/profile" element={<UserProfile/>}/>
          <Route path="/user/schedule" element={<UserSchedule/>}/>
          <Route path="/user/notes" element={<UserNotes/>}/>
          <Route path="/user/fee-structure" element={<Fee_structure/>}/>
          <Route path="/user/change-password" element={<ChangePassword/>}/>
          

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
