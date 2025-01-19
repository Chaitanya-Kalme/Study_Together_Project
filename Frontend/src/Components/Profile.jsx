import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../Services/authService'
import { useNavigate } from 'react-router'
import { FaPencilAlt } from "react-icons/fa";
import { logout } from '../store/authSlice';


function Profile() {
  const data = useSelector((state) => state.auth.userData)
  const [changeAvatar, setChangeAvatar] = useState(false)
  const [fullName,setFullName]= useState("")
  const [email,setEmail] = useState("")
  const [college,setCollege] = useState("")
  const [year,setYear] = useState("")
  const [avatarFile,setAvatarFile] = useState(null)

  const [addFullNameVisible,setAddFullNameVisible] = useState(false)
  const [addEmalVisible,setAddEmailVisible] = useState(false)
  const [addCollegeVisible,setAddCollegeVisible] = useState(false)
  const [addYearVisible,setAddYearVisible] = useState(false)
  const [loading,setLoading] = useState(true)
  const dispatch= useDispatch()
  const navigate= useNavigate()



  const updateAvatar = () => {
    const avatar = document.querySelector("#avatarFile")
    authService.updateAvatar(avatar.files[0])
    .then(() =>{
      location.reload()
    })
    .catch((error) =>{
      console.error("Something went wrong",error)
    })    
  }

  const updateInformation = () =>{
      authService.updateUserInformation(fullName,email,college,year)
      .then((response) =>{
        location.reload()
      })
  }

  const removeAvatar = () =>{
    const userResponse = window.confirm('Do you want to remove Avatar');
    if(userResponse){
      authService.removeAvatar()
      .then(() => location.reload())
      .catch((error) => console.error("Server error"))
    }
  }

  const removeUser=  () => {
    const userResponse = window.confirm('Do you want to remove Account');
    if(userResponse){
      authService.deleteUser()
      .then(() =>{
        navigate('/')
      })
      .catch(() =>{
        console.log("error")
      })
    }
  }

  useEffect(() => {
      const timer= setTimeout(() =>{
        setLoading(false);
      },2000)

      return () => clearTimeout(timer)
  },[data])

  if(loading){
    return <div className='mt-64 text-4xl font-bold text-center'>Loading...</div>
  }

  const yearValues=[1,2,3,4,5,6]

  return (
    <>
      {data!=null ? (
        <div className='bg-blue-200 mt-20 flex mb-10 sm:justify-between lg:justify-normal'>
          <div className='mt-10 w-3/12 space-y-3'>
            <div className='text-2xl ml-16 font-bold italic'>Avatar:</div>
            <img src={`/api/v1/getFile/${data.avatar}`} className='left-2 ml-4 w-full ' />
            <button className={`text-2xl border-4 p-2 rounded-3xl ml-3 border-black hover:bg-orange-200 duration-200 ${changeAvatar? "bg-green-300": ""}`} onClick={() => setChangeAvatar(!changeAvatar)}>Change Avatar</button>
            {changeAvatar &&
              <div className='ml-4'>
                Enter Avatar File:
                <input type="file" id="avatarFile" className="border-2 border-black text-center bg-blue-100 w-10/12 rounded-2xl p-2" onChange={(e) => setAvatarFile(e.target.files)} />
                <button type='submit' className='border-2 border-black px-2 text-2xl bg-white my-2 hover:bg-blue-200 rounded-lg duration-200' onClick={() => updateAvatar()}>Submit</button>
              </div>}
              <button className='text-2xl border-4 p-2 rounded-3xl ml-3 border-black hover:bg-orange-200 duration-200 ' onClick={() => removeAvatar()}>Remove Avatar</button>
          </div>
          <div className='justify-items-end lg:pl-64 flex-col mt-16 '>
            <div className='text-center text-2xl font-serif font-bold italic p-2'> Name:  {data.userName}
              {!addFullNameVisible? <button className='text-2xl border-4 p-2 rounded-3xl ml-3 border-black hover:bg-orange-200 duration-200' onClick={() => setAddFullNameVisible(!addFullNameVisible)}><FaPencilAlt /></button>:
              <div className='flex-col'>
                <input type="text" className='bg-slate-50 text-xl md:whitespace-nowrap' onChange={(e) => setFullName(e.target.value)} />
                <button id='Submit_btn' type='sumbit' className='border-2 border-black px-2 text-2xl bg-white my-2 hover:bg-blue-200 rounded-lg duration-200'onClick={() => updateInformation()} >Submit</button>
              </div>}
            </div>
            <div className='text-center text-2xl font-serif font-bold italic p-2'>Email:  {data.email}
              {!addEmalVisible? <button className='text-2xl border-4 p-2 rounded-3xl ml-3 border-black hover:bg-orange-200 duration-200' onClick={() => setAddEmailVisible(!setAddEmailVisible)}><FaPencilAlt /></button>:
              <div className='flex-col'>
                <input type="text" className='bg-slate-50 text-xl md:whitespace-nowrap' onChange={(e) => setEmail(e.target.value)} />
                <button id='Submit_btn' type='sumbit' className='border-2 border-black px-2 text-2xl bg-white my-2 hover:bg-blue-200 rounded-lg duration-200'onClick={() => updateInformation()} >Submit</button>
              </div>}
            </div>
            <div className='text-center text-2xl font-serif font-bold italic p-2'>College:  {data.college}
              {!addCollegeVisible? <button className='text-2xl border-4 p-2 rounded-3xl ml-3 border-black hover:bg-orange-200 duration-200' onClick={() => setAddCollegeVisible(!addCollegeVisible)}><FaPencilAlt /></button>:
              <div className='flex-col'>
                <input type="text" className='bg-slate-50 text-xl md:whitespace-nowrap' onChange={(e) => setCollege(e.target.value)} />
                <button id='Submit_btn' type='sumbit' className='border-2 border-black px-2 text-2xl bg-white my-2 hover:bg-blue-200 rounded-lg duration-200'onClick={() => updateInformation()} >Submit</button>
              </div>
              }
            </div>
            <div className='text-center text-2xl font-serif font-bold italic p-2'>Year:  {data.year}
              {!addYearVisible? <button className='text-2xl border-4 p-2 rounded-3xl ml-3 border-black hover:bg-orange-200 duration-200' onClick={() => setAddYearVisible(!addYearVisible)}><FaPencilAlt /></button>:
              <div className='flex-col'>
                <select value={yearValues} className='bg-slate-50 text-xl md:whitespace-nowrap' onChange={(e) => setYear(e.target.value)}>
                  <option >--Please choose a number--</option>
                  {yearValues.map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <button id='Submit_btn' type='sumbit' className='border-2 border-black px-2 text-2xl bg-white my-2 hover:bg-blue-200 rounded-lg duration-200'onClick={() => updateInformation()} >Submit</button>
              </div>
            }
            <div>
              <button type='sumbit' className='border-2 border-black px-2 text-2xl bg-white my-2 hover:bg-blue-200 rounded-lg duration-200' onClick={removeUser}>Remove Account</button>
            </div>
            </div>
          </div>
        </div>
      ) :
        <div className='mt-52 text-center font-bold italic text-4xl'>User Data not found</div>
      }
    </>


  )
}

export default Profile