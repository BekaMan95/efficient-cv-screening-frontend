import React from "react"
import { Outlet } from "react-router"
import AdminHeader from "./AdminHeader"

const Layout = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
    <AdminHeader
        title="Admin"
        onToggleSidebar={() => {
          // toggle your sidebar state here
        }}
        onLogout={() => {
          // your logout logic
        }}
      />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
