import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios'
import Coment from './components/Coment';
import {Pagination} from '@material-ui/lab'
import {Button} from '@material-ui/core'

function App() {

  function getComents(page){
    axios.get('https://jordan.ashton.fashion/api/goods/30/comments',{
      params: {
        page: page
      }
    }).then(response => {
      setCurrentPage(currentPage = response.data.current_page);
      setComents(coments = response.data.data);
    setPages(pages = response.data.last_page);
    console.log(currentPage);
    })
    
  }

  async function loadMore(nextPage){
    let getPage = ++nextPage
    await axios.get('https://jordan.ashton.fashion/api/goods/30/comments',{
      params: {
        page: getPage
      }
    }).then(response => {
      setCurrentPage(currentPage = response.data.current_page);
      setPages(pages = response.data.last_page);
      setLoadMoreComents(loadMoreComents = response.data.data);
      setComents(coments = [ ...coments, ...loadMoreComents]);
      console.log(currentPage);
    })
    
  }

  let [currentPage, setCurrentPage] = useState()
  let [coments, setComents] = useState([])
  let [pages, setPages] = useState(0)
  let [loadMoreComents, setLoadMoreComents] = useState([])

  useEffect(() => {
    getComents(1)
  }, [])

  return (
    <div className="App">
      <div className="comentsList">
        {coments.map(res => {
          return <Coment name={res.name} text={res.text} created_at={res.created_at} key={res.id}/>
        })}
      </div>
      <div className="load__button">
        {(!(currentPage === pages)) ?
          <Button onClick={() => loadMore(currentPage)} variant="contained" color="primary">Load more</Button> : <div></div>}
      </div>
      <div className="pagination"><Pagination onChange={(e, page) =>  getComents(page)} count={pages} variant="outlined" color="primary" /></div>
    </div>
  );
}

export default App;
