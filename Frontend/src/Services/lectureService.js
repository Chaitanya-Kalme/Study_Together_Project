import axios from "axios"


export class LectureService{
    async uploadLecture(chapterName,subjectName,lectureFile,thumbnail,description,isPublicAvailable){
        try {
            const lectureFormData = new FormData()
            lectureFormData.append('title',chapterName)
            lectureFormData.append('subject',subjectName)
            lectureFormData.append('videoFile',lectureFile)
            lectureFormData.append('thumbnail',thumbnail)
            lectureFormData.append('description',description)
            lectureFormData.append('isPublicAvailable',isPublicAvailable)
    
            const lecture = await axios.post('/api/v1/video/publishVideo',lectureFormData)
            if(lecture){
                return lecture
            }
            else{
                console.log("Something went wrong while uploading Lecture.")
                return null
            }
        } catch (error) {
            console.error("Something went wrong while uploading Lecture",error)
            return null;
            
        }
    }
    async deleteLecture(videoId){
        try {
            return await axios.delete(`/api/v1/video/deleteVideo/${videoId}`)
        } catch (error) {
            console.error("Server Error while deleting video",error)
        }
    }
    async getLecture(videoId){
        try {
            const lecture = await axios.get(`/api/v1/video/getVideo/${videoId}`)
            if(note){
                return lecture
            }
            else{
                console.log("Lecture not found")
                return null
            }
        } catch (error) {
            console.error("Server Error while getting lecture",error)
        }
    }
}

const lectureService = new LectureService()

export default lectureService