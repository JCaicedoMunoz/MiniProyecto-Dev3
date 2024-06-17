import React, { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState([]);
  
  async function getData() {
    const response = await fetch('/stays.json');
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const cleanData = jsonResponse.results.map(char => {
      return {
        beds: char.beds,
        city: char.city,
        country: char.country,
        maxGuests: char.maxGuests,
        photo: char.photo, // Asegúrate de que esto coincida con la estructura de tu JSON
        rating: char.rating,
        title: char.title,
        type: char.type,
        superHost: char.superHost
      };
    });
    setData(cleanData);
  }

  useEffect(() => {
    getData();
  }, []);

  return (

    <>
    <div className="modal">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="search">
          <input type="text" placeholder="Search user" />
          <figure>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </figure>
        </div>
      </div>
      <div className="title">
        <h1>Stays in Finland</h1>
        <p>12+ stays</p>
      </div>
      <div className="all-card">
      {data.map((char, index) => (
        <div key={index} className="card">
          <img src={char.photo} alt={char.title} className="card-image" />
          <div className="card-info">
            <div className="card-details">
              {char.superHost && <span className="superhost">Superhost</span>}
              <span className="entire-apartment">Entire apartment {char.beds} beds</span>
              <div className="rating">
                <span>{char.rating}</span>
              </div>
            </div>
            <h3 className="card-title">{char.title}</h3>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
