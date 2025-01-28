import React from 'react'
import { useSelector } from 'react-redux'

function CommentBox({...props}) {
    const userData= useSelector(state => state.auth.userData);

    const commentData= props.props;

  return (
    <>
        <div className={`${commentData.owner._id===userData._id? "ml-auto text-right": ""} w-fit font-serif text-xl `}>
            <div className='bg-white px-2 rounded-lg my-2'>
                <div className='text-sm'>
                    {commentData.owner.userName}
                </div>
                <div >
                    {commentData.content}
                </div>
            </div>
        </div>

    </>
  )
}

export default CommentBox