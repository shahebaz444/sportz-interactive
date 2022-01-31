import React from 'react'
import PlayersList from '../components/PlayersList'
import SearchForm from '../components/SearchForm'

const Home = () => {
  return (
    <main>
      <SearchForm />
      <PlayersList />
    </main>
  )
}

export default Home
