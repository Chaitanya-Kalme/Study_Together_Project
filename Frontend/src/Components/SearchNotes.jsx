import React from 'react'
import NoteCard from './NoteCard'
import axios from 'axios'
import { useState } from 'react'

export default function SearchNotes() {
    const [notes, setNotes] = useState([])
    const [subject, setSubject] = useState("")
    const [chapter, setChapter] = useState("")
    const [isVisible, setIsVisible] = useState(false)

    const searchNotes = (e) => {
        e.preventDefault()
        if (subject === "" && chapter === "") {
            setIsVisible(true)
        }
        else {
            setIsVisible(false)
            axios.get(`/api/v1/notes/searchNotes/${subject}/${chapter}`)
                .then((response) => {
                    const notesResponse = response.data.data;
                    setNotes(notesResponse)
                })
        }
    }
    return (
        <div className="mt-10 md:mt-1 lg:mt-10 max-w-full">
            <form onSubmit={searchNotes} className="bg-blue-200 p-4 justify-center text-center space-y-4">
                <div className="text-2xl font-semibold italic font-serif">Search Notes By:</div>
                <div className="flex justify-between gap-x-5 ">
                    <div className="w-7/12 space-y-5">
                        <div className="text-2xl  md:whitespace-nowrap text-center rounded-full font-serif italic">Search for Subject</div>
                        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Search for Subject" className="border-2 border-black text-center bg-blue-100 w-10/12 rounded-2xl p-1" />
                    </div>
                    <div className="w-7/12 space-y-5">
                        <div className="text-2xl md:whitespace-nowrap text-center rounded-full font-serif italic">Search for Chapter</div>
                        <input type="text" value={chapter} onChange={(e) => setChapter(e.target.value)} placeholder="Search for Chapter" className="border-2 border-black text-center bg-blue-100 w-10/12 rounded-2xl p-1" />
                    </div>
                </div>
                <button type="submit" className="border border-black px-2 py-1 text-2xl bg-orange-200 rounded-md hover:bg-purple-300 hover:duration-200 ">Submit</button>
                {isVisible === true &&
                    <div className="font-bold italic text-xl">Subject or Chapter is Required.</div>
                }
            </form >
            {isVisible === false && subject !== "" && (notes.length ? (
                <div className="bg-blue-200 p-4 justify-center text-center space-y-4 flex w-screen flex-wrap" >
                    {notes.map((note) => (
                        <NoteCard
                            key={note._id}
                            notesId={note._id}
                            chapterName={note.name}
                            subjectName={note.subject}
                            notesFile={note.notesFile}
                        />

                    ))}
                </div>) :
                <div className="bg-blue-200 p-4 text-center space-y-4 text-2xl font-bold italic">
                    Notes not available for this Subject or Chapter
                </div>
            )}
        </div>
    )
}
