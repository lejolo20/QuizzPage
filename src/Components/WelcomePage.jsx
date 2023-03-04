import './WelcomePage.css'


export default function WelcomePage(props) {

    
    //console.log(props)
    return(
        <div className="welcome-page">
           <h1>Quizzical</h1>
           <h3>Lets prove your knowledge, select the number of questions and category if you want.</h3> 
           <button className='main-button' onClick={props.questionPage}>Start Quiz</button>
        </div>
    )
}