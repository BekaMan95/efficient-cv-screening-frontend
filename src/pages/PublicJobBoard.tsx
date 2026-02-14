"use client"

import React, { useState } from "react"
import { MapPin, Briefcase, ChevronRight } from "lucide-react"
import JobDetailsPage from "./JobDetailsPage" 

const publicJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "We are looking for a React expert to build beautiful UIs. You will work with a modern tech stack and a great team.",
    location: "Addis Ababa",
    type: "Full Time",
    skills: ["React", "Tailwind", "TypeScript"],
    education: "Bachelor's",
    experience: "2+ Years"
  },
  {
    id: 2,
    title: "Backend Engineer",
    description: "Join our core team to scale our Node.js microservices. Deep understanding of PostgreSQL and Redis is required.",
    location: "Remote",
    type: "Contract",
    skills: ["Node.js", "PostgreSQL", "Docker"],
    education: "Bachelor's",
    experience: "3+ Years"
  }
];

export default function PublicJobBoard() {
  const [viewingJobId, setViewingJobId] = useState<number | null>(null);

  // Find the selected job object
  const selectedJob = publicJobs.find(j => j.id === viewingJobId);

  if (selectedJob) {
    return <JobDetailsPage job={selectedJob} onBack={() => setViewingJobId(null)} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Current Openings</h1>
      <div className="space-y-4">
        {publicJobs.map((job) => (
          <div 
            key={job.id}
            onClick={() => setViewingJobId(job.id)}
            className="group p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition cursor-pointer flex justify-between items-center"
          >
            <div className="flex-1">
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition">{job.title}</h2>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
                <span className="flex items-center gap-1"><Briefcase size={14}/> {job.type}</span>
              </div>
              <p className="mt-3 text-gray-600 line-clamp-2 text-sm">
                {job.description}
              </p>
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-blue-600" />
          </div>
        ))}
      </div>
    </div>
  )
}