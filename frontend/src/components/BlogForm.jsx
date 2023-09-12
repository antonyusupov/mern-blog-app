import { useState } from "react";
import { useAuthContext } from "../customHooks/useAuthContext";
import { Navigate } from "react-router-dom";

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const { user } = useAuthContext()

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = user.username;
    const blog = {title, content, username}

    const response = await fetch('/api/blogs/create', {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()
    
    if(!response.ok) {
      setError(json.error)
    }

    if(response.ok) {
      setTitle('')
      setContent('')
      setError(null)
      setSubmitted(true)
    }

  }

  return (
    <div className="w-full flex justify-start items-center mt-10">
      <form className="flex flex-col justify-start w-full px-8" onSubmit={handleSubmit}>
        <h3 className="text-2xl my-5 text-center">Start Blogging</h3>

        <label className="text-lg my-2">Title</label>
        <input 
          type="text"
          onChange={(e)=> setTitle(e.target.value)}
          value={title} 
          className="text-black rounded-lg p-2 my-2 outline-none"
        />
        <label className="text-lg my-2">Content</label>
        <textarea
          cols="30" rows="10"
          onChange={(e)=> setContent(e.target.value)}
          value={content}
          className="text-black rounded-lg p-2 my-2 outline-none"
         ></textarea>

         <button className="mt-4 p-1 bg-orange-500 rounded-lg outline-none text-black font-semibold">Create</button>
         {error && <p className='text-xl text-red-500 mt-5'>{error}</p>}
         {submitted && <Navigate to={'/'} />}
      </form>
    </div>
  )
}

export default BlogForm