import { useState } from 'react'
import './App.css'
import WelcomePage from './Components/WelcomePage'
import QuestionSection from './Components/QuestionSection'


function App() {

  const [questPage, setQuestPage] = useState(false)
  
  function questionPage(){
    setQuestPage(oldState => !oldState)
  }
  
  return (
    <div>
      <img className='blobs-blue'  src='../src/Images/blobs-blue.png'/>
      <img className='blobs-yellow'  src='../src/Images/blobs-yellow.png'/>
      <div className="App">
        {
          questPage ?  
          <QuestionSection /> : 
          <WelcomePage questionPage={questionPage}/>
        } 
        
      </div>
      
    </div>
  )
}

export default App
