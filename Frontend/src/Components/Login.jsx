import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import authService from '../Services/authService'
import { login as authLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'

function Login() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitForm = (e) => {
        e.preventDefault();
        authService.login(email, password)
        .then((response) => {
            const userData = response.data;
            if (userData) {
                dispatch(authLogin(userData))
                console.log(userData)

            }
            else {
                console.error("Error while login")
            }
        })
        .catch((error) => {
            console.error("Error while Login", error)
        })
    }
    

    return (
        <>
            <form onSubmit={submitForm} id='register_form' >
                <div className='lg:mt-28 mt-32 lg:mx-72 py-10 bg-green-200 border-4 border-blue-900 text-center space-y-2 mb-24'>
                    <div className='p-2 mt-2 text-3xl border-spacing-1.5 border-black rounded-full '>
                        <div className='text-center'>LogIn Page</div>
                    </div>
                    <div className='flex mx-5 lg:mx-52 space-x-10 p-2'>
                        <div className='text-xl'>Enter the Email:</div>
                        <input type="text" className='bg-slate-50 text-xl md:whitespace-nowrap' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex mx-5 lg:mx-52 space-x-10 p-2'>
                        <div className='text-xl'>Enter the Password:</div>
                        <input type="password" className='text-xl bg-slate-50  md:whitespace-nowrap' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button id='Submit_btn' type='sumbit' className='border-2 border-black px-2 text-2xl bg-white my-2 hover:bg-blue-200 rounded-lg duration-200' >Submit</button>
                    <div className='space-x-10  text-2xl  flex-wrap flex text-center justify-center'>
                        <div className='py-2'>Do not have account?</div>
                        <button type='sumbit' className='border-2 border-black px-2 text-2xl bg-white my-2 hover:bg-blue-200 rounded-lg duration-200' onClick={() => navigate('/signin')}>SignUp</button>

                    </div>
                    
                </div>
            </form>
        </>
    )
}

export default Login