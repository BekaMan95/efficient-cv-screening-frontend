"use client"

import React, { useState } from "react"
import { DataTable, type Column } from "../components/DataTable"
import { Eye, ArrowLeft } from "lucide-react"
import RankedCvs from "./RankedCvs" 

type Job = {
  id: number
  job_title: string
  department: string
  location: string
  status: "Open" | "Closed"
}

const sampleJobs: Job[] = [
  { id: 1, job_title: "Frontend Developer", department: "IT", location: "Addis Ababa", status: "Open" },
  { id: 2, job_title: "Backend Developer", department: "IT", location: "Adama", status: "Open" },
]

export default function JobManager() {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  
  const columns: Column<Job>[] = [
    { key: "job_title", header: "Job Title" },
    { key: "department", header: "Department" },
    { key: "location", header: "Location" },
    {
      key: "id",
      header: "Actions",
      render: (row) => (
        <button 
          onClick={() => setSelectedJobId(row.id)}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          <Eye size={16} /> View Applicants
        </button>
      ),
    },
  ];

  if (selectedJobId) {
    return (
      <div className="p-4">
        <button 
          onClick={() => setSelectedJobId(null)}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft size={20} /> Back to Jobs
        </button>
        <h2 className="text-xl font-bold mb-4">Applicants for Job #{selectedJobId}</h2>
        <RankedCvs jobId={selectedJobId} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Openings</h1>
      <DataTable<Job> columns={columns} data={sampleJobs} />
    </div>
  )
}
