import React, { useEffect, useState } from 'react'
import Login from './components/Login.jsx'
import Aspirants from './components/AspirantList.jsx'
import AdminPanel from './components/AdminPanel.jsx'

const App = () => {
  const [studentID, setStudentID] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedID = localStorage.getItem('studentID');
    const adminStore = localStorage.getItem('isAdmin');
    if(savedID) {
      setIsLoggedIn(true);
      setStudentID(savedID);
      setIsAdmin(adminStore === true);
    }
  }, []);

  const handleLogin = (id, adminStatus = false) => {
    if(id === "admin") {
      setIsAdmin(true);
    } else {
      localStorage.setItem('studentID', id);
      localStorage.setItem('isAdmin', adminStatus);
      setIsLoggedIn(true);
      setStudentID(id);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("StudentID");
    setIsLoggedIn(false);
    setStudentID("");
  };

  return (
    <div className="App">
      {!isLoggedIn && !isAdmin ?(
        <Login onLogin={handleLogin}/>) : isAdmin ? (
            <AdminPanel />
      ): (
        <Aspirants 
          studentID={studentID}
          onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
