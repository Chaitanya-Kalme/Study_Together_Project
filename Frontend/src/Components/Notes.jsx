
import React, { useState } from "react";
import SearchNotes from "./searchNotes";
import UploadNotes from "./uploadNotes";




const Notes = () => {

    const [showUploadNotes,setShowUploadNotes]= useState(false)

    return (
        <>
            <div className="bg-blue-200 mt-24 md:mt-20 lg:mt-20 max-w-full">

                <div className="flex justify-center space-x-52">
                    <button className={`w-1/4 space-y-5 text-2xl  ${showUploadNotes ? " bg-blue-300 border-4" : "bg-green-300"} md:whitespace-nowrap text-center rounded-lg font-serif italic top-10 mt-10 p-2 border-black border-2 hover:bg-orange-300 hover:duration-300`} onClick={() => setShowUploadNotes(true)}>
                        Upload Notes
                    </button>
                    <button className={`w-1/4 space-y-5 text-2xl ${!showUploadNotes ? " bg-blue-300 border-4" : "bg-green-300"}  md:whitespace-nowrap text-center rounded-lg font-serif italic top-10 mt-10 p-2 border-black border-2 hover:bg-orange-300 hover:duration-300`} onClick={() => setShowUploadNotes(false)}>
                        Search Notes
                    </button>
                </div>
                {showUploadNotes ?
                    <UploadNotes/>
                    :
                    <SearchNotes />
                }

            </div>

        </>
    )
}


export default Notes