import React from 'react'
import { useNavigate } from 'react-router'

function Footer() {

  const navigate= useNavigate()
  return (
    <>
        <div id='Footer' className='flex text-center justify-center bg-gray-500 w-full p-4 lg:gap-36 md:gap-20 sm:gap-5'>
            {/* Logo Section */}
            <div id='Logo' className='lg:whitespace-nowrap lg:text-2xl sm:text-xl text-blue-900 font-bold italic uppercase'>
              <div className='border-green-800 border-4 p-3 bg-orange-400 rounded-full'>Study Together</div>
            </div>
            {/* Quick Links Sections */}
            <div id='quick_link' className='flex-col'>
              <div className='lg:text-2xl sm:text-xl border-4 border-red-900 bg-lime-400 text-sky-600 p-3 rounded-full'>Quick Links</div>
              <div onClick={() => navigate('/')} className='text-white hover:cursor-pointer hover:bg-blue-300 hover:rounded-full hover:duration-300 '>Home</div>
              <div onClick={() => navigate('/notes')} className='text-white hover:cursor-pointer hover:bg-blue-300 hover:rounded-full hover:duration-300 '>Notes</div>
              <div onClick={() => navigate('/lectures')} className='text-white hover:cursor-pointer hover:bg-blue-300 hover:rounded-full hover:duration-300 '>Lectures</div>
              <div onClick={() => navigate('/about')} className='text-white hover:cursor-pointer hover:bg-blue-300 hover:rounded-full hover:duration-300 '>About</div>
              <div onClick={() => navigate('/contact_us')} className='text-white hover:cursor-pointer hover:bg-blue-300 hover:rounded-full hover:duration-300 '>Contact Us</div>
            </div>
            {/* Get in Touch */}
            <div className='flex-wrap '>
              <div className='lg:text-2xl sm:text-xl text-red-900 border-blue-900 border-4 p-3 bg-teal-400 rounded-full text-wrap'>Get in Touch</div>
              <div className='text-white hover:bg-blue-300 hover:text-red-900 hover:cursor-pointer hover:rounded-full text-wrap'> support@gmail.com</div>
            </div>
        </div>
    </>
  )
}

export default Footer