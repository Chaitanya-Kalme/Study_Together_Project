import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    subject:null,
    chapter:null,
}

const notesSlice= createSlice({
    name:"notes",
    initialState,
    reducers:{
        changeSubject: (state,action) =>{
            state.subject=action.payload.subject
        },
        changeChapter: (state,action) =>{
            state.chapter= action.payload.chapter
        }
    }
})

export const {changeChapter,changeSubject} = notesSlice.actions

export default notesSlice.reducer