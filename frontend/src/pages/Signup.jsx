import { useState } from 'react'
import { useSignup } from '../customHooks/useSignup'

const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, email, password)
    }

  return (
    <div className='text-white w-full flex justify-center items-center'>
        <form className='flex flex-col w-full md:w-2/4' onSubmit={handleSubmit}>
            <h3 className='text-2xl my-8'>Sign Up</h3>
            <label className='my-2'>Username</label>
            <input 
                type="text"
                onChange={(e)=>{setUsername(e.target.value)}}
                value={username} 
                className='text-black outline-none px-2 w-full rounded-lg my-2'
            />
            <label className='my-2'>Email</label>
            <input 
                type="text"
                onChange={(e)=>{setEmail(e.target.value)}}
                value={email} 
                className='text-black outline-none px-2 w-full rounded-lg my-2'
            />
            <label className='my-2'>Password</label>
            <input 
                type="password"
                onChange={(e)=>{setPassword(e.target.value)}}
                value={password} 
                className='text-black outline-none px-2 w-full rounded-lg my-2'
            />
            <button className='my-4 border p-2 border-neutral-400 text-lg font-semibold outline-none rounded-xl' disabled={isLoading}>Sign up</button>
            {error && <div className='text-xl text-red-500'>{error}</div>}
        </form>
    </div>
  )
}

export default Signup