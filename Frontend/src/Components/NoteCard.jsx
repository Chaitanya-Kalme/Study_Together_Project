import React from 'react'

function NoteCard({
    notesId,
    chapterName,
    subjectName,
    notesFile
}) {
    return (
        <>
            <div className='bg-green-200 border-4 border-yellow-400 p-2  lg:w-[50%]' onClick={() => console.log(notesId)}>
                <div className='font-bold italic'>Chapter: {chapterName}</div>
                <div>Subject: {subjectName}</div>
                <iframe src={`/api/v1/getFile/${notesFile}` + '#zoom=100'} width="100%" height="600px" title="PDF Viewer"></iframe>
            </div>
        </>
    )
}

export default NoteCard