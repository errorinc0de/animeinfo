import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import LandingPage from './landingPage'


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route exact path="/?q=:q" element={<LandingPage/>} />
      </Routes>
    </HashRouter>
  )
}

export default App