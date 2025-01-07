import axios from "axios"

export class NotesService{
    async uploadNotes(chapterName,subjectName,notesFile){
        try {
            const notesFormData = new FormData()
            notesFormData.append('name',chapterName)
            notesFormData.append('subject',subjectName)
            notesFormData.append('notesFile',notesFile)
    
            const notes = await axios.post('/api/v1/notes/uploadNotes',notesFormData)
            if(notes){
                return notes
            }
            else{
                console.log("Something went wrong while uploading notes.")
                return null
            }
        } catch (error) {
            console.error("Something went wrong while uploading notes",error)
            return null;   
        }
    }
    async deleteNotes(notesId){
        try {
            return await axios.delete(`/api/v1/notes/deleteNotes/${notesId}`)
        } catch (error) {
            console.error("Something went wrong while deleting notes",error)
        }
    }
    async getNotes(notesId){
        try {
            const note = await axios.get(`/api/v1/notes/getNotes/${notesId}`)
            if(note){
                return note.data
            }
            else{
                console.log("Notes not found")
                return null
            }
        } catch (error) {
            console.error("Something went wrong while getting Notes",error)
        }
    }
    async searchNotes(subject,chapter){
        try {
            const notes = await axios.get(`/api/v1/notes/searchNotes/${subject}/${chapter}`)
            if(notes){
                return notes.data
            }
            else{
                return null
            }
        } catch (error) {
            console.error("Server Error while searching Notes",error)
            return null
        }
    }
}


const notesService = new NotesService()

export default notesService