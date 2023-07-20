import './App.css'
import Home from './pages/Home'
import JobDetails from './pages/JobDetails'
import { Routes, Route } from "react-router-dom"


function App() {
 

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/job/:id" element={<JobDetails/>} />
      </Routes>
    </div>
  )
}

export default App
