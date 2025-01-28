import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../Services/authService";
import CollegePage from "./CollegePage";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CollegeSection() {
    const userData = useSelector(state => state.auth.userData);
    const selectedCollege = userData?.college || null;
    const [collegeNames,setCollegeNames] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [inputCollegeName, setInputCollegeName] = useState("")
    const [noText, setNoText] = useState(false)

    const updateCollege = () => {
        console.log(inputCollegeName)
        if (inputCollegeName === "") {
            setNoText(true)
        }
        else {
            setNoText(false)
            authService.updateUserInformation({ college: inputCollegeName })
                .then(() => {
                    location.reload()
                })
                .catch((error) => {
                    toast.error( error.message)
                })
        }
    }

    const handleChange = (event) => {
        const selectValue = event.target.value;

        if (selectValue === "Add/Update your College") {
            setIsVisible(true)
        }
        else {
            setIsVisible(false)

        }

    }

    useEffect(() =>{
        authService.getAllCollege()
        .then((response) =>{
            setCollegeNames(response.data.data)
        })
    },[])

    if (!userData) {
        return (
            <div className="text-4xl font-bold mt-40 text-center font-serif mb-72">
                Login is Required.
            </div>
        )
    }
    if (!userData.college) {
        return (
            <>
                <div className="text-center mt-36 flex-wrap mb-64">
                    <div className=" text-center font-bold font-serif text-blue-800 md:text-xl border-orange-400 border-4 inline-block">
                        Join Your College Group by Selecting college
                    </div>
                    <div>
                        <select className="sm:text-lg lg:text-2xl mt-3" onChange={handleChange}>
                            {selectedCollege == null ?
                                <option>
                                    --Please Select the College--
                                </option> :
                                <option>
                                    {selectedCollege || ""}
                                </option>}
                            {
                                collegeNames.map((college) =>(
                                    <option key={college._id} >{college._id}</option>
                                ))
                            }
                            <option >Add/Update your College</option>
                        </select>
                    </div>
                    <button onClick={() => updateCollege()} className="text-lg px-2  mt-2 ml-2 border-2 text-center rounded-full border-lime-500 hover:bg-orange-200 duration-200">Submit</button>
                    {isVisible === true ?
                        <div className="mt-5">
                            <div>Enter Your College</div>
                            <input type="text" className="rounded-full text-center" onChange={(e) => setInputCollegeName(e.target.value)} />
                            {noText ?
                                <div className="font-bold mt-2 text-sm">Please Enter College Name</div> :
                                null
                            }
                        </div> :
                        null}
                </div>
                <ToastContainer/>
            </>
        )
    }

    return (
        <>
            <CollegePage/>
            <ToastContainer/>
        </>
    )



}