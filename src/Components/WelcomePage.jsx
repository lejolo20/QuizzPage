import './WelcomePage.css'


export default function WelcomePage(props) {
    return(
        <div className="welcome-page">
           <h1>Quizzical</h1>
           <h3>Lets prove your knowledge</h3>

           <button className='main-button' onClick={props.questionPage}>Start Quiz</button>
            
    
        </div>
    )
}