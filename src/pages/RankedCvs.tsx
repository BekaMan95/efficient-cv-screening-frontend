import React from 'react'
import { DataTable, type Column } from '../components/DataTable'

type RankedCv = {
    id: number
    cv_url: string
}

const sampleRankedCvs: RankedCv[] = [
    {
        id: 1,
        cv_url: "https://example.com/cv1.pdf",
    },
    {
        id: 2,
        cv_url: "https://example.com/cv2.pdf",
    },
    {
        id: 3,
        cv_url: "https://example.com/cv3.pdf",
    },
]

const columns: Column<RankedCv>[] = [
  {
    key: "cv_url",
    header: "CV URL",
  },
  
]
const RankedCvs = () => {
  return (
    <DataTable<RankedCv> columns={columns} data={sampleRankedCvs} />
  )
}

export default RankedCvs