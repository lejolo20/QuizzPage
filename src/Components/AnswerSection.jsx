import './QuestionSection.css'


export default function AnswerSection(props) {

    //console.log(props)

    const styles = {
        backgroundColor: props.answerIsSelected ? "#94D7A2" : ""
    }

    return (
            
        <div className="answers" key={props.answerShowed} >
            <button style={styles} onClick={props.holdAnswer}>{props.answerShowed}</button>   
        </div>  )

} 