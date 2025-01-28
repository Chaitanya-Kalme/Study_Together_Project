import axios from "axios"

class CommentService{
    async addComment({videoId,notesId,content,college}) {
        try {
            return await axios.post(`/api/v1/comment/addComment?videoId=${videoId}&notesId=${notesId}&college=${college}`,{content})
            
        } catch (error) {
            console.error("Something went wrong while adding Comment",error)
        }
    }
    async getComment({page=1,limit=20,videoId,notesId,college}){
        try {
            return await axios.get(`/api/v1/comment/getComments?page=${page}&limit=${limit}videoId=${videoId}&notesId=${notesId}&college=${college}`)
            
        } catch (error) {
            console.error("Something went wrong while getting Comments")
            
        }
    }
}

const commentService= new CommentService()


export default commentService