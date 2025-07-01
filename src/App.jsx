import { useState } from 'react'
import {Fruteria, Timer} from './Fruteria.jsx'
import './App.css'

function App() {

  return (
    <>
      <header className="bg-dark text-white">
        <h1>¡Bienvenido a nuetra Fruteria!</h1> <br />
        <p>Actualmente son las: </p> <Timer />
      </header>
      <Fruteria/>
    </>
  )
}

export default App
