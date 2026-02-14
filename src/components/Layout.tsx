import React, { useState } from "react"
import { Outlet, NavLink } from "react-router"
import AdminHeader from "./AdminHeader"

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-hidden">
      <AdminHeader
        title="Admin"
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
        onLogout={() => {
          // logout logic
        }}
      />

      <div className="relative flex flex-1">
        {/* overlay (mobile) */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed md:static inset-y-0 left-0 z-30
            w-56 bg-white border-r border-gray-200
            transform transition-transform duration-200 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <nav className="p-3 space-y-1 mt-14 md:mt-0">
            <NavItem
              to="/jobs"
              label="Jobs"
              onClick={() => setSidebarOpen(false)}
            />
            <NavItem
              to="/new-jobs"
              label="New Jobs"
              onClick={() => setSidebarOpen(false)}
            />
            <NavItem
              to="/public-jos"
              label="Public Jobs"
              onClick={() => setSidebarOpen(false)}
            />
            <NavItem
              to="/new-jobs"
              label="New Jobs"
              onClick={() => setSidebarOpen(false)}
            />
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout

// small reusable nav item
function NavItem({
  to,
  label,
  onClick,
}: {
  to: string
  label: string
  onClick?: () => void
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `
        block rounded-md px-3 py-2 text-sm font-medium transition
        ${
          isActive
            ? "bg-amber-100 text-amber-800"
            : "text-gray-700 hover:bg-gray-100"
        }
      `
      }
    >
      {label}
    </NavLink>
  )
}