'use client'
import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const signup = () => {

    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup Success", response.data);
            router.push('/login')
            toast.success("Signup Success")
            
        } catch (error:any) {
            console.log("Signup failed");
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        }
        else{

            setButtonDisabled(true)  
        }
    }, [user])

  return (
    <div className=' flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{loading? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='username'
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder='username'
        type="text" />
        <label htmlFor="username">email</label>
        <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='email'
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder='email'
        type="text" />
        <label htmlFor="password">password</label>
        <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='password'
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder='password'
        type="password" />
        <button
        onClick={onSignup}
        className='p-2 border-none bg-orange-600 rounded-lg hover:bg-orange-700 active:bg-orange-900 focus:outline-none focus:ring focus:ring-orange-400  '
        >{buttonDisabled? "Fill the form": "signup"}</button>
        <h2 className='p-2'>Already signed in?</h2><Link
        className='text-blue-500'
         href="/login">Login</Link>
    </div>
  )
}

export default signup