import Navbar from './components/Navbar.jsx'
import React from 'react'
import Manager from './components/Manager.jsx'
import Footer from './components/Footer.jsx'

function App() {

  return (
    <>
      <Navbar />
      <div className='[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#16a34a_100%)] pb-1'>
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
