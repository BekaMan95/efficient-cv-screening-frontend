import React from "react"
import { DataTable, type Column } from "../components/DataTable"
import { Edit, Eye, View } from "lucide-react"

type Cv = {
  id: number
  cv_url: string
}

const sampleCvs: Cv[] = [
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

const columns: Column<Cv>[] = [
  {
    key: "cv_url",
    header: "CV URL",
  },
  {
    key: "status",
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
const UploadedCvs = () => {
  return <DataTable<Cv> columns={columns} data={sampleCvs} />
}

export default UploadedCvs
