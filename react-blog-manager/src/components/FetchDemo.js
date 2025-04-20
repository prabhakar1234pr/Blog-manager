import React,{useEffect} from "react";

function FetchDemo(){
    useEffect(()=>{
        fetch('http://localhost:3001/api/profile')
        .then((response)=>response.json())
        .then((data)=>{
            console.log('Fetched data (Promises):',data);
        })
        .catch((error)=>{
            console.error('Error fetching data:', error);
        });
    },[]);
    return (
        <div style={{padding: '1rem'}}>
            <h2>Fetch Demo - .then/.catch</h2>
            <p>Open your console to seee the data from /api/profile.</p>    
            
        </div>
    );
}

export default FetchDemo;