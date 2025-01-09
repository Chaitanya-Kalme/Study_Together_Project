import React, { useState } from 'react'
import UploadLecture from './UploadLecture'
import SearchLecture from './SearchLecture'

function Lecture() {
    const [showUploadLecture, setShowUploadLecture] = useState(false)

    return (
        <>
            <div className="bg-blue-200 mt-24 md:mt-20 lg:mt-20 max-w-full">

                <div className="flex justify-center space-x-52">
                    <button className={`w-1/4 space-y-5 text-2xl  ${showUploadLecture ? " bg-blue-300 border-4" : "bg-green-300"} md:whitespace-nowrap text-center rounded-lg font-serif italic top-10 mt-10 p-2 border-black border-2 hover:bg-orange-300 hover:duration-300`} onClick={() => setShowUploadLecture(true)}>
                        Upload Lectures
                    </button>
                    <button className={`w-1/4 space-y-5 text-2xl ${!showUploadLecture ? " bg-blue-300 border-4" : "bg-green-300"}  md:whitespace-nowrap text-center rounded-lg font-serif italic top-10 mt-10 p-2 border-black border-2 hover:bg-orange-300 hover:duration-300`} onClick={() => setShowUploadLecture(false)}>
                        Search Lectures
                    </button>
                </div>
                {showUploadLecture ?
                    <UploadLecture/>
                    :
                    <SearchLecture/>
                }

            </div>

        </>
    )
}

export default Lecture