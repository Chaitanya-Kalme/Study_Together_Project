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
        try {
            return await axios.post('/api/v1/users/login',{email,password})
            
        } catch (error) {
            throw error
        }
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
}

const authService = new AuthService()

export default authService