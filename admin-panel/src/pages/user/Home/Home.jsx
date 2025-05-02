import React, { useState } from 'react'
import Header from '../../../components/user/Header/Header'
import ExploreMenu from '../../../components/user/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../../components/user/FoodDisplay/FoodDisplay'

const Home = () => {
  const [category,setCategory] = useState("All");
  return (
    <main className="container-fluid">
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
    </main>
  )
}

export default Home