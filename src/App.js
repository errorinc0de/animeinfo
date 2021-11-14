import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { getData, loadMoreData } from './redux/asyncActions/dataAsyncActions'
import './App.css'

function App({ queryData, lastPage, getData, loadMoreData }) {

  const [pageNumber, updatePageNumber] = useState(1);
  const [isRequesting, setIsRequesting] = useState(false)
  const queryRef = useRef(null)

  const handleSearch = () => {
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
      <div className="search">
        <input className="searchBox" type="text" placeholder="Enter keywords to search" ref={queryRef}/>
        <button className="searchButton" onClick={()=>{handleSearch()}}>Go</button>
      </div>
      {isRequesting && (<div className="requesting">
        <span style={{color: '#398DC9'}}>Requesting:</span> <span style={{color: '#5AA2D4'}}>https://api.jikan.moe/v3/search/anime?q={queryRef.current.value}</span>
      </div>)}
      <div className="resultsContainer">
        {queryData && queryData.map((data, index) => {
          return(
            <div className="resultCard" key={index}>
              <a href={data.url} target="_blank" rel="noreferrer">
                <img src={data.image_url} alt="Anime Poster"/>
              </a>
              <div>{data.title}</div>
            </div>
          )
        })
      }
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
            <button className="load-data">Search something to see your results</button>
          </div>
        ))
      }
    </div>
  )

}

const mapStateToProps = (state) => {
  console.log(state)
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
