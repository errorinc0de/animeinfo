import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { getData, loadMoreData } from './redux/asyncActions/dataAsyncActions'
import './App.css'
import AnimeCards from './components/AnimeCards';

function App({ queryData, lastPage, getData, loadMoreData }) {

  const [pageNumber, updatePageNumber] = useState(1);
  const [isRequesting, setIsRequesting] = useState(false)
  const queryRef = useRef(null)

  const handleSearch = (e) => {
    e.preventDefault()
    updatePageNumber(1)
    setIsRequesting(true)
    getData(queryRef.current.value, pageNumber)
  }

  const loadData = () => {
    loadMoreData(queryRef.current.value, pageNumber+1)
    updatePageNumber(pageNumber + 1)
  }

  return (
    <div className="App">
      
      <form className="search" onSubmit={(e)=>handleSearch(e)}>
        <input className="searchBox" type="text" placeholder="Enter keywords to search" ref={queryRef} required/>
        <button type="submit" className="searchButton">Go</button>
      </form>

      {isRequesting && (<div className="requesting">
        <span style={{color: '#398DC9'}}>Requesting:</span> <span style={{color: '#5AA2D4'}}>https://api.jikan.moe/v3/search/anime?q={encodeURI(queryRef.current.value)}</span>
      </div>)}

      <div className="resultsContainer">
        <AnimeCards queryData={queryData} />
      </div>

      {lastPage && (pageNumber < lastPage) ? 
        (<div>
          <button className="load-data" onClick={()=>{loadData()}}>Load More...</button>
        </div>) : ((pageNumber === lastPage) ? (
          <div>
            <button className="load-data">Looks like you have reached the End</button>
          </div>
        ) : (
          <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
