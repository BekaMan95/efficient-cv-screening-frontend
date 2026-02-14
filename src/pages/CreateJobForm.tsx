"use client"

import React, { useState } from "react"
import { Plus, X, Send } from "lucide-react"

export default function CreateJobForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [roleName, setRoleName] = useState("")
  const [exp, setExp] = useState(0)
  const [education, setEducation] = useState("Bachelor's")
  
  // Skill List State
  const [skillInput, setSkillInput] = useState("")
  const [skills, setSkills] = useState<string[]>([])

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (skillInput.trim() && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const jobData = {
      title,
      description,
      roleName,
      minExperience: exp,
      educationLevel: education,
      requiredSkills: skills,
    }
    console.log("Posting to Backend:", jobData)
    
    alert("Job Posted Successfully!")
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Job Opening</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-semibold mb-1">Job Title</label>
          <input 
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. Senior Fullstack Engineer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Role Name & Experience */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Role Name</label>
            <input 
              className="w-full p-2 border rounded-md"
              placeholder="e.g. Engineering"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Min. Experience (Years)</label>
            <input 
              type="number"
              className="w-full p-2 border rounded-md"
              value={exp}
              onChange={(e) => setExp(parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Education Level */}
        <div>
          <label className="block text-sm font-semibold mb-1">Minimum Education</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >
            <option>High School</option>
            <option>Bachelor's</option>
            <option>Master's</option>
            <option>PhD</option>
          </select>
        </div>

        {/* Skills Tag Input */}
        <div>
          <label className="block text-sm font-semibold mb-1">Required Skills</label>
          <div className="flex gap-2 mb-2">
            <input 
              className="flex-1 p-2 border rounded-md"
              placeholder="Type a skill and click +"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <button 
              onClick={addSkill}
              className="bg-gray-800 text-white p-2 rounded-md hover:bg-black"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {skill}
                <X size={14} className="cursor-pointer" onClick={() => removeSkill(skill)} />
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1">Job Description</label>
          <textarea 
            className="w-full p-2 border rounded-md h-32"
            placeholder="Describe the responsibilities..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
        >
          <Send size={18} /> Post Job
        </button>
      </form>
    </div>
  )
}