
import './App.css';
import { useState,useEffect } from 'react';
import SingleCard from './components/SingleCard';


const cardImages = [
    {"src":"/img/helmet-1.png",matched:false},
    {"src":"/img/potion-1.png",matched:false},
    {"src":"/img/ring-1.png",matched:false},
    {"src":"/img/scroll-1.png",matched:false},
    {"src":"/img/shield-1.png",matched:false},
    {"src":"/img/sword-1.png",matched:false},
]
//outside of the compoennt so that they wont be recerated


function App() {
  const[cards,setCards] = useState([])
  const[turns,setTurns] = useState(0)
  const[choiceOne,setChoiceOne] = useState(null)
  const[choiceTwo,setChoiceTwo] = useState(null)
  const[disabled,setDisabled] = useState(false)
  //shuffle cards
  const shuffleCards = () =>{
    const shuffledCards = [...cardImages,...cardImages] //making two sets with the single set   
    .sort(()=>Math.random()-0.5)//firea a function for each pair in the array if its less than 0 order remains same else its mixed up
    .map((card)=>({...card,id:Math.random() })) // fire a function to add id to each prperty 
    setChoiceOne(null) //sets the turn one to null
    setChoiceTwo(null) ////sets the trun two to null
    setCards(shuffledCards) //update the cards state here   
    setTurns(0) //set the number of turns back to sero 
  }
 
  ///handle a choice
  const handleChoice = (card)=>{
    choiceOne?setChoiceTwo(card):setChoiceOne(card)
  }

//compare 2 selected cards, we use useeffect because it fires the function when every our depedency changes
  useEffect(()=>{
    if(choiceOne && choiceTwo){ //once we have the vlaue for choiceobe and two then enable it 
      setDisabled(true)
      if(choiceOne.src==choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card=>{
            if(card.src===choiceOne.src){ //here we are chaning the value of cards that match the id of one 
              return {...card,matched:true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        setTimeout(()=>resetTurn(),1000)
        
      }
    }
  
  },[choiceOne,choiceTwo])

  //reset choices & increase turn
const resetTurn = () =>{
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns=>prevTurns + 1)
  setDisabled(false)
}


useEffect(()=>{
  shuffleCards()
},[])

  console.log(cards,turns)
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards} >New Game</button>

      <div className="card-grid" >
      {cards.map(card=>(
        // <div className="card"  key={card.id} >
        //     <div>
        //       <img className="front" src={card.src} alt="card front" />
        //       <img className="back" src="/img/cover.png" alt="" alt="card back"/>

        //     </div>
        // </div>
        <SingleCard  
        key={card.id} 
        card={card} 
        handleChoice={handleChoice} 
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
        /> //creating a grids with the cards
      ))}

      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
