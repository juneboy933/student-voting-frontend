import React, { useState } from 'react'
import './login.css'

const Login = ({onLogin}) => {
    const [studentID, setStudentID] = useState("");
    const [message, setMessage] = useState('');

    const handleLogin = async() => {
        try{
        const res = await fetch("https://student-voting-backend-1.onrender.com/login", {
            method: 'POST',
            headers: {"content-Type": "application/json"},
            body: JSON.stringify({studentID})
        });

        if(!res.ok){
            throw new Error("Login failed");
        } 
        const data = await res.json();
        // console.log(data);
        if(data.message) {
            setMessage("Login successful");
            onLogin(studentID);
        }else if(data.success){
          onLogin(studentID, true);
        } else {
            setMessage(data.error || "Login failed")
        }
    } catch (error){
        setMessage("Login error: " + error.message);
    }
};

  return (
    <div className= 'login-container'>
      <h2>Student Login</h2>
      <input 
        type="text"
        value={studentID}
        placeholder='Enter student ID'
        onChange={(e) => setStudentID(e.target.value)}
        />
        <button type='submit' onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Login
