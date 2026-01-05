import { useState } from 'react'
import UserForm from './features/users/components/UserForm'
import UserList from './features/users/pages/UserList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <UserForm></UserForm> */}
      <UserList></UserList>
      <h1>welcome</h1>
    </>
  )
}

export default App
