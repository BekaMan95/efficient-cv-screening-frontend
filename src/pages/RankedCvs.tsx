import React from 'react'
import { DataTable, type Column } from '../components/DataTable'
import { FileText } from "lucide-react"

type RankedCv = {
    id: number
    name: string
    cv_url: string
    score: number
    jobId: number // To filter by job
}

const sampleRankedCvs: RankedCv[] = [
    { id: 101, name: "Abebe Kebede", cv_url: "#", score: 95, jobId: 1 },
    { id: 102, name: "Sara Tesfaye", cv_url: "#", score: 88, jobId: 1 },
    { id: 103, name: "John Doe", cv_url: "#", score: 92, jobId: 1 },
    { id: 104, name: "Muna Ahmed", cv_url: "#", score: 75, jobId: 2 },
]

const columns: Column<RankedCv & { rank: number }>[] = [
  {
    key: "rank",
    header: "Rank",
    render: (row) => <span className="font-bold text-blue-600">#{row.rank}</span>
  },
  { key: "name", header: "Candidate Name" },
  {
    key: "cv_url",
    header: "CV Document",
    render: (row) => (
        <a href={row.cv_url} target="_blank" className="flex items-center gap-1 text-blue-500 underline">
            <FileText size={14} /> View CV
        </a>
    )
  },
  { 
    key: "score", 
    header: "AI Score",
    render: (row) => (
        <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[100px]">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${row.score}%` }}></div>
            <span className="text-xs font-medium">{row.score}/100</span>
        </div>
    )
  },
]

const RankedCvs = ({ jobId }: { jobId: number }) => {
  // 1. Filter applicants for this job
  // 2. Sort them by score (High to Low)
  // 3. Add a "rank" number based on position
  const filteredAndRanked = sampleRankedCvs
    .filter(cv => cv.jobId === jobId)
    .sort((a, b) => b.score - a.score)
    .map((cv, index) => ({ ...cv, rank: index + 1 }));

  return (
    <div className="bg-white rounded-lg shadow">
        <DataTable<any> columns={columns} data={filteredAndRanked} />
    </div>
  )
}

export default RankedCvs

// import React from 'react'
// import { DataTable, type Column } from '../components/DataTable'

// type RankedCv = {
//     id: number
//     cv_url: string
// }

// const sampleRankedCvs: RankedCv[] = [
//     {
//         id: 1,
//         cv_url: "https://example.com/cv1.pdf",
//     },
//     {
//         id: 2,
//         cv_url: "https://example.com/cv2.pdf",
//     },
//     {
//         id: 3,
//         cv_url: "https://example.com/cv3.pdf",
//     },
// ]

// const columns: Column<RankedCv>[] = [
//   {
//     key: "cv_url",
//     header: "CV URL",
//   },
  
// ]
// const RankedCvs = () => {
//   return (
//     <DataTable<RankedCv> columns={columns} data={sampleRankedCvs} />
//   )
// }

// export default RankedCvs