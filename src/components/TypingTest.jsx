import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useReducer } from 'react';
import './style.css'

const paragraph = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, incidunt dolorem explicabo tempora iure, porro minus aperiam sed eius eveniet, nostrum ab cum ipsa vero sit quibusdam ut nesciunt tempore Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore delectus incidunt perferendis officia aliquid, eveniet in consequuntur nam itaque corrupti facilis ducimus! Nobis reprehenderit maxime cumque esse rerum vel voluptate'


const TypingTest = () => {
  
      const maxTime = 60;
      const [timeLeft, setTimeLeft] = useState(maxTime)
      const [mistakes, setMistakes] = useState(0)
      const [charIndex, setCharIndex] = useState(0)
      const [isTyping, setTyping] = useState(false)
      const [WPM, setWPM] = useState(0)
      const [CPM, setCPM] = useState(0)
      const inputRef = useRef(null)
      const charRefs = useRef([])
      const [correctWrong, setCorrectWrong] =useState([])
      


    useEffect(() => {
      inputRef.current.focus();
      setCorrectWrong(Array(charRefs.current.length),(''))
    }, []);
    
    useEffect(() => {
      let interval;
      if(isTyping && timeleft >0 ){
        internal = setInterval(()=>{

          setTimeLeft(timeLeft - 1);
          let correctChars = charIndex -mistakes;
          let totalTime = maxTime - timeLeft;

          let cpm = correctChars * ((60 / totalTime) * 60);
          cpm = cpm < 0 || ! cpm 
        })
      }
    }, [])
    const handleChange = (e) => {
      const characters = charRefs.current;
      const currentChar = charRefs.current[charIndex];
      let typedChar = e.target.value.slice(-1)
      if(charIndex < characters.length && timeLeft > 0){
        if(!isTyping){
          
          setIsTyping(true);
        }
        if(typedChar === currentChar.textContent){
          setCharIndex(charIndex + 1);
          correctWrong[charIndex] = "correct" 
         }else {
          setCharIndex(charIndex + 1);
          setMistakes(mistakes+ 1)
          correctWrong[charIndex] = "wrong" 
         }
         if(charIndex === characters.length -1) setTyping(false)
      }else{
        setTyping(false);
      }
    }
    return (
        <div className="container">
          <div className ="test">
            <input 
            type="text " 
            className='input-field' 
            ref={inputRef} 
            onChange={handleChange}
            />
        {paragraph.split("").map((char, index) => ( 
        <span className={'char $ {index === charIndex ? "active"  : ""}  ${correctWrong[index]}'}
        ref={(e) =>charRefs.current[index]= e}> {char}</span>
        ))}
        </div>
        <div className="result">
          <p>Time Left: <strong>{timeLeft}</strong></p>  
          <p>Mistakes:  <strong>{mistakes}</strong></p>
          <p>WPM: <strong>{WPM}</strong> </p>
          <p>CPM:  <strong>{CPM}</strong></p>
          <button  className='btn'>Try Again</button>  
        </div>
    </div>
  )
}

export default TypingTest