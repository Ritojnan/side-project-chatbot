import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Chatbot from './Chatbot.jsx'
import nlp from 'compromise';

function App() {
  const [count, setCount] = useState(0)
  const [wordList, setWordList] = useState(['car', 'truck', 'bike', 'bus']);
  const [queryWord, setQueryWord] = useState('');

  const handleQueryWordChange = (event) => {
    setQueryWord(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const queryWordDoc = nlp(queryWord);
    const sortedWords = wordList.slice().sort((a, b) => {
      const aDoc = nlp(a);
      const bDoc = nlp(b);
      return bDoc.similarity(queryWordDoc) - aDoc.similarity(queryWordDoc);
    });
    setWordList(sortedWords);
  };

  return (
<>
<Chatbot></Chatbot>
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Query word:
          <input type="text" value={queryWord} onChange={handleQueryWordChange} />
        </label>
        <button type="submit">Sort by similarity</button>
      </form>
      <ul>
        {wordList.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
    </div>

</>
  )
}

export default App
