import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import ProtectedRoute from './components/protectedroute';
import Home from './pages/home';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
