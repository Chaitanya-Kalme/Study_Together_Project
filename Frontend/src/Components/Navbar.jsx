import React, { useState } from 'react'
import { FiAlignJustify } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import LogoutBtn from './LogoutBtn';



function Navbar() {
    const [isVisible,setIsVisible]=useState(false)

    const authStatus = useSelector((state) => state.auth.status)
    const navigate= useNavigate()


    const toogleVisibility = () =>{
        setIsVisible(!isVisible)
    }


    return (
        <>
            <div id='header' className="fixed bg-slate-400 p-4 flex w-full top-0 max-w-full font-serif">
                {/* LOGO Section */}
                <div id="Logo" className=' font-serif text-2xl italic font-bold border-black border-2 p lg:whitespace-nowrap p-2 w-1/3 text-center hover:bg-red-100 rounded-3xl hover:duration-300' onClick={() => navigate('/')}>Study Together</div>

                {/* Side Bar Section */}
                <div className='w-full justify-end cursor-pointer hidden lg:flex space-x-1'>
                    <NavLink to='/' id="HomeBtn" className={({isActive}) => `rounded-3xl p-2 text-2xl  hover:bg-blue-100 duration-300 ${isActive? " border-white border-2 bg-orange-200":"text-black"}`}>Home</NavLink>
                    <NavLink to='/notes' id="notes_Btn" className={({isActive}) => `rounded-3xl p-2 text-2xl  hover:bg-blue-100 duration-300 ${isActive? " border-white border-2 bg-orange-200":"text-black"}`}>Notes</NavLink>
                    <NavLink to='/lectures' id="lectures_Btn" className={({isActive}) => `rounded-3xl p-2 text-2xl  hover:bg-blue-100 duration-300 ${isActive? " border-white border-2 bg-orange-200":"text-black"}`}>Lectures</NavLink>
                    <NavLink to='/about' id="AboutBtn" className={({isActive}) => `rounded-3xl p-2 text-2xl  hover:bg-blue-100 duration-300 ${isActive? " border-white border-2 bg-orange-200":"text-black"}`}>About</NavLink>
                    <NavLink to='/contact' id="contact_us_Btn" className={({isActive}) => `rounded-3xl p-2 text-2xl  hover:bg-blue-100 duration-300 ${isActive? " border-white border-2 bg-orange-200":"text-black"}`}>Contact Us</NavLink>
                    {authStatus? 
                    <div className='flex space-x-2'>
                        <NavLink to='/profile' id="contact_us_Btn" className={({isActive}) => `rounded-3xl p-2 text-2xl  hover:bg-blue-100 duration-300 ${isActive? "text- border-white border-2 bg-orange-200":"text-black"}`}>Profile</NavLink>
                        <LogoutBtn className='border-2 border-black rounded-3xl p-2 px-2 text-2xl  hover:bg-orange-400 duration-300 '/>
                    </div>:
                     <NavLink to='/signIn' className={({isActive}) =>`border-2 border-black rounded-3xl px-4 py-2 ${isActive? "text-white bg-blue-500" :"text-black"} hover:bg-blue-100 duration-300 flex space-x-2 mx-2`}>
                        <MdOutlineAccountCircle className='text-3xl '/>
                        <div id="signIn_Btn" className='text-right text-2xl'>Sign In</div>
                    </NavLink>}
                </div>
                <div className='w-full justify-items-end lg:hidden'>
                    <div className='text-right rounded-full text-4xl p-2 hover:bg-blue-100' onClick={toogleVisibility}>
                        <FiAlignJustify />
                    </div>
                    
                </div>
            </div>
            {isVisible && (
                <div className='flex-col justify-items-end text-center bg-orange-300 lg:hidden fixed right-0 mt-8 top-12' onClick={toogleVisibility}>
                    <NavLink to="/" id="HomeBtn1" className='rounded-3xl p-2 text-2xl  hover:bg-green-100 duration-300'>Home</NavLink>
                    <div className="w-full border-b-2 border-black my-2"></div>
                    <NavLink to="/notes" id="notes_Btn1" className='rounded-3xl p-2 text-2xl text-right hover:bg-green-100 duration-300'>Notes</NavLink>
                    <div className="w-full border-b-2 border-black my-2"></div>
                    <NavLink to="/lectures" id="lectures_Btn1" className='rounded-3xl p-2 text-2xl text-right hover:bg-green-100 duration-300'>Lectures</NavLink>
                    <div className="w-full border-b-2 border-black my-2"></div>
                    <NavLink to="/about" id="AboutBtn1" className='rounded-3xl p-2 text-2xl text-right hover:bg-green-100 duration-300'>About</NavLink>
                    <div className="w-full border-b-2 border-black my-2"></div>
                    <NavLink to="/contact" id="contact_us_Btn1" className='rounded-3xl p-2 text-2xl text-right hover:bg-green-100 duration-300'>Contact Us</NavLink>
                    <div className="w-full border-b-2 border-black my-2"></div>
                    {authStatus? 
                    <div className='w-full text-end'>
                        <NavLink to="/profile" id="contact_us_Btn1" className='rounded-3xl p-2 text-2xl text-right hover:bg-green-100 duration-300'>Profile</NavLink>
                        <div className="w-full border-b-2 border-black my-2"></div>
                        <LogoutBtn className='rounded-3xl p-2 text-2xl text-right hover:bg-red-400 duration-300 cursor-pointer'/>
                    </div>:
                    <NavLink to="/signIn" className='rounded-3xl px-4 py-2 hover:bg-green-100 duration-300 flex space-x-2 text-right'>
                        <MdOutlineAccountCircle className='text-3xl text-right'/>
                        <div id="signIn_Btn1" className='text-right text-2xl'>Sign In</div>
                    </NavLink>}
                    
                </div>
            )}
        </>
    )
}

export default Navbar