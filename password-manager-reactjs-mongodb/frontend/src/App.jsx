import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
Navbar
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="flex flex-col min-h-screen justify-between">

      <Navbar/>
      <Manager/>
      <Footer/>
    </div>
    </>
  )
}

export default App
