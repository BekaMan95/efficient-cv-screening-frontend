import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './pages/Login.tsx'
import Admin from './pages/Admin.tsx'

 const router = createBrowserRouter([
  {
    path: "/login",
    element: (<Login />)
  },
  {
    path: "/",
    element: (<Admin/>)
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
