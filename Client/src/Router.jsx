import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Join from './Pages/Join'
import Chat from './Pages/Chat'

const Router = () => {

  const [userName, setUserName] = useState("");
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Join setUserName={setUserName} userName={userName} />} />
        <Route path='/chat' element={<Chat userName={userName} />} />
      </Routes>


    </>
  )
}

export default Router