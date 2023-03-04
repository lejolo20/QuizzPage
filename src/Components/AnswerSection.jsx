import './QuestionSection.css'
import { useState } from 'react';

export default function AnswerSection(props) {
    
    const [answerSelected, setAnswerSelected] = useState(false);
    
    const styles = {
        backgroundColor: 
        props.answerIsSelected 
          ? (props.showAnswersState
              ? (props.answerCorrect === props.answerShowed
                ? "#94D7A2"
                : "#F8BCBC")
              : "#D6DBF5")
          : "",

      color: props.showAnswersState 
      ?  (props.answerIsSelected
          ? 'black' 
          : '#D6DBF5')
      : 'black',

      border: props.showAnswersState 
             ?  (props.answerIsSelected
                 ? '1px solid black' 
                 : '1px solid #D6DBF5')
             : '1px solid black',
              
    };
    
    if (props.showAnswersState && !answerSelected) {
      if (props.answerCorrect === props.answerShowed) {
        styles.backgroundColor = "#94D7A2";
        styles.color='#2F3137'
      } else if (props.answerIsSelected) {
        styles.backgroundColor = "#F8BCBC";
      }
    } 

    function handleAnswerClick() {
        setAnswerSelected(true);
        props.holdAnswer();
    }
          
    return (
        <div className="answers" key={props.answerShowed} >
            <button 
                style={styles}
                disabled={props.showAnswersState} 
                onClick={handleAnswerClick}
            >
                {atob(props.answerShowed)}
            </button>   
        </div>
    );
}
