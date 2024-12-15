// Import dependencies
import React, { useState } from 'react';
import './App.css';
import quizData from './quizData';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [scoreReport, setScoreReport] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  // Start quiz handler
  const startQuiz = () => {
    setQuestions(quizData.questions);
    setCurrentQuestionIndex(0);
    setResponses([]);
    setSelectedChoice(null);
    setScoreReport(null);
    setQuizStarted(true);
  };

  // Select an answer
  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
  };

  // Submit response for a question
  const submitResponse = () => {
    const question = questions[currentQuestionIndex];
    if (!selectedChoice) {
      alert("Please select an answer before proceeding!");
      return;
    }

    const isCorrect = question.correctAnswer.includes(selectedChoice);

    const payload = {
      questionId: question.id,
      selectedChoice,
      isCorrect,
    };

    setResponses([...responses, payload]);

    // Move to the next question or finish the quiz
    setTimeout(() => {
      setSelectedChoice(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        finishQuiz();
      }
    }, 500); // Short delay for tick visibility
  };

  // Finish quiz handler
  const finishQuiz = () => {
    const correctCount = responses.filter((res) => res.isCorrect).length;
    setScoreReport({
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      incorrectAnswers: questions.length - correctCount,
      percentage: ((correctCount / questions.length) * 100).toFixed(0),
    });
    setQuizStarted(false);
  };

  return (
    <div className="app">
      {/* Home Screen */}
      {!quizStarted && !scoreReport && (
        <div className="quiz-card-container">
        <div className="home">
          <div className="quiz-card">
            <h1>Quiz</h1>
            <button className="start-button" onClick={startQuiz}>
              Start
            </button>
          </div>
        </div>
        </div>
      )}

      {/* Question Screen */}
      {quizStarted && questions.length > 0 && (
        <div className="question-container1">
          <div className="question-container2">
          <div className="question-header">
            <div className="progress-circle">
              <span>{currentQuestionIndex + 1} / {questions.length}</span>
            </div>
          </div>
          <p className="question-text">{questions[currentQuestionIndex].text}</p>
          <div className="choices">
            {questions[currentQuestionIndex].choices.map((choice, index) => (
              <button
                key={index}
                className={`choice-button ${
                  selectedChoice === choice ? "selected" : ""
                }`}
                onClick={() => handleChoiceClick(choice)}
              >
                {choice}
                {selectedChoice === choice && (
                  <span className="tick">✔</span>
                )}
              </button>
            ))}
          </div>
          <button className="next-button" onClick={submitResponse}>
            Next
          </button>
        </div>
        </div>
      )}

      {/* Score Report Screen */}
      {scoreReport && (
        <div className="report">
          <div className="report-container">
            <h2>Your result</h2>
            <div className="score-gauge">
              <span>{scoreReport.percentage}%</span>
            </div>
            <div className="score-details">
              <p>
                <span className="correct">{scoreReport.correctAnswers} Correct</span>
              </p>
              <p>
                <span className="incorrect">{scoreReport.incorrectAnswers} Incorrect</span>
              </p>
            </div>
            <button className="start-again" onClick={startQuiz}>
              Start Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;