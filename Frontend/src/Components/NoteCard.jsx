import React from 'react'
import { useNavigate } from 'react-router'

function NoteCard({
    notesId,
    chapterName,
    subjectName,
    notesFile
}) {
    const navigate= useNavigate()
    return (
        <>
            <div className='bg-green-200 border-4 border-yellow-400 p-2  lg:w-[50%]'>
                <div className='flex text-center ml-auto'>
                    <div className='text-center justify-center w-full ml-5'>
                        <div className='font-bold italic'>Chapter: {chapterName}</div>
                        <div>Subject: {subjectName}</div>
                    </div>
                    <div className='ml-auto '>
                        <button className='border-2 border-black p-1 text-2xl hover:bg-orange-400 rounded-lg' onClick={() => window.open(`/api/v1/getFile/${notesFile}`,'_blank')}>Open</button>
                    </div>

                </div>
                <iframe src={`/api/v1/getFile/${notesFile}` + '#zoom=100'} width="100%" height="600px" title="PDF Viewer"/>
            </div>
        </>
    )
}

export default NoteCard