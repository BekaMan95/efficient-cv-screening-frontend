import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './pages/Login.tsx'
import Admin from './pages/Admin.tsx'
import JobList from './pages/JobList.tsx'
import Layout from './components/Layout.tsx'
import RankedCvs from './pages/RankedCvs.tsx'
import UploadedCvs from './pages/UploadedCvs.tsx'
import CreateJobForm from './pages/CreateJobForm.tsx'
import { AppProvider } from './context/AppProvider.tsx'
import PublicJobBoard from './pages/PublicJobBoard.tsx'

 const router = createBrowserRouter([
  {
    path: "/login",
    element: (<Login />)
  },
  {
    path: "/",
    element: (<Layout/>),
    children:[
      {
        path: "/jobs",
        element:<JobList/>
      },
      {
        path: "/ranked-cvs",
        element:<RankedCvs/>      
      },
      {
        path: "/uploaded-cvs",
        element:<UploadedCvs/>      
      },
      {
        path:"new-jobs",
        element :<CreateJobForm/>
      },
      {
        path:"public-jos",
        element :<PublicJobBoard/>
      }
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
    <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)
