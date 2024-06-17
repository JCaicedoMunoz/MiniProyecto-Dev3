import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Title from './Title';
import Nav from './components/Nav';
import Card from './components/Card'


export default function App() {
  const [data, setData] = useState([]);
  const [user, setUsers] =useState([]);
  const [search, setSearch] = useState({ country: "", maxGuests: "" });

  
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
        photo: char.photo, 
        rating: char.rating,
        title: char.title,
        type: char.type,
        superHost: char.superHost
      };
    });
    setData(cleanData);
    setUsers(cleanData)
  }

  useEffect(() => {
    getData();
  }, []);
  

  return (

    <>
      <Nav search={search} setSearch={setSearch}  setData={setData} user={user} />
      <Title/>
      <div className="all-card">
        {data.map((char, index) => (
          <Card key={index} char={char} />  // Usa el componente Card
        ))}
      </div>
    <Footer/>
    </>
  );
}
