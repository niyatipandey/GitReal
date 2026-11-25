
import type { ChangeEvent } from 'react'
import { FaGithub } from 'react-icons/fa'

import {
  GitBranch,
  FileUp,
  FileText,
  CheckCircle2,
  ArrowRight,
  ScanSearch,
  Code2,
  ShieldCheck,
  Sparkles,
  FolderGit2,
} from 'lucide-react'

interface OnboardingPageProps {
  resume: File | null
  loading: boolean
  error: string
  skills: Record<string, string[]> | null
  githubUser: any
  analyzing: boolean
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  onUpload: () => void
  onAnalyze: () => void
  onConnectGitHub: () => void
}

function OnboardingPage({
  resume,
  loading,
  error,
  skills,
  githubUser,
  analyzing,
  onFileChange,
  onUpload,
  onAnalyze,
  onConnectGitHub,
}: OnboardingPageProps) {
  const extractedSkillCount = skills
    ? Object.values(skills).reduce(
        (total, skillList) => total + skillList.length,
        0
      )
    : 0

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090D12] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-40 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* Navbar */}
        <header className="flex h-20 items-center justify-between border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <GitBranch size={21} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">GitReal</h1>
              <p className="text-[10px] tracking-wider text-slate-500">
                YOUR CODE. YOUR SKILLS. YOUR STORY.
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-sm text-slate-400 sm:flex">
            <button
              type="button"
              onClick={() =>
                document.getElementById('github-connection')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                })
              }
              className="cursor-pointer text-emerald-400 transition hover:text-emerald-300"
            >
              Get started
            </button>

            <button
              type="button"
              onClick={() =>
                document.getElementById('getEvidence')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                })
              }
              className="cursor-pointer text-slate-400 transition hover:text-white"
            >
              How it works
            </button>

            <div className="h-4 w-px bg-white/10" />

            <span className="flex items-center gap-2">
              <FaGithub size={16} />
              Your GitHub
            </span>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-3xl pb-12 pt-5 text-center sm:pt-15">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-2 text-xs font-medium text-emerald-400">
            <Sparkles size={13} />
            Understand your public GitHub footprint
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Your resume tells your story.
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
              What does your GitHub show?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Your resume lists the technologies you know. Your GitHub
            gives people a place to explore your work. GitReal connects
            the skills on your resume with evidence in your repositories,
            helping you understand what others can discover about your code.
          </p>
        </section>

        {/* Input cards */}
        <section className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">

          {/* Resume card */}
          <div className="rounded-2xl border border-white/[0.09] bg-[#111820] p-6 shadow-xl shadow-black/20 transition hover:border-emerald-500/30 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <FileUp size={22} />
              </div>

              {skills && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 size={14} />
                  Skills extracted
                </span>
              )}
            </div>

            <h3 className="text-lg font-semibold">Start with your resume</h3>

            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
              Upload your resume to extract the skills you want to
              explore across your GitHub repositories.
            </p>

            <label className="mt-6 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#0B1117] px-4 py-5 text-center transition hover:border-emerald-500/50 hover:bg-emerald-500/[0.03]">
              <FileText size={25} className="mb-3 text-slate-500" />

              <span className="text-sm font-medium text-slate-300">
                {resume ? resume.name : 'Choose your resume PDF'}
              </span>

              <span className="mt-1 text-xs text-slate-500">
                PDF files only
              </span>

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={onFileChange}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={onUpload}
              disabled={!resume || loading}
              className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-[#06130F] transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading
                ? 'Uploading resume...'
                : skills
                  ? 'Upload again'
                  : 'Extract Resume Skills'}

              <ArrowRight size={16} />
            </button>

            {skills && (
              <p className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 size={14} />
                {extractedSkillCount} skills extracted from your resume
              </p>
            )}
          </div>

          {/* GitHub card */}
          <div
            id="github-connection"
            className="rounded-2xl border border-white/[0.09] bg-[#111820] p-6 shadow-xl shadow-black/20 transition hover:border-emerald-500/30 sm:p-7"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-700/30 text-slate-200">
                <FaGithub size={23} />
              </div>

              {githubUser && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 size={14} />
                  Connected
                </span>
              )}
            </div>

            <h3 className="text-lg font-semibold">Connect your GitHub</h3>

            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
              Connect your own GitHub account to explore your repositories
              and see which technologies appear in your public work.
            </p>

            <div className="mt-6 flex min-h-32 flex-col items-center justify-center rounded-xl border border-slate-800 bg-[#0B1117] px-4 py-5 text-center">
              <FaGithub size={27} className="mb-3 text-slate-400" />

              {githubUser ? (
                <>
                  <span className="text-sm font-medium text-emerald-400">
                    Connected as {githubUser.login}
                  </span>

                  <span className="mt-1 text-xs text-slate-500">
                    Your GitHub account is connected
                  </span>
                </>
              ) : (
                <>
                  <span className="text-sm font-medium text-slate-300">
                    GitHub account not connected
                  </span>

                  <span className="mt-1 text-xs text-slate-500">
                    Connect to explore your repositories
                  </span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={onConnectGitHub}
              className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm font-medium text-white transition hover:border-slate-500 hover:bg-slate-700"
            >
              <FaGithub size={17} />
              {githubUser ? 'Reconnect GitHub' : 'Connect GitHub'}
            </button>
          </div>
        </section>

        {/* Analyze action */}
        <section className="mx-auto mt-6 max-w-4xl rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/[0.08] to-teal-500/[0.04] p-6 sm:flex sm:items-center sm:justify-between sm:px-8">
          <div>
            <h3 className="font-semibold">Explore your GitHub footprint</h3>

            <p className="mt-1 text-sm text-slate-400">
              Discover how the skills on your resume connect with
              technologies found in your repositories.
            </p>
          </div>

          <button
            type="button"
            onClick={onAnalyze}
            disabled={!skills || !githubUser || analyzing}
            className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-[#06130F] transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40 sm:mt-0 sm:w-auto"
          >
            {analyzing ? 'Exploring repositories...' : 'Explore My GitHub'}

            {analyzing ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Sparkles size={16} />
            )}
          </button>
        </section>

        {/* Error message */}
        {error && (
          <p
            role="alert"
            className="mx-auto mt-5 max-w-4xl rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {error}
          </p>
        )}

        {/* Workflow */}
        <section className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/[0.08] bg-[#111820]/80 p-5 sm:p-6">
          <div
            id="getEvidence"
            className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <FileText size={19} />
              </div>

              <div>
                <p className="text-[10px] tracking-wider text-slate-500">
                  01
                </p>
                <p className="text-sm font-medium text-slate-200">
                  Understand Your Skills
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-700/50 text-slate-300">
                <Code2 size={19} />
              </div>

              <div>
                <p className="text-[10px] tracking-wider text-slate-500">
                  02
                </p>
                <p className="text-sm font-medium text-slate-200">
                  Explore Your Code
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-700/50 text-slate-300">
                <ShieldCheck size={19} />
              </div>

              <div>
                <p className="text-[10px] tracking-wider text-slate-500">
                  03
                </p>
                <p className="text-sm font-medium text-slate-200">
                  Discover Your Evidence
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Evidence preview */}
        <section className="mx-auto mb-8 mt-8 max-w-4xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111820]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                What your GitHub can reveal
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                An example of how resume skills connect to repository evidence
              </p>
            </div>

            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-1 text-[10px] text-emerald-400">
              Evidence preview
            </span>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Example technology evidence
                </span>

                <FolderGit2 size={15} className="text-slate-500" />
              </div>

              <div className="rounded-lg border border-white/[0.07] bg-[#0B1117] p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">React</span>

                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-400">
                    Source-code evidence
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  React usage found in the source files of an analyzed repository.
                </p>
              </div>

              <div className="rounded-lg border border-white/[0.07] bg-[#0B1117] p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">Express.js</span>

                  <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] text-amber-400">
                    Dependency evidence
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Express.js found in a project's dependency manifest.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-lg border border-white/[0.07] bg-[#0B1117] p-5">
              <ScanSearch size={25} className="mb-4 text-emerald-400" />

              <h4 className="text-sm font-semibold text-slate-200">
                Understand what others can explore.
              </h4>

              <p className="mt-2 text-xs leading-6 text-slate-400">
                GitReal shows where technologies appear in your repositories,
                distinguishing source-code evidence from dependency evidence.
                It helps you understand your public GitHub footprint, not
                measure your overall engineering ability.
              </p>
            </div>
          </div>
        </section>

        {/* Transparency section */}
        <section className="mx-auto mb-12 max-w-4xl rounded-2xl border border-white/[0.08] bg-[#111820]/70 p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <ShieldCheck size={22} className="mt-1 shrink-0 text-emerald-400" />

            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                Your GitHub doesn't tell your whole story.
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your professional work may be private, hosted elsewhere,
                or simply not represented in public repositories. Not
                finding evidence for a skill doesn't mean you don't have
                that skill. GitReal helps you understand your visible
                GitHub footprint, not judge your abilities.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.07] py-6 text-center text-xs text-slate-600">
          GitReal · Your code. Your skills. Your story.
        </footer>

        {/* Analysis loading overlay */}
        {analyzing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B10]/90 px-5 backdrop-blur-md">
            <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-emerald-500/20 bg-[#111820] px-8 py-12 text-center shadow-2xl shadow-emerald-500/10">

              {/* Animated scanner */}
              <div className="relative flex h-36 w-36 items-center justify-center">
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-r-emerald-400/40 border-t-emerald-400" />

                <div className="absolute inset-3 animate-[spin_8s_linear_infinite_reverse] rounded-full border-2 border-dashed border-emerald-500/30" />

                <div className="absolute h-20 w-20 animate-pulse rounded-full bg-emerald-500/20 blur-2xl" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <ScanSearch size={34} className="animate-pulse" />
                </div>

                <div className="absolute inset-0 animate-spin">
                  <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/70" />
                </div>
              </div>

              <h2 className="mt-9 text-2xl font-bold text-white">
                Exploring your repositories
              </h2>

              <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
                Inspecting source files, identifying technologies, and
                connecting repository evidence with the skills on your resume.
              </p>

              {/* Visual indicator, not an actual percentage */}
              <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-slate-700">
                <div className="h-full w-1/3 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-emerald-400" />
              </div>

              <p className="mt-4 text-xs tracking-widest text-emerald-400">
                GITREAL · EXPLORING YOUR WORK
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default OnboardingPage
