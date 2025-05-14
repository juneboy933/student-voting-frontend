import React, { useEffect, useState } from 'react'
import './admin.css'

const AdminPanel = () => {
    const [votes, setVotes] = useState([]);

    const fetchData = async () => {
        try {
            const res = await fetch('https://student-voting-backend-1.onrender.com/tally');
            const data = await res.json();
            setVotes(data);
            // console.log(data);
        } catch (error) {
            console.error("Error fetching votes", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    // console.log(votes);
  return (
    <div className='admin-panel'>
      <h2>Vote Tally</h2>
        {votes.length === 0 ? (
            <p>Loading vote tallies...</p>
        ) : (
            <ul>
                {votes.map((vote, index) => (
                    <li key={index}>
                        Position: {vote.Position} - ID: {vote.ID} - Votes: {vote.votes}
                    </li>
                ))}
            </ul>
        )}      
    </div>
  )
}

export default AdminPanel
