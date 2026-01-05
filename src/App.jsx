import { useState } from 'react'
import UserForm from './features/users/components/UserForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UserForm></UserForm>
      <h1>welcome</h1>
    </>
  )
}

export default App
