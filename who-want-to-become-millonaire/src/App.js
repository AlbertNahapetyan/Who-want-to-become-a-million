import './App.css';
import Wrapper from './UI/Wrapper/Wrapper';
import Card from './UI/Card/Card';
import Text from './Components/Text/Text';
import List from './Components/List/List';
import Listitem from './Components/Listitem/Listitem';
import Button from './Components/Button/Button'
import { useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';


const App = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState({question: "Which is not JS data type?", answers: ["Symbol", "Text", "begint", "undefined"], trueAnswer: "Text"});
  const questions = [
    {question: "Output of this code? 0.1 + 0.2 === 0.3", answers: ["false", "NaN", "true", "undefined"], trueAnswer: "false"},
    {question: "Output of this code? null == undefined", answers: ["true", "false", "NaN", "error"], trueAnswer: "true"},
    {question: "Output of this code? let y = 1; let x = y = 2; console.log(x)", answers: ["2", "1", "undefined", "NaN"], trueAnswer: "2"},
    {question: "Output of this code? null + true + 1", answers: ["NaN", "0", "3", "2"], trueAnswer: "2"},
    {question: "HTML is abbreviated:", answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Homepage Transform Making Language"], trueAnswer: "Hyper Text Markup Language"},
    {question: "Which is the deprecated way of declaring variables in JS?", answers: ["let", "int", "const", "var"], trueAnswer: "var"},

  ]
  const money = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000]
  const [yourMoney, setYourMoney] = useState(0);
  const [checkGet, setCheckGet] = useState(true);
  const [getAnswer, setGetAnswer] = useState(`Get Answer`);
  const [check50, setCheck50] = useState(false);
  const [check, setCheck] = useState(true);
  const [swapQuestion, setSwapQuestion] = useState(true)

  const checkAnswer = (event) => {
      if(event.target.innerHTML === question.trueAnswer) {
          setYourMoney(yourMoney + money[index])
          setQuestion(questions[index])
          setIndex(index + 1);
          setCheck50(false);
          if(getAnswer !== `Get Answer`) {
            setGetAnswer(`Get Answer`)
          }
      } else {
        setQuestion(`You Lose`)
      }
  }

  const takeMoney = () => {
      setQuestion(`You have taken : ${yourMoney}$`)
  }


  const getAnswerFunc = () => {
    if(checkGet && typeof question === `object`) {
      setCheckGet(false);
      setGetAnswer(question.trueAnswer)
    }
  }

  const findWrong = () => {
    if(typeof question === `object`) {
      const random = Math.round(Math.random() * 3);
      if(question.answers[random] !== question.trueAnswer) {
        return random
      } else {
        return findWrong()
      }
    }
  }

  const [wrongOne, setWrongOne] = useState(findWrong())

  const resetGame = () => {
    setYourMoney(0)
    setQuestion({question: "Which is not JS data type?", answers: ["Symbol", "Text", "begint", "undefined"], trueAnswer: "Text"})
    setIndex(0);
    setCheck50(false);
    setCheckGet(true);
    setGetAnswer(`Get Answer`)
    setCheck50(false)
    setCheck(true)
  }

  const get50Func = () => {
    if(check && typeof question === `object`) {
      setWrongOne(findWrong())
      setCheck50(true);
      setCheck(false)
    }
  }

  const changeQuestion = () => {
      if(swapQuestion && typeof question === `object`) {
        setSwapQuestion(false);
        questions.splice(index, index + 1)
        setQuestion(questions[index])
      }
  }

  return (
    <Wrapper>
      <Card className='main'>
        <Card>
          <Card className="question">{typeof question === `object` ? question.question : question}</Card>
          <Card className="answers">
            {typeof question === `object`? 
            check50 ?
              question.answers.map((el, i) => {
                  if(el === question.answers[wrongOne] || el === question.trueAnswer) {
                    return(<Card onClick={checkAnswer} key={i}>{el}</Card>)
                  }  else {
                    return(<Card key={i}></Card>)
                  }
                })
            :
              question.answers.map((el, i) => {
              return(
                <Card onClick={checkAnswer} key={i}>{el}</Card>
              )
            }) : <Button onClick={resetGame}>Reset Game</Button>
            }
            {typeof question === `object` ? <Button className="button" onClick={takeMoney}>Take Money</Button> : null}
            <Card onClick={getAnswerFunc} className="help">{getAnswer}</Card>
            <Card className="help" onClick={get50Func}>50/50</Card>
            <Card className="help" onClick={changeQuestion}>Change Question</Card>
          </Card>
        </Card>
        <List className="wins">
          {money.map((el, i) => {
            if(i === index) {
              return( <Listitem key={i + 1} className="current listitem"> <Text className="win-number">{i + 1}</Text> {el}$</Listitem> )
            } else {
              return( <Listitem key={i + 1} className="listitem"> <Text className="win-number">{i + 1}</Text> {el}$</Listitem> )
            }
          })}
          <Listitem key="16" className="yourMoney">Your Money: {yourMoney}</Listitem>
        </List>
      </Card>
    </Wrapper>
  )
}

export default App;
