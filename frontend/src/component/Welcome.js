import React from 'react'

import { useUserContext } from '../context/userContext';
import { UserContext } from '../context/userContext';

const Welcome = () => {
    const {user} = useUserContext(UserContext);
  return (
    <div>Welcome {user.name}</div>
  )
}

export default Welcome