"use client"

import React from "react"
import { Bell, LogOut, Menu } from "lucide-react"

interface AdminHeaderProps {
  title?: string
  onToggleSidebar?: () => void
  onLogout?: () => void
  rightSlot?: React.ReactNode
}

export default function AdminHeader({
  title = "Admin Dashboard",
  onToggleSidebar,
  onLogout,
  rightSlot,
}: AdminHeaderProps) {
  return (
    <header className="h-14 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {rightSlot}

        {/* <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="w-5 h-5" />
        </button> */}

        {onLogout && (
          <button
            onClick={onLogout}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  )
}
