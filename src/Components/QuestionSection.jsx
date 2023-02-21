import  {useEffect, useState}  from 'react'
import './QuestionSection.css'
import AnswerSection from './AnswerSection'
import { v4 } from 'uuid'; 

export default function QuestionSection() {
    
    const [dataSection, setDataSection] = useState([])
    //const [dataSectionUpdate, setDataSectionUpdate] = useState(dataSectionUpdateFunc())

        useEffect(()=>{
            fetch('https://opentdb.com/api.php?amount=4&type=multiple')
            .then(res => res.json())
            .then(data => setDataSection(data.results.map(item=>{
                let answersArray=item.incorrect_answers.concat(item.correct_answer)
                let newAnswers=[]
                for(let i=0;i<4;i++){
                    newAnswers.push(
                        {
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
        },[])

//console.log(dataSection)

    function holdAnswer(id){
        setDataSection(oldValue=>{
            return(
                oldValue.map(item=>{
                    const updatedAnswers= item.allAnswers.map(element=>{
                        return (
                            element.id===id ? 
                            {...element,isSelected:!element.isSelected} : 
                            {...element,isSelected:false})
                    })
                    return({...item,allAnswers: updatedAnswers})
                })  
            )
        })
    } 
 
    const mappingQuest = dataSection.map(item=>{    
        //console.log(item.allAnswers.map(element=>element.answer))
        //console.log(item.question)
        return(
            <div className="question" key={item.question}>
                {item.question}   
                <div className='answer-container'>
                {item.allAnswers.map(element=>{
                    return(
                            <AnswerSection 
                            key={element.id}
                            answerShowed={element.answer}
                            answerIsSelected={element.isSelected}
                            holdAnswer={()=>holdAnswer(element.id)}
                            />
                            )
                        })
                    }
                </div>
            </div>
        )
    })

    return(
        <div className='q-a-container'>
            {mappingQuest}
            <button className='btn-check'>Check Answers</button>
        </div>
    )
}