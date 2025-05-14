import React, { useState, useEffect } from 'react'
import './Aspirants.css'

const AspirantList = ({ studentID, onLogout }) => {
    const [aspirants, setAspirants] = useState([]);
    const [message, setMessage] = useState("");

    const fetchAspirants = async () => {
        try {
            const res = await fetch("http://localhost:8000/aspirants");
            const data = await res.json();
            setAspirants(data);
        } catch (error) {
            console.error("Error fetching aspirants", error);
        }
    };


    useEffect(() => {
        fetchAspirants();
    }, []);

    const handleVote = async(position, aspirantId) => {
       try {
        const res = await fetch("http://localhost:8000/vote", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                studentID,
                aspirantID: aspirantId,
                position,
            }),
        });
        const data = await res.json();
        setMessage(data.message);
       } catch (error) {
        console.error("Voting error:", error);
        setMessage("Something went wrong.");
       }
    };
    
  return (
    <div className='aspirants'>
        <div className="top-bar">
            <h2>Welcome, {studentID}</h2>
            <button type='submit' onClick={onLogout}>Logout</button>
        </div>
      {message && <p className="message">{message}</p>}
       {aspirants.length === 0 ? (
        <p>Loading aspirants...</p>
       ): (
       <div className='aspirant-container'>
       {aspirants.map((asp) => (
        <div key={asp.name + asp.position } className='aspirant-card'>
            <img src={`http://localhost:8000/images/${asp.image}`} alt={asp.name}/>
            <h3>{asp.name}</h3>
            <p>Position: {asp.position}</p>
            <button type='submit'
            onClick={() => handleVote(asp.position, asp.studentID)}>Vote</button>
        </div>
       ))}
       </div>
       )}
    </div>
  )
}

export default AspirantList
