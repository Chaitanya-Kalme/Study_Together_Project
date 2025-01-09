import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import authService from '../Services/authService'
import { login as authLogin} from '../store/authSlice'
import { useDispatch } from 'react-redux'
 

function SignIn() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate= useNavigate()
    const dispatch= useDispatch()

    const submitForm = (e) => {
        e.preventDefault();


        const avatarFile = document.querySelector('#avatar')
        
        authService.createAccount(email,password,userName,avatarFile.files[0])
        .then((response) =>{
            const userData= response.data;
        
            if(userData){
                dispatch(authLogin(userData))
                window.alert("User Logged In Successfully")
                navigate('/profile')
            }
            else{
                console.error("Error while Sign In ")
            }

        })
        .catch((error) =>{
            console.error(error)
        })
        

        
    }


    return (
        <>
            <form onSubmit={submitForm} id='register_form'>
                <div className='lg:mt-28 mt-32 lg:mx-72 bg-green-200 border-4 border-blue-900 text-center mb-5'>
                    <div className='p-2 mt-2 text-3xl border-spacing-1.5 border-black rounded-full '>
                        <div className='text-center'>Sign In Page</div>
                    </div>
                    <div className='flex mx-5 lg:mx-52 space-x-10 p-2'>
                        <div className='text-xl'>Enter the UserName:</div>
                        <input type="text" className='bg-slate-50 text-xl md:whitespace-nowrap' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className='flex mx-5 lg:mx-52 space-x-10 p-2'>
                        <div className='text-xl'>Enter the Email:</div>
                        <input type="text" className='bg-slate-50 text-xl md:whitespace-nowrap' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex mx-5 lg:mx-52 space-x-10 p-2'>
                        <div className='text-xl'>Enter the Password:</div>
                        <input type="password" className='text-xl bg-slate-50  md:whitespace-nowrap' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='flex mx-5 lg:mx-52 space-x-10 p-2'>
                        <div className='text-xl'>Avatar File:</div>
                        <input type="file" className='text-xl bg-slate-50 md:whitespace-nowrap' id='avatar' />
                    </div>
                    <button id='Submit_btn' type='sumbit' className='border-2 border-black px-2 text-2xl bg-white my-2 hover:bg-blue-200 rounded-lg duration-200' >Submit</button>
                    <div className='space-x-10  text-2xl  flex-wrap flex text-center justify-center'>
                        <div className='py-2'>Already have an account?</div>
                        <button type='sumbit' className='border-2 border-black px-2 text-2xl bg-white my-2 hover:bg-blue-200 rounded-lg duration-200' onClick={() => navigate('/login')}>Login</button>

                    </div>
                    
                </div>
            </form>
        </>
    )
}

export default SignIn