import React, { useState } from 'react'
import lectureService from '../Services/lectureService'
import { useSelector } from 'react-redux'

export default function UploadLecture() {
    const data= useSelector((state) => state.auth.userData)
    const [subject, setSubject] = useState("")
    const [chapter,setChapter] = useState("")
    const [lectureUploaded, setLectureUploaded] = useState(false)
    const [lectureFile,setLectureFile] =useState(null)
    const [thumbNail,setThumbNail] = useState(null)
    const [isVisible,setIsVisible] = useState(false)
    const [description,setDescription] = useState("")
    const [isPublicAvailable,setIsPublicAvailable] = useState(false)

    const uploadLectureFiles = (e) => {
        e.preventDefault()
        if (subject === "" && chapter === "") {
            setIsVisible(true)
        }
        else {
            setIsVisible(false)
            lectureService.uploadLecture(chapter,subject,lectureFile,thumbNail,description,isPublicAvailable)
            .then((response) =>{
                window.alert("Lecture uploaded Successfully")
                location.reload()
            })
            .catch(() => setLectureUploaded(false))
        }
    }

    if(data==null){
        return (
            <div className='text-4xl font-bold italic text-center pt-10 items-center mt-10'>Login is Required to Upload the Lecture</div>
        )
    }
    
    return (
        <form onSubmit={uploadLectureFiles} className="bg-blue-200 p-4 justify-center text-center space-y-4 mb-10 whitespace-normal">
            <div className="text-2xl font-semibold italic font-serif space-y-5 py-5">Upload Lecture: </div>
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-x-5 ">
                <div className="w-7/12 space-y-5">
                    <div className="text-2xl  md:whitespace-nowrap text-center rounded-full font-serif italic">Subject Name:</div>
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject Name" className="border-2 border-black text-center bg-blue-100 w-10/12 rounded-2xl p-1" required={true}/>
                </div>
                <div className="w-7/12 space-y-5">
                    <div className="text-2xl md:whitespace-nowrap text-center rounded-full font-serif italic">Chapter Name:</div>
                    <input type="text" value={chapter} onChange={(e) => setChapter(e.target.value)} placeholder="Chapter Name" className="border-2 border-black text-center bg-blue-100 w-10/12 rounded-2xl p-1" required={true}/>
                </div>
                <div className="w-7/12 space-y-5">
                    <div className="text-2xl md:whitespace-nowrap text-center rounded-full font-serif italic">Lecture File:</div>
                    <input id="lectureFile" type="file" className="border-2 border-black text-center bg-blue-100 w-10/12 rounded-2xl p-1" onChange={(e) => setLectureFile(e.target.files[0])} required={true}/>
                </div>
                <div className="w-7/12 space-y-5">
                    <div className="text-2xl md:whitespace-nowrap text-center rounded-full font-serif italic">Thumbnail File:</div>
                    <input id="thumbnailFile" type="file" className="border-2 border-black text-center bg-blue-100 w-10/12 rounded-2xl p-1" onChange={(e) => setThumbNail(e.target.files[0])} required={true}/>
                </div>
                <div className="w-7/12 space-y-5">
                    <div className="text-2xl md:whitespace-nowrap text-center rounded-full font-serif italic">Video Public Available:</div>
                    <input type="checkbox" onChange={(e) => setIsPublicAvailable(!isPublicAvailable)} className="border-2 border-black text-center bg-blue-100 w-10/12 rounded-2xl p-1 size-7"/>
                </div>
                
            </div>
            <div className="w-full space-y-5  p-6">
                <div className="text-2xl md:whitespace-nowrap text-center rounded-full font-serif italic">Description:</div>
                <textarea type="text" className="border-2 border-black text-center bg-blue-100 w-7/12 rounded-2xl h-52 whitespace-break-spaces" placeholder='Description' onChange={(e) => setDescription(e.target.value)} required={true} />
            </div>
            <button type="submit" className="border border-black px-2 py-1 text-2xl bg-orange-200 rounded-md hover:bg-purple-300 hover:duration-200 ">Submit</button>
            {isVisible === true &&
                <div className="font-bold italic text-xl">Subject or Chapter or Lecture File or Thumbnail File is Required.</div>
            }
            {lectureUploaded && <div className="font-bold italic text-xl">Lecture Uploaded Successfully</div>}

        </form>
    )
}

