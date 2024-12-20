import React, { useState } from 'react'
import { FiAlignJustify } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { NavLink } from 'react-router';



function Navbar() {

    const [isVisible,setIsVisible]=useState(false)

    const toogleVisibility = () =>{
        setIsVisible(!isVisible)
    }


    return (
        <>
            <div id='header' className="fixed bg-slate-400 p-4 flex w-full top-0 max-w-full font-serif">
                {/* LOGO Section */}
                <div id="Logo" className=' font-serif text-2xl italic font-bold border-black border-2 p lg:whitespace-nowrap p-2 w-1/3 text-center hover:bg-red-100 rounded-3xl hover:duration-300'>Study Together</div>

                {/* Side Bar Section */}
                <div className='w-full justify-end cursor-pointer hidden lg:flex '>
                    <NavLink to='/' id="HomeBtn" className={({isActive}) => `rounded-3xl p-2 text-2xl  hover:bg-blue-100 duration-300 ${isActive? "text-white":"text-black"}`}>Home</NavLink>
                    <NavLink to='/notes' id="notes_Btn" className={({isActive}) => `rounded-3xl p-2 text-2xl  hover:bg-blue-100 duration-300 ${isActive? "text-white":"text-black"}`}>Notes</NavLink>
                    <NavLink to='/lectures' id="lectures_Btn" className={({isActive}) => `rounded-3xl p-2 text-2xl  hover:bg-blue-100 duration-300 ${isActive? "text-white":"text-black"}`}>Lectures</NavLink>
                    <NavLink to='/about' id="AboutBtn" className={({isActive}) => `rounded-3xl p-2 text-2xl  hover:bg-blue-100 duration-300 ${isActive? "text-white":"text-black"}`}>About</NavLink>
                    <NavLink to='/contact' id="contact_us_Btn" className={({isActive}) => `rounded-3xl p-2 text-2xl  hover:bg-blue-100 duration-300 ${isActive? "text-white":"text-black"}`}>Contact Us</NavLink>
                    <NavLink to='/signIn' className={({isActive}) =>`border-2 border-black rounded-3xl px-4 py-2 ${isActive? "text-white" :"text-black"} hover:bg-blue-100 duration-300 flex space-x-2 mx-2`}>
                        <MdOutlineAccountCircle className='text-3xl '/>
                        <div id="signIn_Btn" className='text-right text-2xl'>Sign In</div>
                    </NavLink>
                </div>
                <div className='w-full justify-items-end lg:hidden'>
                    <div className='text-right rounded-full text-4xl p-2 hover:bg-blue-100' onClick={toogleVisibility}>
                        <FiAlignJustify />
                    </div>
                    
                </div>
            </div>
            {isVisible && (
                <div className='flex-col justify-items-end text-center bg-orange-300 lg:hidden absolute right-0 sm:mt-16'>
                    <div id="HomeBtn1" className='rounded-3xl p-2 text-2xl  hover:bg-green-100 duration-300'>Home</div>
                    <div className="w-full border-b-2 border-black my-2"></div>
                    <div id="notes_Btn1" className='rounded-3xl p-2 text-2xl text-right hover:bg-green-100 duration-300'>Notes</div>
                    <div className="w-full border-b-2 border-black my-2"></div>
                    <div id="lectures_Btn1" className='rounded-3xl p-2 text-2xl text-right hover:bg-green-100 duration-300'>Lectures</div>
                    <div className="w-full border-b-2 border-black my-2"></div>
                    <div id="AboutBtn1" className='rounded-3xl p-2 text-2xl text-right hover:bg-green-100 duration-300'>About</div>
                    <div className="w-full border-b-2 border-black my-2"></div>
                    <div id="contact_us_Btn1" className='rounded-3xl p-2 text-2xl text-right hover:bg-green-100 duration-300'>Contact Us</div>
                    <div className="w-full border-b-2 border-black my-2"></div>
                    <div className='rounded-3xl px-4 py-2 hover:bg-green-100 duration-300 flex space-x-2 text-right'>
                        <MdOutlineAccountCircle className='text-3xl text-right'/>
                        <div id="signIn_Btn1" className='text-right text-2xl'>Sign In</div>
                    </div>
                    
                </div>
            )}
        </>
    )
}

export default Navbar