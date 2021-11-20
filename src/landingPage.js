import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getData, loadMoreData } from './redux/asyncActions/dataAsyncActions'
import './App.css'
import AnimeCards from './components/AnimeCards';
import { useNavigate } from 'react-router';

function LandingPage({ queryData, lastPage, getData, loadMoreData }) {

  const [pageNumber, updatePageNumber] = useState(1);
  const [isRequesting, setIsRequesting] = useState(false)
  // const queryRef = useRef(null)
  const [query, updateQuery] =  useState('');
  const [q, updateQ] = useState(window.location.hash.substring(5))
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    updatePageNumber(1)
    setIsRequesting(true)
    getData(query, 1) 
    navigate('/?q='+encodeURI(query))
  }

  const loadData = () => {
    if(pageNumber == 0){
      loadMoreData(query, 2)
      updatePageNumber(2)
    } else {
      loadMoreData(query, pageNumber + 1)
      updatePageNumber(pageNumber + 1)
    }
  }

  useEffect(()=>{
    updatePageNumber(0)
  }, [query])

  useEffect(()=>{
    updateQ(window.location.hash.substring(5))
    updatePageNumber(1)
  }, [window.location.hash.substring(5)])

  useEffect(()=>{
    if(q) {
      updateQuery(q)
      getData(q, 1)
      setIsRequesting(true)
    } 
  }, [q])


  return (
    <div className="App">
      
      <form className="search" onSubmit={(e)=>handleSearch(e)}>
        <input className="searchBox" type="text" placeholder="Enter keywords to search" value={query} onChange={(e)=>updateQuery(e.target.value)} required/>
        <button type="submit" className="searchButton">Go</button>
      </form>

      {isRequesting && (<div className="requesting">
        <span style={{color: '#398DC9'}}>Requesting:</span> <span style={{color: '#5AA2D4'}}>https://api.jikan.moe/v3/search/anime?q={encodeURI(query)}</span>
      </div>)}

      <div className="resultsContainer">
        <AnimeCards queryData={queryData} />
      </div>

      {lastPage && (pageNumber < lastPage) ? 
        (<div className="btn">
          <button className="load-data" onClick={()=>{loadData()}}>Load More...</button>
        </div>) : ((pageNumber === lastPage) ? (
          <div className="btn">
            <button className="load-data">Looks like you have reached the end :)</button>
          </div>
        ) : (
          <div className="btn">
            <button id="des" className="load-data">Search something new to see results</button>
          </div>
        ))
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    queryData: state.data,
    lastPage: state.lastPage
  }
}

const mapDispatchToProps = {
  getData,
  loadMoreData
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
