import logo from './logo.svg';
import './App.css';
import quizData from "./question.json"
import { useEffect, useState } from 'react';
import { Progress } from 'antd';



const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [progress, setProgress] = useState(0);
  const [correctanswer,setCorrectAnswer]=useState("")
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [score, setScore] = useState(0);

  const maxScore = 75;


  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === quizData[currentQuestion].correct_answer) {
      
      setCorrectAnswer(answer)
      setFeedback("Correct!");
    } else {
      setFeedback("Not Correct!");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setFeedback("");
      setProgress(((currentQuestion + 1) / quizData.length) * 100)
      if(correctanswer===quizData[currentQuestion].correct_answer){
        setScore(score + maxScore / quizData.length);
      }
      
    } else {
      setProgress(100);
      alert("Quiz Completed!");
    }

  };
  const difficultyLevels = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  useEffect(() => {
    const option = [...quizData[currentQuestion].incorrect_answers, quizData[currentQuestion].correct_answer].sort(() => Math.random() - 0.5);
    setShuffledOptions(option)
  }, [currentQuestion])


  console.log(score, "ppp")

  return (
    <>
      <progress value={progress / 100} style={{ width: "100%" }} />
      <div style={{ width: "450px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", textAlign: "center" }}>

        <div style={{ padding: "10px" }}>
          <p style={{ fontSize: "25px", fontWeight: "bold" }}>Question {currentQuestion + 1} of 20</p>

          <p>{quizData[currentQuestion]?.category}</p>
          {[...Array(3)].map((_, index) => (
            <span key={index} style={{ color: index < difficultyLevels[quizData[currentQuestion].difficulty] ? "gold" : "#ccc", fontSize: "20px" }}>★</span>
          ))}

        </div>
        <p>{quizData[currentQuestion].question}</p>
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "80%",
              backgroundColor: selectedAnswer === option ? (option === quizData[currentQuestion].correct_answer ? "lightgreen" : "salmon") : "white",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {option}
          </button>
        ))}
        {feedback && <p style={{ fontWeight: "bold", color: feedback === "Correct!" ? "green" : "red" }}>{feedback}</p>}
        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "80%",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            opacity: selectedAnswer === null ? 0.5 : 1,
          }}
        >
          Next Question
        </button>
     
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{width:"700px"}}>
        <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
          <p>Score{score}%</p>
          <p>Max-Score{maxScore}%</p>

        </div>
      <Progress strokeLinecap="butt" strokeWidth={20} strokeColor={"red"} percent={progress} success={{ percent: (score / maxScore) * 100 }} showInfo={false}  />
          </div>
      </div>
    </>

  );
};

export default App;
