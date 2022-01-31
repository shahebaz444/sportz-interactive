import React from 'react'
import PlayerComponent from './PlayerComponent'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const PlayersList = () => {
  const {players, loading} = useGlobalContext();
  if(loading)
    return <Loading />
  
  if(players.length<1)
    return(
      <h2 className='section-title'>
        No Player matched Your Search
      </h2>
    );
  return(
    <section className='section'>
      <h2 className="section-title">
      players
      </h2>
      <div className="players-center">
        {players.map((item)=>{
          return <PlayerComponent key={item.id} {...item}/>
        })}
      </div>
    </section>
  )

}

export default PlayersList
