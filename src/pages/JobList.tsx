"use client"

import React from "react"
import { DataTable, type Column } from "../components/DataTable"
import { Eye } from "lucide-react"

type Job = {
  id: number
  job_title: string
  department: string
  location: string
  job_type: string
  status: "Open" | "Closed"
  description: string
}

const sampleJobs: Job[] = [
  {
    id: 1,
    job_title: "Frontend Developer",
    department: "IT",
    location: "Addis Ababa",
    job_type: "Full Time",
    status: "Open",
    description: "Responsible for building and maintaining web UI using React.",
  },
  {
    id: 2,
    job_title: "Backend Developer",
    department: "IT",
    location: "Adama",
    job_type: "Contract",
    status: "Open",
    description: "Develop APIs and maintain backend services using Node.js.",
  },
  {
    id: 3,
    job_title: "Project Manager",
    department: "Operations",
    location: "Bahir Dar",
    job_type: "Full Time",
    status: "Closed",
    description: "Manage project execution, schedules and team coordination.",
  },
]

const columns: Column<Job>[] = [
  {
    key: "job_title",
    header: "Job Title",
  },
  {
    key: "department",
    header: "Department",
  },
  {
    key: "location",
    header: "Location",
  },
  {
    key: "job_type",
    header: "Job Type",
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span
        className={
          row.status === "Open"
            ? "text-green-600 font-medium"
            : "text-red-600 font-medium"
        }
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "action",
    header: "Action",
    render: (row) => (
      <div className='flex'>
        <button>
          <Eye className='w-4 h-4 mr-1' />
        </button>
      </div>
    ),
  },
]

export default function JobList() {
  return (
    <div className="p-4">
      <DataTable<Job>
        columns={columns}
        data={sampleJobs}
      />
    </div>
  )
}
