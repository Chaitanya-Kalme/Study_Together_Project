import React from 'react'

function Footer() {
  return (
    <>
        <div id='Footer' className='flex bottom-0 text-center justify-center bg-gray-500 w-full p-4 lg:gap-36 md:gap-20 sm:gap-5'>
            {/* Logo Section */}
            <div id='Logo' className='lg:whitespace-nowrap lg:text-2xl sm:text-xl text-blue-900 font-bold italic uppercase'>
              <div className='border-green-800 border-4 p-3 bg-orange-400'>Study Together</div>
            </div>
            {/* Quick Links Sections */}
            <div id='quick_link' className='flex-col'>
              <div className='lg:text-2xl sm:text-xl border-4 border-red-900 bg-lime-400 text-sky-600 p-3'>Quick Links</div>
              <div className='text-white hover:cursor-pointer hover:bg-blue-300 hover:rounded-full hover:duration-300 '>Home</div>
              <div className='text-white hover:cursor-pointer hover:bg-blue-300 hover:rounded-full hover:duration-300 '>Notes</div>
              <div className='text-white hover:cursor-pointer hover:bg-blue-300 hover:rounded-full hover:duration-300 '>Lectures</div>
              <div className='text-white hover:cursor-pointer hover:bg-blue-300 hover:rounded-full hover:duration-300 '>About</div>
              <div className='text-white hover:cursor-pointer hover:bg-blue-300 hover:rounded-full hover:duration-300 '>Contact Us</div>
            </div>
            {/* Get in Touch */}
            <div>
              <div className='lg:text-2xl sm:text-xl text-red-900 border-blue-900 border-4 p-3 lg:whitespace-nowrap sm:whitespace-normal bg-teal-400'>Get in Touch</div>
              <div className='text-white hover:bg-blue-300 hover:text-red-900 hover:cursor-pointer hover:rounded-full'> support@gmail.com</div>
            </div>
        </div>
    </>
  )
}

export default Footer