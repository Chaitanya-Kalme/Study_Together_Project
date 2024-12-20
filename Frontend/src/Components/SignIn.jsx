import React from 'react'

function SignIn() {
    let userName,email,password;

  return (
    <>
        <div className='lg:mt-28 mt-32 lg:mx-72 bg-green-200 border-4 border-blue-900 text-center '>
            <div className='p-2 mt-2 text-3xl border-spacing-1.5 border-black rounded-full '>
                <div className='text-center'>Sign In Page</div>
            </div>
            <div className='flex mx-5 lg:mx-52 space-x-10 p-2'>
                <div className='text-xl'>Enter the UserName:</div>
                <input type="text" className='bg-slate-50 text-xl md:whitespace-nowrap' value={userName}/>
            </div>
            <div className='flex mx-5 lg:mx-52 space-x-10 p-2'>
                <div className='text-xl'>Enter the Email:</div>
                <input type="text" className='bg-slate-50 text-xl md:whitespace-nowrap' value={email}/>
            </div>
            <div className='flex mx-5 lg:mx-52 space-x-10 p-2'>
                <div className='text-xl'>Enter the Password:</div>
                <input type="password" className='text-xl bg-slate-50  md:whitespace-nowrap' value={password}/>
            </div>
            <div className='flex mx-5 lg:mx-52 space-x-10 p-2'>
                <div className='text-xl'>Avatar File:</div>
                <input type="file" className='text-xl bg-slate-50 md:whitespace-nowrap'/>
            </div>
            <button id='Submit_btn' className='border-2 border-black px-2 text-2xl bg-white my-2 hover:bg-blue-200 rounded-lg duration-200'>Sumbit</button>
        </div>
    </>
  )
}

export default SignIn