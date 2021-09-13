import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios'
import Coment from './components/Coment';
import {Pagination} from '@material-ui/lab'

function App() {

  async function getComents(page = 1){
    const response = await axios.get('https://jordan.ashton.fashion/api/goods/30/comments',{
      params: {
        page: page
      }
    })
    setComents(response.data.data)
    setPages(response.data.last_page)
  }

  const [coments, setComents] = useState([])
  let [pages, setPages] = useState(0)

  useEffect(() => {
    getComents()
  }, [])

  return (
    <div className="App">
      <Pagination onChange={(e, page) => getComents(page)} count={pages} variant="outlined" color="primary" />
      <div className="comentsList">
        {coments.map(res => {
          return <Coment name={res.name} text={res.text} created_at={res.created_at} key={res.id}/>
        })}
      </div>
    </div>
  );
}

export default App;
