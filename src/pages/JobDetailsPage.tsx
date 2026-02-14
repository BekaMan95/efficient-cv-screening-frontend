"use client"

import React, { useState } from "react"
import { ArrowLeft, Upload, FileText, CheckCircle, X, Loader2 } from "lucide-react"

type JobDetailsProps = {
  job: any;
  onBack: () => void;
}

export default function JobDetailsPage({ job, onBack }: JobDetailsProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("cv", file);
    formData.append("jobId", job.id);

    try {
      await new Promise(res => setTimeout(res, 2000)); // Simulated delay
      setIsSuccess(true);
    } catch (error) {
      alert("Upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center p-8 bg-white rounded-2xl shadow-lg border">
        <div className="flex justify-center mb-4"><CheckCircle size={60} className="text-green-500" /></div>
        <h2 className="text-2xl font-bold">Application Sent!</h2>
        <p className="text-gray-500 mt-2">Good luck! Our AI is currently scoring your CV for the recruiters.</p>
        <button onClick={onBack} className="mt-6 text-blue-600 font-semibold underline">Back to Job Board</button>
      </div>
    );
  }

  if (isApplying) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <button onClick={() => setIsApplying(false)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-6">
          <ArrowLeft size={18} /> Back to Job Details
        </button>
        
        <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-gray-200 text-center">
          <h2 className="text-2xl font-bold mb-2">Apply for {job.title}</h2>
          <p className="text-gray-500 mb-8 text-sm">Please upload your CV in PDF format only.</p>

          {!file ? (
            <label className="cursor-pointer group">
              <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition">
                <Upload className="text-blue-500 mb-2 group-hover:scale-110 transition" size={40} />
                <span className="text-blue-700 font-medium">Click to upload or drag and drop</span>
                <span className="text-xs text-gray-400 mt-1">PDF (Max 5MB)</span>
              </div>
              <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
            </label>
          ) : (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border">
              <div className="flex items-center gap-3">
                <FileText className="text-red-500" />
                <div className="text-left">
                  <p className="font-medium text-sm truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
            </div>
          )}

          <button 
            disabled={!file || isUploading}
            onClick={handleUpload}
            className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-xl disabled:bg-gray-300 flex justify-center gap-2"
          >
            {isUploading ? <Loader2 className="animate-spin" /> : "Submit Application"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-black mb-6">
        <ArrowLeft size={18} /> Back to all jobs
      </button>

      <div className="bg-white p-8 border border-gray-100 rounded-2xl shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-blue-600 font-medium mt-1">{job.location} • {job.type}</p>
          </div>
          <button 
            onClick={() => setIsApplying(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition"
          >
            Apply Now
          </button>
        </div>
        <hr className="my-6 border-gray-100" />
        <div className="space-y-6">
          <div><h3 className="font-bold mb-2">Description</h3><p className="text-gray-600">{job.description}</p></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-xs text-gray-400">EXP REQUIRED</p><p className="font-bold">{job.experience}</p></div>
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-xs text-gray-400">EDUCATION</p><p className="font-bold">{job.education}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
