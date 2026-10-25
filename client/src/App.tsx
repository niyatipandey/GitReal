
import { useState } from 'react'

function App() {
  const [resume, setResume] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [skills, setSkills] = useState<Record<string, string[]> | null>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (file) {
      setResume(file)
    }
  }
  async function handleUpload() {
    if (!resume) {
      setError('Please select a resume PDF first.')
      return
    }

    const formData = new FormData()
    formData.append('resume', resume)

    try {
      setLoading(true)
      setError('')

      const response = await fetch('http://localhost:5000/resume/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Resume upload failed.')
      }

      setSkills(data.skills)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong.'
      )
    } finally {
      setLoading(false)
    }
  }

  

  return (
    <main>
      <h1>GitReal</h1>
      <p>Repository intelligence for recruiters.</p>

      <section>
        <h2>Upload a resume</h2>

        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
        />

        {resume && <p>Selected file: {resume.name}</p>}
        <button
          type="button"
          onClick={handleUpload}
          disabled={!resume || loading}
        >
          {loading ? 'Uploading...' : 'Upload resume'}
        </button>
        
        {skills && Object.entries(skills).map(([category, skillList]) => (
          <section key={category}>
            <h3>{category}</h3>

            {skillList.map((skill) => (
              <p key={skill}>{skill}</p>
            ))}
          </section>
        ))}


        {error && <p role="alert">{error}</p>}
      </section>
    </main>
  )
}

export default App

