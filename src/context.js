import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://api.npoint.io/20c1afef1661881ddc9c'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchterm, setSearchterm] = useState('a');
  const [totalPlayers, setTotalPlayers] = useState([]);
  const [players, setPlayers] = useState([]);

  const fetchDrinks = useCallback(async () =>{
    setLoading(true);

    const tempPlayers = totalPlayers.filter(player =>  player.Team.includes(searchterm) || player.name.includes(searchterm));
    if(tempPlayers){
      setPlayers(tempPlayers);
    }
    else{
      setPlayers([]);
    }
    setLoading(false); 
    try {
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  },[searchterm]);


  const getAllPlayers = async () => {
    const {playerList} = await fetch(`${url}`).then((data)=>data.json());
    let players = playerList.sort((a,b) => (parseInt(a.Value) > parseInt(b.Value)) ? 1 : ((parseInt(b.Value) > parseInt(a.Value)) ? -1 : 0));
    if(playerList){
      const sortedPlayers= playerList.map((item)=>{
        const {Id , Skill, PFName, TName, Value,SkillDesc, UpComingMatchesList} = item;
        return {id:Id, Skill, name:PFName, Team:TName, Value, SkillDesc,nextMatch: UpComingMatchesList[0]} 
      });
      setTotalPlayers(sortedPlayers);
      setPlayers(sortedPlayers);
    }
  }

  useEffect(() => {
    getAllPlayers();
    return () => {
      
    }
  }, []);

  useEffect(() => {
    fetchDrinks();
    return () => {
      
    }
  }, [searchterm, fetchDrinks]);



  return <AppContext.Provider value={{
    loading,  setSearchterm, players
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
