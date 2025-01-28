import axios from "axios"

export class AuthService{
    async createAccount(email,password,userName,avatarFile) {
        try {
            const formData= new FormData()
            formData.append('userName',userName)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('avatar',avatarFile)
            const userAccount= await axios.post('/api/v1/users/register',formData)
            if(userAccount){
                // Login
                return this.login(email,password);
            }
            else{
                return 
            }
        } catch (error) {
            throw error   
        }
    }
    async login(email,password){
        return await axios.post('/api/v1/users/login',{email,password})
    }
    async getCurrentUser() {
        try {
            return await axios.get('/api/v1/users/getCurrentUser')
        } catch (error) {
        }
        return null;
    }
    async logout(){
        try {
            return await axios.post('/api/v1/users/logout')
        } catch (error) {
            console.log("Server Error while logout",error)
            
        }
    }
    async changePassword(newPassword) {
        try {
            return (await axios.patch('/api/v1/users/changePassword',newPassword)).data
            
        } catch (error) {
            console.log("Error while changing the password",error)
            
        }
    }
    async updateAvatar(newFile) {
        try {
            
            const formData= new FormData()
            formData.append('avatar',newFile)

            await axios.post('/api/v1/users/updateAvatar',formData)
            .then((response) =>{
                return response
            })
            .catch(() =>{
                return null;
            })
            
        } catch (error) {
            console.error("Server error while updating avatar")
            
        }
    }
    async updateUserInformation({fullName,email,college,year}){
        try {
            const formData= {}

            formData['fullName']=fullName
            formData['email']=email
            formData['college']=college
            formData['year']=year

            await axios.patch('/api/v1/users/updateDetails',formData)
            .then((response) =>{
                return response.data
            })
            .catch((error) =>{
                console.log("Something went wrong while updating information",error)
                return null
            })
        } catch (error) {
            console.error("Server error while updating information")
            
        }
    }
    async removeAvatar() {
        await axios.delete('/api/v1/users/removeAvatar')
        .then((response) =>{
            return response
        })
        .catch((error) =>{
            console.error("Something went wrong while deleting avatar");
        })
    }
    async deleteUser(userId){
        try {
            let userData;
            await this.getCurrentUser()
            .then((response) => {
                userData = response.data.data;
            })
            .catch(() => console.log("Something went wrong"))
            console.log(userData._id)
            await axios.delete(`/api/v1/users/deleteUser/${userData._id}`)
            .then((response) =>{
                return response;
            })
            .catch((error) =>{
                return error;
            })
        } catch (error) {
            console.error("Something went wrong while deleting user");   
        }

    }
    async removeCollege(){
        axios.delete("/api/v1/users/removeCollege")
        .then((response) =>{
            return response;
        })
        .catch((error) =>{
            console.error("Error while removing college",error);
        })
    }
    async getAllCollege(){
        return axios.get('/api/v1/users/getAllColleges');
    }
}

const authService = new AuthService()

export default authService