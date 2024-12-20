import React from "react";
import NotesImage from "../assests/Images/Notes_image.png"
import Lecture_image from "../assests/Images/Lecture_image.jpg"
import College_Image from "../assests/Images/College_Image.jpg"
import Doubt_Image from "../assests/Images/Doubt_Image.jpg"

const Hero= () =>{
    return(
        <>
            {/* Notes Section */}
            <div id="Notes_Section" className="flex bg-cyan-200 mt-20">
                <div className="flex-col text-xl ml-3 justify-items-center text-center m-10">
                    <div className="text-2xl border-4 border-black hover:bg-green-300 hover:duration-200 rounded-full border-spacing-2 md:whitespace-nowrap sm:p-2 lg:p-4 sm:w-1/3 lg:w-1/10 font-bold italic font-serif">Notes</div>
                    <div>Here you can get notes of your seniors and friends and get the marks in your exams. You can also contribute your notes.</div>
                </div>
                <div className="flex w-full justify-end m-5 size-80">
                    <img src={NotesImage} alt="Notes Image" />
                </div>
            </div>
            <div></div>
            {/* Lectures */}
            <div id="Lectures_Section" className="flex bg-amber-300">
                <div className="flex w-full m-5 size-80">
                    <img src={Lecture_image} alt="Notes Image" />
                </div>
                <div className="flex-col text-xl ml-3 justify-items-center text-center m-4">
                    <div className="text-2xl border-4 border-black hover:bg-green-300 hover:duration-200 rounded-full border-spacing-2 md:whitespace-nowrap sm:p-2 lg:p-4 sm:w-1/3 lg:w-1/10 font-bold italic font-serif">Lectures</div>
                    <div>Here you can get lectures of your professor and other professors. If you want to contribute your Lectures then you can also contribute.</div>
                </div>
            </div>
            {/* Add your College */}
            <div id="Add_College_Section" className="flex bg-cyan-200">
                <div className="flex-col text-xl ml-3 justify-items-center text-center m-4">
                    <div className="text-2xl border-4 border-black hover:bg-green-300 hover:duration-200 rounded-full border-spacing-2 md:whitespace-nowrap sm:p-2 lg:p-4 sm:w-8/12 lg:w-5/12 font-bold italic font-serif">Add Your College</div>
                    <div>If your college is not shown in our Search List then you can add your college name and then you upload Notes and Lectures according to College. </div>
                </div>
                <div className="flex w-full justify-end m-5 size-80">
                    <img src={College_Image} alt="Notes Image" />
                </div>
            </div>
            {/* Doubt Section */}
            <div id="Doubt_Section" className="flex bg-amber-300">
                <div className="flex w-full m-5 size-80">
                    <img src={Doubt_Image} alt="Doubt Image" />
                </div>
                <div className="flex-col text-xl ml-3 justify-items-center text-center m-4">
                    <div className="text-2xl border-4 border-black hover:bg-green-300 hover:duration-200 rounded-full border-spacing-2 md:whitespace-nowrap sm:p-2 lg:p-4 sm:w-8/12 lg:w-1/2 font-bold italic font-serif">Clear Your Doubts</div>
                    <div>Clear Your Doubts from your seniors and professors. You can post our doubts globally so that anyone can answer of your query.</div>
                </div>
            </div>
            
        </>
    )
}

export default Hero