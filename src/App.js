import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios'
import Coment from './components/Coment';

function App() {

  const url = 'https://jordan.ashton.fashion/api/goods/30/comments'

  async function getComents(){
    const response = await axios.get(url)
    setComents(response.data.data)
  }

  const [coments, setComents] = useState([])

  useEffect(() => {
    getComents()
  }, [])

  return (
    <div className="App">
      <div className="comentsList">
        {coments.map(res => {
          return <Coment name={res.name} text={res.text} created_at={res.created_at} key={res.id}/>
        })}
      </div>
    </div>
  );
}

export default App;
