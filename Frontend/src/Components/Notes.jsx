import React from "react";

const Notes = () =>{

    return (
        <>
            <div className="mt-28 md:mt-28 lg:mt-20 max-w-full">
                <div className="bg-blue-200 p-4 justify-center text-center space-y-4">
                    <div className="text-2xl font-semibold italic font-serif">Search Notes By:</div>
                    <div className="flex justify-between gap-x-5 ">
                        <div className="w-7/12 space-y-5">
                            <div className="text-2xl  md:whitespace-nowrap text-center rounded-full font-serif italic">Search for Subject</div>
                            <input type="text" placeholder="Search for Subject" className="border-2 border-black text-center bg-blue-100 w-10/12 rounded-2xl p-1"/>
                        </div>
                        <div className="w-7/12 space-y-5">
                            <div className="text-2xl md:whitespace-nowrap text-center rounded-full font-serif italic">Search for Chapter</div>
                            <input type="text" placeholder="Search for Chapter" className="border-2 border-black text-center bg-blue-100 w-10/12 rounded-2xl p-1"/>
                        </div>
                        
                    </div>
                    
                </div>
                <div className="bg-blue-200 p-4 justify-center text-center space-y-4">
                    
                   
                </div>
            </div>
        </>
    )
}


export default Notes