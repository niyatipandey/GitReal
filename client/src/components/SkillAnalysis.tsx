import { useState } from "react";
import type { SkillMatch } from "../types/analysis";
import {Fragment} from 'react'
import {
  LayoutDashboard,
  Code2,
  FolderGit2,
  FileText,
  ChartNoAxesCombined,
  Search,
  Bell,
  CheckCircle2,
  AlertCircle,
  Layers3,
  ChevronDown,
} from 'lucide-react'



interface SkillsAnalysisProps {
  skillMatches : SkillMatch[]
}
export default function SkillsAnalysis({skillMatches} : SkillsAnalysisProps){

const [searchQuery, setSearchQuery] = useState('')
const [selectedCategory, setSelectedCategory] = useState('All categories')
const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

const categories = [
  'All categories',
  ...Array.from(
    new Set(skillMatches.map(skill => skill.category))
  ).sort(),
]

const filteredSkills = skillMatches.filter(skill =>
  skill.skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
  (
    selectedCategory === 'All categories' ||
    skill.category === selectedCategory
  )
)


return (
  <section className="rounded-xl border border-white/10 bg-[#111820] p-5">
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold">Skills Analysis</h2>
        <p className="mt-1 text-sm text-gray-400">
          Evidence found for the skills listed on your resume.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#0b0f14] py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-blue-500 sm:w-52"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={event => setSelectedCategory(event.target.value)}
          className="rounded-lg border border-white/10 bg-[#0b0f14] px-3 py-2 text-sm text-gray-300 outline-none focus:border-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full min-w-[750px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
            <th className="px-4 py-3 font-medium">Skill</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Repositories</th>
            <th className="px-4 py-3 font-medium">Evidence</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {filteredSkills.map(skill => {
            const rowId = `${skill.category}-${skill.skill}`
            const isExpanded = expandedSkill === rowId

            const statusLabel = {
              source_verified: 'Source verified',
              dependency_only: 'Dependency only',
              not_verified: 'Unverified',
            }[skill.status]

            const statusStyle = {
              source_verified: 'bg-emerald-500/10 text-emerald-400',
              dependency_only: 'bg-amber-500/10 text-amber-400',
              not_verified: 'bg-gray-500/10 text-gray-400',
            }[skill.status]

            return (
              <Fragment key={rowId}>
                <tr
                  key={rowId}
                  className="border-b border-white/5 transition hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-4 font-medium text-white">
                    {skill.skill}
                  </td>

                  <td className="px-4 py-4 text-gray-400">
                    {skill.category}
                  </td>

                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs ${statusStyle}`}>
                      {statusLabel}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-gray-300">
                    {skill.repositories.length}
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex min-w-8 items-center justify-center rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-xs font-semibold tabular-nums text-blue-400">
                      {skill.evidence.length}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedSkill(isExpanded ? null : rowId)
                      }
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      {isExpanded ? 'Hide' : 'Details'}
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </td>
                </tr>

                {isExpanded && (
                  <tr key={`${rowId}-details`} className="border-b border-white/5">
                    <td colSpan={6} className="bg-[#0d131a] px-6 py-5">
                      <h3 className="mb-3 text-sm font-semibold text-gray-200">
                        Evidence details ({skill.evidence.length})
                      </h3>

                      {skill.evidence.length > 0 ? (
                        <div className="space-y-3">
                          {skill.evidence.map((evidence, index) => (
                            <div
                              key={`${evidence.repository}-${evidence.source}-${index}`}
                              className="rounded-lg border border-white/10 bg-[#111820] p-4"
                            >
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <span className="font-medium text-white">
                                  {evidence.repository}
                                </span>

                                <span
                                  className={`rounded-full px-2 py-0.5 text-xs ${
                                    evidence.type === 'source_code'
                                      ? 'bg-emerald-500/10 text-emerald-400'
                                      : 'bg-amber-500/10 text-amber-400'
                                  }`}
                                >
                                  {evidence.type === 'source_code'
                                    ? 'Source code'
                                    : 'Dependency'}
                                </span>
                              </div>

                              <p className="mb-1 break-all font-mono text-xs text-blue-400">
                                {evidence.source}
                              </p>

                              <p className="text-sm text-gray-400">
                                {evidence.details}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed text-gray-400">
                          No matching evidence was found in the inspected
                          repository files. This does not mean you lack this
                          skill; it means the analysis could not verify it
                          from the files inspected.
                        </p>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            )
          })}
        </tbody>
      </table>

      {filteredSkills.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-500">
          No skills match your search or selected category.
        </p>
      )}
    </div>
  </section>
)
}
