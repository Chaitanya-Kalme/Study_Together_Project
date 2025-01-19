import React, { useState } from 'react'
import lectureService from '../Services/lectureService'
import LectureCard from './LectureCard'

export default function SearchLecture() {
    const [lectures, setLectures] = useState([])
    const [subject, setSubject] = useState("")
    const [chapter, setChapter] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [noLecture,setNoLecture] =useState(false)

    const searchLecture = (e) => {
        e.preventDefault()
        if (subject === "" && chapter === "") {
            setIsVisible(true)
        }
        else {
            setIsVisible(false)
            lectureService.getAllLecture({subject,chapter})
            .then((response) =>{
                const lectureResponse= response.data.data;
                setLectures(lectureResponse)
                console.log(lectureResponse)
                if(lectureResponse.length===0){
                    setNoLecture(true)
                }
                else{
                    setNoLecture(false)
                }
            })
        }
    }
    return (
        <div className="mt-10 md:mt-1 lg:mt-10 max-w-full mb-10">
            <form onSubmit={searchLecture} className="bg-blue-200 p-4 justify-center text-center space-y-4">
                <div className="text-2xl font-semibold italic font-serif">Search Lecture By:</div>
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
                <div className={`bg-blue-200 p-4 text-center space-y-4 text-2xl font-bold italic ${isVisible===false && subject!=="" && noLecture? "":"hidden"}`}>
                        Lecture not available for this Subject or Chapter
                </div>
            </form >
            {isVisible === false &&
                <div className="bg-blue-200 p-4 text-center flex flex-wrap space-x-10 ml-10 gap-y-10" >
                    {lectures.map((lecture) => (
                        <LectureCard
                            key={lecture._id}
                            id={lecture._id}
                            chapterName={lecture.title}
                            subjectName={lecture.subject}
                            thumbnail={lecture.thumbnail}
                            videoFile={lecture.videoFile}
                        />

                    ))}
                </div> 
            }
        </div>
    )
}
