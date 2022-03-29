import './App.css';
import React, { useEffect, useState } from "react";
import SingleCard from './components/SingleCard';
const cardImages=[

  {"src":"/img/daisy.jpg",matched:false},
  {"src":"/img/mario-green.jpg",matched:false},
  {"src":"/img/baby.jpg",matched:false},
  {"src":"/img/mario-red.jpg",matched:false},
  {"src":"/img/mario-boss.jpg",matched:false},
  {"src":"/img/yoshi.jpg",matched:false}
] 

function App() {
  
  const [cards,setCards]=useState([])
  const [turns,setTurns]=useState(0)

  const [choiceOne,setChoiceOne]=useState(null)
  const [choiceTwo,setChoiceTwo]=useState(null)
  const [disabled,setDisabled]=useState(false)

  const shuffleCards=()=>{
    const shffledCards=[...cardImages, ...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card, id:Math.random()}))
    setCards(shffledCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
  }

//handle a choice
  const handleChoice=(card)=>{
    choiceOne?setChoiceTwo(card):setChoiceOne(card)
  }
//reset choice and incease turn
  const resetTurn=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn=>prevTurn+1)
    setDisabled(false)
  }


//compare 2 selected cards
  useEffect(()=>{
    
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src==choiceTwo.src){
        //console.log("match")
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src===choiceOne.src){
              return {...card, matched:true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        //console.log("not match")
        setTimeout(()=>  resetTurn(),1000)
      }
    }

  },[choiceOne,choiceTwo])
  console.log(cards)

  //start a new game automatically 

  useEffect(()=>{
              shuffleCards()
  },[])
  return (
    <div className="App">
     <h1>Super Mario Memory Match</h1>
    <button onClick={shuffleCards}>New Game</button>
    <div className="card-grid">
      {cards.map( card=>(
        <SingleCard 
        key={card.id} 
        card={card}
        handleChoice={handleChoice}
        flipped={card===choiceOne || card===choiceTwo || card.matched}
        disabled={disabled}
        />
     ))}
    </div>
    <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
