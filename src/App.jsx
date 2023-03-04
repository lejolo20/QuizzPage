import { useState } from 'react'
import './App.css'
import WelcomePage from './Components/WelcomePage'
import QuestionSection from './Components/QuestionSection'



function App() {

  const [questPage, setQuestPage] = useState(false)
  const [questionsQuantity, setQuestionsQuantity] = useState(5)
  const [questionsCategory, setQuestionsCategory] = useState(0)
  
  function questionPage(){
    setQuestPage(oldState => !oldState)
  }

  return (
    <div className='main'>
      <img className='blobs-blue'  src='../src/Images/blobs-blue.png'/>
      <img className='blobs-yellow'  src='../src/Images/blobs-yellow.png'/>
      <div className="App">
        {
          questPage ?  
          <QuestionSection 
          howManyQuestions={questionsQuantity}
          category={questionsCategory}/> : 
          <div className='welcome'>
            <WelcomePage questionPage={questionPage}/>
            <form>
                <label htmlFor="quantity">
                  Number of questions:
                  <span>(between 1 and 10)</span>
                </label>
                <input
                  value={questionsQuantity}
                  onChange={event => setQuestionsQuantity(event.target.value)}
                  onBlur={event => {
                    const value = parseInt(event.target.value);
                    if (!isNaN(value) && value >= 1 && value <= 10) {
                      setQuestionsQuantity(value);
                    } else if (value>10){
                      setQuestionsQuantity(10);
                    } else{
                      setQuestionsQuantity(1)
                    }
                  }}
                  placeholder="between 1 and 10"
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="10"
                />


            </form>
            <form>
                <label htmlFor="category">
                  Select a category: 
                <select value={questionsCategory} 
                onChange={event => setQuestionsCategory(event.target.value)}
                placeholder="Select"
                type="select" 
                id="category" 
                name="category" 
                >
                <option value="0">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                </select>
                </label>
              </form>
          </div>
        } 
      </div>
    </div>
  )
}

export default App
