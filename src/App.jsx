import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import WelcomePage from './Components/WelcomePage'

function App() {
  

  return (
    <div>
    <img className='blobs-blue'  src='../src/Images/blobs-blue.png'/>
    <img className='blobs-yellow'  src='../src/Images/blobs-yellow.png'/>
    <div className="App">
      <WelcomePage />
    </div>
    </div>
  )
}

export default App
