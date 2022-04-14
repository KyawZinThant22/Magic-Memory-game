import React from 'react'
import './SingleCard.css'

const SingleCard = ({card, handleChoice, flipped, disable}) => {

    const handleClick = () => {
        if (!disable){
            handleChoice(card)
            
        }
    }
    
  return (
    <div className="card">
        <div className={flipped? "flipped" : ""}>
            <img src={card.src} alt='front card'  className='front'/>

            <img   
                className='back'
                src="./img/cover.png" 
                alt="back card" 
                onClick={handleClick}
            />

        </div>
    </div>
  )
}

export default SingleCard