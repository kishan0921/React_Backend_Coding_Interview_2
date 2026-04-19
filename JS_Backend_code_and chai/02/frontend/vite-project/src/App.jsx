import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  // State to hold jokes , intitially an empty array
  const [jokes, setJokes] = useState([])


  // UseEffect 
  // use effect ke ander 1 callback hota hai, and ek dependency array
  useEffect ( () => {

    // Why we used axios ?
    // Note: jo response me data aata hai, ussko 
    // .json warega me convert nahi krna pad raha hai.


    // 01- axios se get request kari url pe
    // axios.get('http://localhost:3000/api/jokes')
    
    // new method , ab proxies set kro, vite.config.js me 
    // so that we can use relative path
    // and not hardcode the URL

    // Note: jab bhi /api hogi to append ho jaayegi localhost:3000 se
    axios.get('/api/jokes')
      .then(response => {
        // 02- response se data ko access kiya
        setJokes(response.data)
      })
      .catch(error => {
        console.error('Error fetching jokes:', error)
      })

  }, [] );





  return (
    <>
    <h1>Chai and full Stack</h1>
    <p>Jokes: {jokes.length}</p>

    
    {
      jokes.map((joke, index) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
    ))
  }
    </>
  )
}

export default App
