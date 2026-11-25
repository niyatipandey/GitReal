import { useState , useEffect } from 'react'
import AnalysisDashboard from './pages/AnalysisDashboard'
import type { AnalysisResult } from './types/analysis'
import OnboardingPage from './pages/OnboardingPage'

function App() {
  const [resume, setResume] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [skills, setSkills] = useState<Record<string, string[]> | null>(null)
  const [githubUser, setGithubUser] = useState<any>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null)

  function handleConnectGitHub() {
    window.location.href = 'http://localhost:5000/auth/github'
  }

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
      console.log(data.skills)
      setSkills(data.skills)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong.'
      )
    } finally {
      setLoading(false)
    }
  }
  async function handleLogout() {
    try {
      const response = await fetch(
        'http://localhost:5000/auth/github/logout',
        {
          method: 'POST',
          credentials: 'include',
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Logout failed.')
      }

      // Clear frontend state after successful backend logout
      setGithubUser(null)
      setAnalysisData(null)
      setSkills(null)
      setResume(null)
      setError('')

    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong.'
      )
    }
  }

  async function checkGitHubConnection() {
    try {
      const response = await fetch(
        'http://localhost:5000/auth/github/user',
        {
          credentials: 'include'
        }
      )

      if (!response.ok) {
        setGithubUser(null)
        return
      }

      const data = await response.json()
      setGithubUser(data)

    } catch (err) {
      console.error('GitHub connection check failed:', err)
      setGithubUser(null)
    }
  }

  useEffect(() => {
    checkGitHubConnection()
  }, [])


  async function handleGitHubAnalysis() {
    if (!skills) return;

    try {
      setAnalyzing(true);
      setError('');

      const response = await fetch(
        'http://localhost:5000/auth/github/analyze',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            resumeSkills: skills
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Repository analysis failed.');
      }
      setAnalysisData(data)
      console.log('Github data',data);
      console.log(
  'FINAL GROQ MATCH:',
  JSON.stringify(
    data.skillMatches.find((skill: any) => skill.skill === 'Groq API'),
    null,
    2
  )
)

    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong.'
      );
    } finally {
      setAnalyzing(false);
    }
  }

  if (analysisData) {
    return (
      <AnalysisDashboard
        data={analysisData}
        githubUser={githubUser}
        skills={skills}
        onLogout={handleLogout}
      />
    )
  }


  return (
    <OnboardingPage
      resume={resume}
      loading={loading}
      error={error}
      skills={skills}
      githubUser={githubUser}
      analyzing={analyzing}
      onFileChange={handleFileChange}
      onUpload={handleUpload}
      onAnalyze={handleGitHubAnalysis}
      onConnectGitHub={handleConnectGitHub}
    />
  )
}

export default App

