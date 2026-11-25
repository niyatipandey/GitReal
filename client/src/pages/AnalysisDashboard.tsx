
import { useState ,useEffect } from 'react'
import SkillAnalysis from '../components/SkillAnalysis'
import { FaGithub } from 'react-icons/fa'
import {
  Code2,
  FolderGit2,
  FileText,
  ChartNoAxesCombined,
  CheckCircle2,
  AlertCircle,
  Layers3,
  ChevronDown,
  LogOut,
} from 'lucide-react'

import type { AnalysisResult } from '../types/analysis'

interface AnalysisDashboardProps {
  data: AnalysisResult
  githubUser: any
  skills: Record<string, string[]> | null
  onLogout: () => void
}

function AnalysisDashboard({
  data,
  githubUser,
  skills,
  onLogout,
}: AnalysisDashboardProps) {
  const [activeTab, setActiveTab] = useState('Skills Analysis')
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)

  // Calculate dashboard statistics
  const totalSkills = data.skillMatches.length

  const verifiedSkills = data.skillMatches.filter(
    skill => skill.status === 'source_verified'
  ).length

  const dependencyOnlySkills = data.skillMatches.filter(
    skill => skill.status === 'dependency_only'
  ).length

  const unverifiedSkills = data.skillMatches.filter(
    skill => skill.status === 'not_verified'
  ).length

  const totalFiles = data.repositories.reduce(
    (total, repo) => total + repo.sourceFiles.length,
    0
  )

  const tabs = [
    'Skills Analysis',
    'Repositories',
    'Resume Preview',
    'Summary',
  ]

  const summaryCards = [
    {
      label: 'Skills Analyzed',
      value: totalSkills,
      icon: Layers3,
      color: 'text-blue-400',
      background: 'bg-blue-500/10',
    },
    {
      label: 'Source Verified',
      value: verifiedSkills,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      background: 'bg-emerald-500/10',
    },
    {
      label: 'Dependency Only',
      value: dependencyOnlySkills,
      icon: Code2,
      color: 'text-amber-400',
      background: 'bg-amber-500/10',
    },
    {
      label: 'Unverified',
      value: unverifiedSkills,
      icon: AlertCircle,
      color: 'text-red-400',
      background: 'bg-red-500/10',
    },
    {
      label: 'Repositories',
      value: data.repositoriesAnalyzed,
      icon: FolderGit2,
      color: 'text-purple-400',
      background: 'bg-purple-500/10',
    },
  ]

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white flex">

      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-[#252d38] bg-[#0e141c] p-5 flex flex-col">

        <div className="flex items-center gap-3 mb-10">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
            <FaGithub size={23} />
          </div>
          <span className="text-xl font-semibold">GitReal</span>
        </div>

        <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
          Workspace
        </p>

        <nav className="space-y-2">
          {[
            { label: 'Skills Analysis', icon: Code2 },
            { label: 'Repositories', icon: FolderGit2 },
            { label: 'Resume Preview', icon: FileText },
            { label: 'Summary', icon: ChartNoAxesCombined },
          ].map(item => {
            const Icon = item.icon
            const active = activeTab === item.label

            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  active
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-gray-400 hover:bg-[#19222e] hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            )
          })}
        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">

        {/* Header */}
        <header className="h-16 border-b border-[#252d38] flex items-center justify-between px-8">

          <div>
            <p className="text-sm text-gray-400">
              Workspace / Analysis
            </p>
          </div>

          {/* Account Dropdown */}
          <div className="relative">

            <button
              type="button"
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-[#19222e]"
            >
              <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-semibold">
                {githubUser?.login?.charAt(0)?.toUpperCase() || 'G'}
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">
                  {githubUser?.login || 'GitHub User'}
                </p>
                <p className="text-xs text-gray-500">
                  GitHub connected
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${
                  accountMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {accountMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[#252d38] bg-[#111820] p-2 shadow-xl z-50">

                <div className="px-3 py-2 border-b border-[#252d38] mb-2">
                  <p className="text-xs text-gray-500">
                    Signed in as
                  </p>
                  <p className="text-sm font-medium truncate">
                    {githubUser?.login || 'GitHub User'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                >
                  <LogOut size={17} />
                  Logout
                </button>

              </div>
            )}

          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">

          {/* Summary Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">

            {summaryCards.map(card => {
              const Icon = card.icon

              return (
                <div
                  key={card.label}
                  className="rounded-xl border border-[#252d38] bg-[#111820] p-5"
                >
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-sm text-gray-400">
                      {card.label}
                    </p>

                    <div className={`p-2 rounded-lg ${card.background}`}>
                      <Icon size={18} className={card.color} />
                    </div>
                  </div>

                  <h2 className="text-3xl font-semibold">
                    {card.value}
                  </h2>
                </div>
              )
            })}

          </section>

          {/* Tabs */}
          <div className="border-b border-[#252d38] flex gap-7 overflow-x-auto mb-6">

            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm whitespace-nowrap border-b-2 transition ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}

          </div>

          {/* Skills Analysis */}
          {activeTab === 'Skills Analysis' && (
            <SkillAnalysis skillMatches={data.skillMatches} />
          )}

          {/* Repositories */}
          {activeTab === 'Repositories' && (
            <section>

              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  Analyzed Repositories
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  {data.repositoriesAnalyzed} repositories analyzed · {totalFiles} source files inspected
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">

                {data.repositories.map(repo => (
                  <div
                    key={`${repo.owner}/${repo.repoName}`}
                    className="rounded-xl border border-slate-800 bg-slate-900 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <FolderGit2
                        className="text-emerald-400"
                        size={20}
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          {repo.repoName}
                        </h3>

                        <p className="text-xs text-slate-400">
                          {repo.owner}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between border-t border-slate-800 pt-3 text-sm">
                      <span className="text-slate-400">
                        Source files
                      </span>

                      <span className="text-white">
                        {repo.sourceFiles.length}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-slate-400">
                        Technologies detected
                      </span>

                      <span className="text-white">
                        {repo.technologies.length}
                      </span>
                    </div>
                  </div>
                ))}

              </div>
            </section>
          )}

          {/* Resume Preview */}
          {activeTab === 'Resume Preview' && (
            <section>

              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  Extracted Resume Skills
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Skills identified from the uploaded resume and used for repository analysis.
                </p>
              </div>

              {skills && Object.entries(skills).map(([category, skillList]) => (
                <div
                  key={category}
                  className="mb-5 rounded-xl border border-slate-800 bg-slate-900 p-5"
                >
                  <h3 className="mb-4 font-semibold text-white">
                    {category}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {skillList.map(skill => (
                      <span
                        key={skill}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {(!skills || Object.keys(skills).length === 0) && (
                <p className="text-sm text-slate-400">
                  No extracted resume skills are available.
                </p>
              )}

            </section>
          )}

          {/* Summary */}
          {activeTab === 'Summary' && (
            <section>

              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  Analysis Summary
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  An overview of the evidence found for the skills listed in the resume.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5">
                  <p className="text-sm text-slate-400">
                    Source-code evidence
                  </p>

                  <h3 className="mt-3 text-3xl font-bold text-emerald-400">
                    {verifiedSkills}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500">
                    Skills with evidence detected in source files
                  </p>
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-5">
                  <p className="text-sm text-slate-400">
                    Dependency-only evidence
                  </p>

                  <h3 className="mt-3 text-3xl font-bold text-amber-400">
                    {dependencyOnlySkills}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500">
                    Skills found in project dependencies only
                  </p>
                </div>

                <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
                  <p className="text-sm text-slate-400">
                    Unverified skills
                  </p>

                  <h3 className="mt-3 text-3xl font-bold text-slate-300">
                    {unverifiedSkills}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500">
                    No matching evidence in inspected files
                  </p>
                </div>

              </div>

              <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5">
                <h3 className="font-semibold">
                  What these results mean
                </h3>

                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">

                  <li>
                    <span className="font-medium text-emerald-400">
                      Source-code evidence:
                    </span>
                    {' '}The technology was detected in repository source code.
                  </li>

                  <li>
                    <span className="font-medium text-amber-400">
                      Dependency-only evidence:
                    </span>
                    {' '}The technology was found in a dependency, but not verified in source code.
                  </li>

                  <li>
                    <span className="font-medium text-slate-300">
                      Unverified:
                    </span>
                    {' '}No matching evidence was found in the files inspected. This does not establish that the candidate lacks the skill.
                  </li>

                </ul>
              </div>

              <p className="mt-5 text-xs text-slate-500">
                {data.repositoriesAnalyzed} repositories analyzed · {totalFiles} source files inspected
              </p>

            </section>
          )}

        </div>
      </main>
    </div>
  )
}

export default AnalysisDashboard
