import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import commentService from '../Services/commentService'
import { IoMdArrowDroprightCircle } from "react-icons/io";
import CommentBox from './commentBox';
import authService from '../Services/authService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CollegePage() {
    const userData= useSelector(state => state.auth.userData)
    const [comments,setComments]= useState([]);
    const [commentText,setCommentText] = useState("")
    const [isVisible,setIsVisible] = useState(false)

    useEffect(() =>{
        commentService.getComment({college:userData.college})
        .then((response) =>{
            const commentArray=response.data.data;
            setComments(commentArray)
        })

    },[])

    const scrollAbleContainer = useRef(null)

    useEffect(() =>{
        if(scrollAbleContainer.current){
            scrollAbleContainer.current.scrollTop = scrollAbleContainer.current.scrollHeight;
        }
        let commentInputBox= document.querySelector('#comment_input')
        if(commentInputBox){
            commentInputBox.scrollIntoView({behavior:'smooth'})
        }
        window.scrollTo(0,(document.body.scrollHeight))
    },[comments])

    useEffect(() =>{
        setIsVisible(false)
    },[commentText])

    const submitComment = async (e) =>{
        e.preventDefault();
        if(commentText==="")
            setIsVisible(true)
        else{
            setIsVisible(false)
                await commentService.addComment({college:userData.college,content:commentText})
                .then((response) =>{
                    toast.success(response.data.message)
                    setTimeout(() => {
                        location.reload()
                    }, 1000);
                })
        }
    }


    if (!userData) {
        return (
            <div className="text-4xl font-bold mt-40 text-center font-serif mb-72">
                Login is Required.
            </div>
        )
    }
  return (
    <>
        <div className='mb-20'>
            <div className='mt-28 lg:mt-20 text-2xl font-serif pl-10 py-2 bg-green-200 text-black font-semibold flex fixed w-full'>
                <div className='text-3xl px-2 mt-1'>{userData.college}</div>
                <button className='rounded-full border-2 border-black px-2 py-1 ml-auto mr-2 hover:bg-red-200' onClick={() =>{
                    const userRespnse = window.confirm("Do you want to remove college")
                    if(userRespnse){
                        authService.removeCollege()
                        location.reload() 
                    }
                } }>Leave Group</button>
            </div>
            <div className='min-h-96 max-h-screen overflow-y-scroll flex-col-reverse pt-56 lg:pt-40' ref={scrollAbleContainer}>
                {
                    comments.map((comment) =>{
                        return (
                            <CommentBox key={comment._id} props={comment}/>
                        )
                    })
                }
            </div>
            <form className='flex mt-2 justify-center' onSubmit={submitComment} id='comment_input'>
                <input type="text" className='rounded-full p-2 ml-2 w-[30%]' placeholder='Write comments here' onChange={(e) => setCommentText(e.target.value)}/>
                <button type='submit'>
                    <IoMdArrowDroprightCircle className='text-2xl size-10 text-lime-600'/>
                </button>
            </form>
            {isVisible? 
            <div className='text-xl text-center'>
                Please write some text in Comment 
            </div>:
            null}
        </div>
        <ToastContainer/>
    </>
  )
}

export default CollegePage