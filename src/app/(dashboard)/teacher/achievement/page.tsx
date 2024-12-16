import React from 'react'
import Search from './components/SearchBar'
import AchievementList from './components/achievementList'

export default function page() {
  return (
    <div>
        <h1>Teacher Achievement Page</h1>
        <Search placeholder='Search...' />
        <AchievementList query='' currentPage={1} />

    </div>
  )
}
