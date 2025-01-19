import React, { useState } from 'react'
import notesService from '../Services/notesService'
import { useSelector } from 'react-redux'

export default function UploadNotes() {
    const [subject, setSubject] = useState("")
    const [chapter,setChapter] = useState("")
    const [notesUploaded, setNotesUploaded] = useState(false)
    const [notesFile,setNotesFile] =useState(null)
    const [isVisible,setIsVisible] = useState(false)
    const data= useSelector((state) =>state.auth.userData)

    const takeNotesAndUpload = (e) => {
        e.preventDefault()
        if (subject === "" && chapter === "") {
            setIsVisible(true)
        }
        else {
            setIsVisible(false)
            const response = notesService.uploadNotes(chapter,subject,notesFile)
            .then(() =>{
                setNotesUploaded(true)
            })
            .catch(() => setNotesUploaded(false))
        }
    }
    
    if(data==null){
        return (
            <div className='text-4xl font-bold italic text-center pt-10 items-center mt-10'>Login is Required to Upload the Notes</div>
        )
    }


    return (
        <form onSubmit={takeNotesAndUpload} className="bg-blue-200 p-4 justify-center text-center space-y-4 mb-10">
            <div className="text-2xl font-semibold italic font-serif space-y-5 py-5">Upload Notes: </div>
            <div className="flex justify-between gap-x-5 ">
                <div className="w-7/12 space-y-5">
                    <div className="text-2xl  md:whitespace-nowrap text-center rounded-full font-serif italic">Subject Name:</div>
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject Name" className="border-2 border-black text-center bg-blue-100 w-10/12 rounded-2xl p-1" />
                </div>
                <div className="w-7/12 space-y-5">
                    <div className="text-2xl md:whitespace-nowrap text-center rounded-full font-serif italic">Chapter Name:</div>
                    <input type="text" value={chapter} onChange={(e) => setChapter(e.target.value)} placeholder="Chapter Name" className="border-2 border-black text-center bg-blue-100 w-10/12 rounded-2xl p-1" />
                </div>
                <div className="w-7/12 space-y-5">
                    <div className="text-2xl md:whitespace-nowrap text-center rounded-full font-serif italic">Notes File:</div>
                    <input id="notesFile" type="file" className="border-2 border-black text-center bg-blue-100 w-10/12 rounded-2xl p-1" onChange={(e) => setNotesFile(e.target.files[0])} />
                </div>
            </div>
            <button type="submit" className="border border-black px-2 py-1 text-2xl bg-orange-200 rounded-md hover:bg-purple-300 hover:duration-200 ">Submit</button>
            {isVisible === true &&
                <div className="font-bold italic text-xl">Subject or Chapter or Note File is Required.</div>
            }
            {notesUploaded && <div className="font-bold italic text-xl">Notes Uploaded Successfully</div>}
        </form>
    )
}

