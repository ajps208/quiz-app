import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../Redux/pageSlice';
import { setScore } from '../Redux/scoreSlice';

function Quiz() {
  const selectedCategory = useSelector((state) => state.categroySlice.category);

  const dispatch = useDispatch();
  const [questions, setQuestions] = useState(null);
  const [options, setOptions] = useState([]);
  const [index, setIndex] = useState(0);
  const [clickStatus, setClickStatus] = useState(false);
  const [answerStatus, setAnswerStatus] = useState('');
  const [countdown, setCountdown] = useState(10);

  const fetchQuestions = async () => {
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&type=multiple`);
    setQuestions(response.data.results);
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!questions) {
      return;
    }
    let answers = [...questions[index].incorrect_answers]
    answers.splice(getRandomInt(questions[index].incorrect_answers.length), 0, questions[index].correct_answer)
    setOptions(answers);
    setCountdown(10); // Reset the countdown timer for each new question
  }, [questions, index]);

  const handleListItemClick = (event) => {
    if (clickStatus) {
      return;
    }
    setClickStatus(true);
    const selectedAnswer = event.target.textContent.substring(2).trim();

    if (selectedAnswer === questions[index].correct_answer) {
      dispatch(setScore(1)); // Increment the score by 1 if the answer is correct
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('wrong');
    }

    setTimeout(() => {
      if (index < 9) {
        setIndex(index + 1);
        setAnswerStatus('');
      } else {
        dispatch(setPage('end'));
      }
      setClickStatus(false);
    }, 1000);
  }

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        if (!clickStatus) {
          // dispatch(setScore(0)); // Set the score to 0 if no answer is selected before the countdown ends
          setClickStatus(true)
          setAnswerStatus('timeout');
          setTimeout(() => {
            if (index < 9) {
              setIndex(index + 1);
              setAnswerStatus('');
            } else {
              dispatch(setPage('end'));
            }
            setClickStatus(false);
          }, 1000);
        }
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [questions, index, clickStatus, countdown]);

  return (
    <div className="mt-4 d-flex w-100 flex-column justify-content-center align-items-center">
      {questions ? (
        <>
          <div className="d-flex  justify-content-evenly w-100  align-items-center">
            <h4 className='fw-bolder'>Question No: {index + 1}</h4>
            <div
              style={{ width: '50px', height: '50px', borderRadius: '100%', border: '1px black solid' }}
              className="d-flex  fw-bolder align-items-center justify-content-center fw-bolder"
            >
              {countdown}
            </div>
          </div>
          <p className="fs-4 mt-4  ps-4 pe-4">{questions[index].question}</p>
          <div className="d-flex mt-2 w-75">
            <div id="opt1" style={{ backgroundColor: clickStatus && (options[0] === questions[index].correct_answer ? 'green' : 'red') }} className="w-50   form-control" placeholder="" key={0} onClick={handleListItemClick}>A. {options[0]}</div>
            <div id="opt2" style={{ backgroundColor: clickStatus && (options[1] === questions[index].correct_answer ? 'green' : 'red') }} className="mx-2 w-50 form-control" placeholder="" key={1} onClick={handleListItemClick}>B. {options[1]}</div>
          </div>
          <div className="d-flex mt-2 w-75">
            <div id="opt3" style={{ backgroundColor: clickStatus && (options[2] === questions[index].correct_answer ? 'green' : 'red') }} className="w-50 form-control" placeholder="" key={2} onClick={handleListItemClick}>C. {options[2]}</div>
            <div id="opt4" style={{ backgroundColor: clickStatus && (options[3] === questions[index].correct_answer ? 'green' : 'red') }} className="mx-2 w-50 form-control" placeholder="" key={3} onClick={handleListItemClick}>D. {options[3]}</div>
          </div>
          {answerStatus === 'correct' && <p className="mt-3 fw-bolder text-success">Correct Answer 😊</p>}
          {answerStatus === 'wrong' && <p className="mt-3 fw-bolder text-danger">Wrong Answer 😔</p>}
          {answerStatus === 'timeout' && <p className="mt-3 fw-bolder text-warning">Time's up 😟</p>}
          <div className="w-100 mt-5 pt-3 d-flex flex-column ms-4 align-items-start">
            <h5>Instructions:</h5>
            <p className="fst-italic">Make sure to choose an answer for each question. After each question, there will be a short 3-second delay!</p>
            <p className="fst-italic">Quickly answer the question within the 10-second countdown.</p>
            {/* <p className="fst-italic">After each question, there will be a short 3-second delay. Take a deep breath and get ready for the next challenge!</p> */}
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" />
          <span className="ms-1">Loading Questions...</span>
        </div>
      )}
    </div>
  );
}

export default Quiz;
