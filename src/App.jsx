import { useState } from 'react'
import Tmain from './components/Tmain'
 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Tmain/>
    </>
  )
}

export default App
