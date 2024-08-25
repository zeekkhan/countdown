import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AboutPage from './Pages/AboutPage';
import ContactUsPage from './Pages/ContactUsPage';
import LoginSection from './components/LoginSection';
import PrivatePage from './Pages/PrivatePage';
import ProtectedRoute from './Pages/ProtectedRoute';
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../src/firebase/FirebaseConfig"


function App() {
  const [user, setuser] = useState(null)

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log('Auth State Changed:', user);
    setuser(user);
  });
  return () => unsubscribe();
}, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSection />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/login-section" element={<LoginSection />} />
        <Route 
          path="/private-page" 
          element={
            <ProtectedRoute user={user}>
              <PrivatePage />
             </ProtectedRoute> 
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
