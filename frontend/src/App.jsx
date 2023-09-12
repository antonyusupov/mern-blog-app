import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import  Navbar from './components/Navbar';
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateBlog from './pages/CreateBlog';
import { useAuthContext } from './customHooks/useAuthContext';

function App() {

  const { user } = useAuthContext()


  return (
    <div className="flex flex-col bg-black w-full items-center justify-center px-7">
      <BrowserRouter>
        <Navbar /> 
        <div className='w-full'>
          <Routes>
            <Route path='/' element= {<Home />}/>
            <Route path='/login' element= {user ? <Navigate to={'/'}/> : <Login />}/>
            <Route path='/signup' element= {user ? <Navigate to={'/'} /> :<Signup />}/>
            <Route path='/create' element= {<CreateBlog />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
