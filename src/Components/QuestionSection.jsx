import  {useEffect, useState}  from 'react'
import './QuestionSection.css'
import AnswerSection from './AnswerSection'
import { v4 } from 'uuid'; 
import Confetti from 'react-confetti'


export default function QuestionSection(props) {
  
    //console.log(props)

    const [dataSection, setDataSection] = useState([])
    const [correctSelection,setCorrectSelection] = useState(0)
    const [showAnswers, setShowAnswers] = useState(false)
    const [loading, setLoading] = useState(true)
    const [newGame, setNewGame] = useState(0)
            
    const shuffledArray = (array) => array.sort((a, b) => 0.5 - Math.random())

    let urlAnyCategory = ''
    if(props.category=='0'){
      urlAnyCategory = `https://opentdb.com/api.php?amount=${props.howManyQuestions}&type=multiple&encode=base64`
    } else {
      urlAnyCategory = `https://opentdb.com/api.php?amount=${props.howManyQuestions}&category=${props.category}&type=multiple&encode=base64`
    }

    const begin = () => useEffect(()=>{
        setLoading(true)
        fetch(urlAnyCategory)
        .then(res => res.json())
        .then(data => setDataSection(data.results.map(item=>{
            let answersArray=shuffledArray(item.incorrect_answers.concat(item.correct_answer))
            let newAnswers=[]
            for(let i=0;i<4;i++){
              newAnswers.push({
                  answer:answersArray[i],
                  isSelected:false,
                  id:v4()
              })
            }
              return({
                ...item,
                allAnswers: newAnswers,
              }) 
          })))
          .finally(()=>setLoading(false))
      },[newGame])

      begin()

//console.log(dataSection)

  function holdAnswer(questionIndex, id) {
    //console.log(questionIndex, id)
    setDataSection(oldValue =>
      oldValue.map((item, index) => {
        if (index !== questionIndex) {
          return item;
        }
        const updatedAnswers = item.allAnswers.map((element) => {
          const isSelected = element.id === id;
          return { ...element, isSelected };
        });
  
        return { ...item, allAnswers: updatedAnswers };
      })
    );
  }

  function correctAnswer(){
    let result = 0
    let answerSelection = ''
    dataSection.map(item=>{
      item.allAnswers.map(element=>{
        if (element.isSelected) return answerSelection = element.answer
      })
      if(item.correct_answer===answerSelection) return result=result+1
    })
    setCorrectSelection(result)
  }

  function showAnswersFunc(){
    setShowAnswers(true)
  }

  function handleCorrectAndShowAnswer(){
    if(!showAnswers){
      showAnswersFunc()
      correctAnswer()
    } else {
      setShowAnswers(false)
      setNewGame(oldValue=>oldValue+1)
    }
  }

   function finishConfetti(){
    //console.log(correctSelection)
    //console.log(props.howManyQuestions)
    if (correctSelection==props.howManyQuestions){
      return <Confetti />
    }
  } 


    const mappingQuest = dataSection.map((item,index)=>{    
        //console.log(item.question)
        //console.log(item.correct_answer)
        return(
            <div className="question" key={item.question}>
                {atob(item.question)}   
                <div className='answer-container'>
                {item.allAnswers.map(element=>{
                  
                    return(
                        
                            <AnswerSection 
                            key={element.id}
                            answerShowed={element.answer}
                            answerIsSelected={element.isSelected}
                            holdAnswer={() => holdAnswer(index, element.id)} 
                            answerCorrect={item.correct_answer}
                            showAnswersState={showAnswers}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    })

    return(
      <div className='question-main'>
        {showAnswers && finishConfetti()}
        {loading && <div className="loading"><span>Loading...</span></div>}
        <div className='q-a-container'>
            {mappingQuest} 
        </div>
        <div className='result'>
            {showAnswers && <div className='response'>You scored {correctSelection}/{props.howManyQuestions} correct answers </div>}
            <button className='btn-check' onClick={handleCorrectAndShowAnswer}>
              {showAnswers ? 
              'Play Again' : 
              'Check Answers'}
            </button>
           {showAnswers && <button className='btn-check' onClick={()=>window.location.reload()}>Start Again</button>}
        </div>
      </div>
    )
}