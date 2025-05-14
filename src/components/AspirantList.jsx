import React, { useState, useEffect } from 'react'
import './Aspirants.css'

const AspirantList = ({ studentID, onLogout }) => {
    const [aspirants, setAspirants] = useState([]);
    const [message, setMessage] = useState("");
    const [canVote, setCanVote] = useState(true);

    const fetchAspirants = async () => {
        try {
            const res = await fetch("https://student-voting-backend-1.onrender.com/aspirants");
            const data = await res.json();
            setAspirants(data);
        } catch (error) {
            console.error("Error fetching aspirants", error);
        }
    };


    useEffect(() => {
        fetchAspirants();
    }, []);

    useEffect(() => {
        const now = new Date();

        // Get todays's date
        const year = now.getFullYear();
        const month = now.getMonth(); 
        const date = now.getDate();
    
        // Set start and end time for today
        const votingStart = new Date(year, month, date, 8, 0, 0); // 8.00Am
        const votingEnd = new Date(year, month, date, 16,0,0); // 4.00PM

        if(now <= votingStart || now >= votingEnd){
            setCanVote(false);
        }
    },[]);

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
            <img src={`https://student-voting-backend-1.onrender.com/images/${asp.image}`} alt={asp.name}/>
            <h3>{asp.name}</h3>
            <p>Position: {asp.position}</p>
            {canVote ? (
                <button type='submit'
                onClick={() => handleVote(asp.position, asp.studentID)}>Vote</button>
            ) : (
                <p>Voting is closed.</p>
            )
            }
        </div>
       ))}
       </div>
       )}
    </div>
  )
}

export default AspirantList
