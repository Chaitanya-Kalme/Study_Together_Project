import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


function Profile() {
    const data= useSelector((state) => state.auth.userData.data)
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [avatarFile,setAvatarFile ] =useState(null)

    useEffect(() =>{
        // data= useSelector((state) => state.auth.userData.data)
    },[data])

  return (
    <div className='bg-blue-300 mt-20'>
      <div>{data.userName}</div>
      <div>{data.email}</div>
      {data.avatarFile && <iframe src={`/api/v1/getFile/${data.avatarFile}`} frameborder="0"></iframe>}
    </div>

  )
}

export default Profile