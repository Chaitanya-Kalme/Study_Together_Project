import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Home from "./Components/Home.jsx"
import Notes from './Components/Notes.jsx'
import SignIn from './Components/SignIn.jsx'
import SearchNotes from './Components/searchNotes.jsx'
import UploadNotes from './Components/uploadNotes.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import Profile from './Components/Profile.jsx'
import Login from './Components/Login.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='notes' element={<Notes/>}/>
      <Route path='signIn' element={<SignIn/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='login' element={<Login/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App/>
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
