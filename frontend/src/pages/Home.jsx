import { useEffect } from 'react';
import { useAuthContext } from '../customHooks/useAuthContext';
import { useBlogContext } from '../customHooks/useBlogContext';


import  BlogDetails from "../components/BlogDetails";


const Home = () => {
  
  const { blogs, dispatch } = useBlogContext();
  const { user } = useAuthContext();


  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/blogs')
      const json = await response.json()

      if(!response.ok) {
        console.log(json.error)
      }
      if(response.ok) {
        dispatch({type: 'SET_BLOG', payload: json})
      }
    }
  
    fetchBlogs()
  }, [dispatch, user])
  return (
    <div className=" flex flex-col text-white">
      <div className='flex flex-col mt-11 mb-8'>
        <h1 className='text-4xl my-10 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>Welcome to BLOG Start</h1>
        <p className='text-xl leading-8 my-8 text-center'>Start Blogging easy and fast. It is the <span className='text-green-800 text-2xl font-semibold'>MERN</span> stack project you can start your Blog by Signing up!</p>
        <span className=" inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
      </div>
      <div className='w-full flex flex-col my-10'>
      {blogs && blogs.map(blog => (
          <BlogDetails props ={ blog } key={blog._id} />
        ))}
      </div>
    </div>
  )
}

export default Home