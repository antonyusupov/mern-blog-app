import { Link } from "react-router-dom"
import { useLogout } from '../customHooks/useLogout';
import { useAuthContext } from '../customHooks/useAuthContext';
// import {CreateBlog} from "../pages/CreateBlog";

const Navbar = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()


  const handleLogout = () => {
    logout()
  }

  return (
    <div className="text-white flex justify-evenly w-full items-center py-8 bg-slate-700 px-3 rounded-b-lg">
      <div className="w-1/4 ">
        <Link className="text-orange-400 font-bold text-lg" to='/'>Home</Link>
      </div>
      {user && (
        <div className="logout flex justify-end items-center w-3/4">
          <strong className="mr-4">{user.username}</strong>
          <Link className="mr-8" to='/create'>Create Blog</Link>
          <button className="text-red-400" onClick={handleLogout}>Logout</button>
        </div>
        )}
      {!user && (
      <div className="flex justify-end w-3/4">
        <Link className="mr-5" to='/login'>Log in</Link>
        <Link className="ml-5" to='/signup'>Signup</Link>
      </div>
      )}
    </div>
  )
}

export default Navbar