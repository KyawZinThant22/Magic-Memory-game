import { useEffect, useState } from 'react/cjs/react.development';
import './App.css'
import SingleCard from './Components/SingleCard/SingleCard';


const cardImages = [
  { "src": "/img/helmet-1.png" , matched : false },
  { "src": "/img/potion-1.png" , matched : false },
  { "src": "/img/ring-1.png" , matched : false },
  { "src": "/img/scroll-1.png" , matched : false },
  { "src": "/img/shield-1.png" , matched : false },
  { "src": "/img/sword-1.png" , matched : false },
]

function App() { 
  
  
  const [cards , setCards] = useState([])
  const [turns , setTurns] = useState(0)
  const [choiceOne , setChoiceOne] = useState(null)
  const [choiceTwo , setChoiceTwo] = useState(null)
  const [disable , setDisable ] = useState(false)


  // shuffle cards

  const shuffleCards = () => {
    const shufflecards = [...cardImages , ...cardImages]
    .sort(() =>Math.random() - 0.5)
    .map((card) => ({...card , id : Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)

    setCards(shufflecards)
    setTurns(0)
  }


  // handle choice
  
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)  
  }

  // compare two cards

  useEffect (() => {
    if ( choiceOne && choiceTwo){
      setDisable(true)
      
      if ( choiceOne.src === choiceTwo.src){
        setCards ( prevCard => (
          prevCard.map((card) => {
            if (card.src === choiceOne.src){
              return {...card , matched : true}

            }else{
              return card
            }
          })
        ))
        resetTurn()
      }else {
          setTimeout(() => {

            resetTurn()
            
          }, 1000);
      }
    }
  }, [choiceOne , choiceTwo])



  // first vison of game

  useEffect(() => {
    shuffleCards()
  },[])


  // reset the turn 

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns( prev => prev + 1)
    setDisable(false)
  }
  

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grids">

        {cards.map((card) => (

          <SingleCard 

            card = {card}
            key = {card.id}
            handleChoice = {handleChoice}
            flipped = { card === choiceOne || card === choiceTwo || card.matched}
            disable = {disable}          
        />
        ))}

      </div>

      <p>Turns : {turns}</p>
    </div>
  );
}

export default App