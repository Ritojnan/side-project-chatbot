import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Chatbot from './Chatbot.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
<>
<Chatbot></Chatbot>
</>
  )
}

export default App
