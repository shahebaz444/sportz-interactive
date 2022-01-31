import React from 'react'
import moment from 'moment';

const PlayerComponent = ({id, name, SkillDesc,  Team, Value, nextMatch} ) => {
  const {CCode, VsCCode,MDate} = nextMatch;
  let localDate=new Date();
  if(MDate){
    let tempDate = new Date(MDate+ ' UTC');
    localDate = moment(tempDate).local().format('DD-MM-YYYY h:mm:ss a');
  }
  let path = '' ;
  try {
     path=require('./player-images/'+id+ '.jpg');    
  } catch (error) {
    path=require('./player-images/'+'1'+ '.jpg');    
  }
  return (
    <article className="player">
      <div className="img-container">
        <img src={path} alt={name} />
      </div>
      <div className="player-footer">
        <h3>{name}</h3>
        <h4><span>Team: </span>{Team}</h4> 
        <h4><span>Position: </span>{SkillDesc}</h4> 
        <hr />
        <h4><span>Market Value: </span>${Value}</h4> 
        {CCode && <>
        <hr />
        <h4><span>Next Match: </span>{CCode} vs {VsCCode}</h4> 
        <h4><span>Date: </span>{localDate}</h4> </>}



      </div>
    </article>
  )
}

export default PlayerComponent
