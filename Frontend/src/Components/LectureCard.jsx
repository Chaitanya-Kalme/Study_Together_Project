import React from 'react'

function LectureCard({
    id,
    chapterName,
    subjectName,
    thumbnail,
    videoFile,
}) {
    return (
        <div className='bg-green-200 border-4 border-yellow-400 p-2 w-full lg:w-[40%]'>
            <div className='flex text-center ml-auto'>
                <div className='text-center justify-center w-full ml-5'>
                    <div className='font-bold italic'>Chapter: {chapterName}</div>
                    <div>Subject: {subjectName}</div>
                </div>
                <div className='ml-auto '>
                    <button className='border-2 border-black p-1 text-2xl hover:bg-orange-400 rounded-lg' onClick={() => window.open(`/api/v1/getFile/${videoFile}`, '_blank')}>Open</button>
                </div>

            </div>
            <img src={`/api/v1/getFile/${thumbnail}`} className='left-2 w-full p-2' />
        </div>
    )
}

export default LectureCard