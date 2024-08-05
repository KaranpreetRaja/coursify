import React, { useEffect, useState } from 'react';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from 'axios';

export default function Quiz({ lesson_id, course_id }) {
  const uid = window.localStorage.getItem('uid');
  const session_id = window.localStorage.getItem('session_id');
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [quizData, setQuizData] = useState({
    lesson_name: 'Introduction to Machine Learning',
    quiz_loaded: true,
    questions: [
      {
        question_type: "multiple_choice",
        options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Semi-supervised Learning"],
        question: "Which type of learning involves labeled data?",
        answer: "Supervised Learning"
      },
      {
        question_type: "true_false",
        options: [],
        question: "Unsupervised learning uses labeled data.",
        answer: "False"
      },
      {
        question_type: "multiple_choice",
        options: ["Clustering", "Classification", "Regression", "Dimensionality Reduction"],
        question: "Which technique is used in unsupervised learning to group similar data points?",
        answer: "Clustering"
      },
      {
        question_type: "true_false",
        options: [],
        question: "Neural networks are a part of deep learning.",
        answer: "True"
      },
      {
        question_type: "multiple_choice",
        options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Semi-supervised Learning"],
        question: "Which type of learning involves labeled data?",
        answer: "Supervised Learning"
      },
    ]
  });

  // const [quizData, setQuizData] = useState({
  //   lesson_name: '',
  //   quiz_loaded: false,
  //   questions: []
  // });

  // useEffect(() => {
  //   const fetchQuiz = async () => {
  //     try {
  //       const response = await axios.get("/api/course_config/get/get_quiz", {
  //         params: {
  //           uid,
  //           session_id,
  //           course_id,
  //           lesson_id
  //         }
  //       });

  //       if (response.data) {
  //         setQuizData(response.data);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch quiz:', error.message);
  //     }
  //   };

  //   fetchQuiz();
  // }, [uid, session_id, course_id, lesson_id]);

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answer
    });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;

    quizData.questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        correctAnswers += 1;
      }
    });

    setScore(correctAnswers);
    setSubmitted(true);
  };

  return (
    <Popup
      trigger={
        <button
          className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:border-blue-300">
          Quiz
        </button>
      }
      position="center center"
      modal
      nested
      closeOnDocumentClick={false}
    >
      {(close) => (
        <div className="bg-white p-6 rounded-lg flex flex-col space-y-4 overflow-y-auto h-quiz">
          <h2 className="text-2xl font-bold">{quizData.lesson_name} - Quiz</h2>
          {!quizData.quiz_loaded ? (
            <p>No quiz available for this lesson.</p>
          ) : (
            <div>
              {quizData.questions.map((question, index) => {
                const isCorrect = submitted && userAnswers[index] === question.answer;
                const isIncorrect = submitted && userAnswers[index] !== question.answer;
                return (
                  <div key={index} className={`mb-4 ${isCorrect ? 'border-green-500' : ''} ${isIncorrect ? 'border-red-500' : ''}`} style={{ borderWidth: isCorrect || isIncorrect ? '2px' : '0px' }}>
                    <h3 className="font-semibold">{question.question}</h3>
                    {question.question_type === "multiple_choice" ? (
                      <ul>
                        {question.options.map((option, idx) => (
                          <li key={idx}>
                            <label>
                              <input
                                type="radio"
                                name={`question_${index}`}
                                value={option}
                                onChange={() => handleAnswerChange(index, option)}
                                disabled={submitted}
                              />
                              {option}
                            </label>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div>
                        <label>
                          <input
                            type="radio"
                            name={`question_${index}`}
                            value="True"
                            onChange={() => handleAnswerChange(index, "True")}
                            disabled={submitted}
                          />
                          True
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`question_${index}`}
                            value="False"
                            onChange={() => handleAnswerChange(index, "False")}
                            disabled={submitted}
                          />
                          False
                        </label>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
          {score !== null && (
            <div className="mt-4 text-lg font-semibold">
              You scored {score} out of {quizData.questions.length}
            </div>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none mt-4"
            onClick={() => {
              setUserAnswers({})
              setScore(null)
              setSubmitted(false)
              close();
            }}
          >
            Close
          </button>
        </div>
      )}
    </Popup>
  );
}
