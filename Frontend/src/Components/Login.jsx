import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import authService from '../Services/authService'
import { login as authLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [data,setData]= useState(true)

    const submitForm = (e) => {
        e.preventDefault();
        authService.login(email, password)
        .then((response) => {
            const userData = response.data;
            if (userData) {
                dispatch(authLogin(userData))
                toast.success("User Logged In Successfully")
                setTimeout(() => {
                    navigate('/')
                }, 1000);

            }
            else {
                setData(false)
                toast.error("Login failed! Invalid credentials.");
            }
        })
        .catch((error) => {
            console.error("Error while login")
            toast.error("An error occurred while logging in.");
        })
    }
    useEffect(() =>{
        if(setData===false){
            return (
                <div>User Does not Exist</div>
            )
        }
    },[setData])

    return (
        <>
            <form onSubmit={submitForm} id='register_form' >
                <div className='lg:mt-28 mt-32 lg:mx-72 py-10 bg-green-200 border-4 border-blue-900 text-center space-y-2 mb-24'>
                    <div className='p-2 mt-2 text-3xl border-spacing-1.5 border-black rounded-full '>
                        <div className='text-center'>Log In Page</div>
                    </div>
                    <div className='flex mx-5 lg:mx-52 space-x-10 p-2'>
                        <div className='text-xl'>Enter the Email:</div>
                        <input type="text" placeholder='Enter your Email' className='bg-slate-50 text-xl md:whitespace-nowrap' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex mx-5 lg:mx-52 space-x-10 p-2'>
                        <div className='text-xl'>Enter the Password:</div>
                        <input type="password" placeholder='Enter your Password' className='text-xl bg-slate-50  md:whitespace-nowrap' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button id='Submit_btn' type='sumbit' className='border-2 border-black px-2 text-2xl bg-white my-2 hover:bg-blue-200 rounded-lg duration-200' >Submit</button>
                    <div className='space-x-10  text-2xl  flex-wrap flex text-center justify-center'>
                        <div className='py-2'>Do not have account?</div>
                        <button type='sumbit' className='border-2 border-black px-2 text-2xl bg-white my-2 hover:bg-blue-200 rounded-lg duration-200' onClick={() => navigate('/signin')}>SignUp</button>

                    </div>
                    {!data? <div className='text-xl font-bold w-full justify-center'>User Does not exist</div>: null}
                    
                </div>
            </form>
            <ToastContainer/>
        </>
    )
}

export default Login