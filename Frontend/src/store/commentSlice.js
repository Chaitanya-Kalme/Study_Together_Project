import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    comments:[]
}

const commentSlice= createSlice({
    name:"comments",
    initialState,
    reducers:{
        addCommentInCollege:(state,action) =>{
            let comments = state.comments;
            comments.push(action.payload.comment);
        }
    }
})

export const {addCommentInCollege} = commentSlice.actions;

export default commentSlice.reducer;