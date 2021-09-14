import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios'
import Coment from './components/Comment';
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
    })
  }

  function loadMore(nextPage){
    let getPage = ++nextPage
    axios.get('https://jordan.ashton.fashion/api/goods/30/comments',{
      params: {
        page: getPage
      }
    }).then(response => {
      setCurrentPage(currentPage = response.data.current_page);
      setPages(pages = response.data.last_page);
      setLoadMoreComents(loadMoreComents = response.data.data);
      setComents(coments = [ ...coments, ...loadMoreComents]);
    })
  }

  function sendComent(e){
    e.preventDefault()
    if(userText === ''){
      setError(error = true)
    }else if(comentText === ''){
      setError(error = true)
    } else {
      axios.post('https://jordan.ashton.fashion/api/goods/30/comments',{
        name: userText,
        text: comentText
      })
      setUserText('')
      setComentText('')
      setError(false)
    }
    
  }

  let [currentPage, setCurrentPage] = useState()
  let [coments, setComents] = useState([])
  let [pages, setPages] = useState(0)
  let [loadMoreComents, setLoadMoreComents] = useState([])

  let [userText, setUserText] = useState('')
  let [comentText, setComentText] = useState('')
  let [error, setError] = useState(false)

  useEffect(() => {
    getComents(1)
  }, [])

  return (
    <div className="App">
      <h1 className="h1">Comments</h1>
      <div>
        <form className="form">
          {error ? <div className="form__el red_text">*All fields should be filled</div> : <span/>}
          <div className="form__el">Username:</div>
          <div className="form__el"><input value={userText} onChange={e => setUserText(userText = e.target.value)} className="input" type="text"/></div>
          <div className="form__el">Comment:</div>
          <div className="form__el input"><textarea value={comentText} className="textarea" onChange={e => setComentText(comentText  = e.target.value)} rows="10" cols="45" name="text"></textarea></div>
          <Button onClick={sendComent} variant="contained" color="primary">Add comment</Button>
        </form>
      </div>
      <div className="coment__section">
        <div className="comentsList">
          {coments.map(res => {
            return <Coment name={res.name} text={res.text} created_at={res.created_at} key={res.id}/>
          })}
        </div>
        <div className="load__button">
          {(!(currentPage === pages)) ?
            <Button onClick={() => loadMore(currentPage)} variant="contained" color="primary">Load more</Button> : <div></div>}
        </div>
        <div className="pagination">
          <Pagination onChange={(e, page) =>  getComents(page)} count={pages} variant="outlined" color="primary" />
        </div>
      </div>
    </div>
  );
}

export default App;
