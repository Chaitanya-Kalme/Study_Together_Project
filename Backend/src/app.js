import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app=express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({
    limit:"15kb"
}))

app.use(urlencoded({extended:true,limit:"15kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// Importing the routers
import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import notesRouter from "./routes/notes.routes.js"
import commentRouter from "./routes/comment.routes.js"


// routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/video",videoRouter)
app.use("/api/v1/notes",notesRouter)
app.use("/api/v1/comment",commentRouter)



export {app}