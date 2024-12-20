import { Outlet } from 'react-router'
import './App.css'
import Footer from './Components/Footer.jsx'
import Navbar from './Components/Navbar.jsx'

function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
