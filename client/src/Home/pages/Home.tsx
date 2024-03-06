import React from 'react'
import { useUserStore } from '../../store'

export const Home = () => {

  const user = useUserStore( state => state.user );

  console.log(user);
  return (
    <div>Home</div>
  )
}
