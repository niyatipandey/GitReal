# GitReal

**Does the candidate's GitHub provide evidence for the skills listed on their resume?**

GitReal is a recruiter-focused GitHub repository intelligence tool that helps connect the technical skills claimed on a candidate's resume with evidence found in their GitHub repositories.

Instead of relying solely on a list of technologies on a resume, GitReal helps recruiters investigate which skills are supported by repository-level evidence, which repositories provide that evidence, and where evidence is limited or unavailable.

The goal is to make technical screening more evidence-based, transparent, and easier to investigate.

🚧 **Currently in development.** GitReal is being built incrementally, starting with resume processing and skill extraction before expanding into repository analysis and evidence-based reporting.

## 🎯 The Problem

A candidate's resume might list React, Node.js, MongoDB, Python, and AWS.

But how can a recruiter investigate those claims using the candidate's public GitHub repositories?

Manually reviewing repositories takes time. A technology appearing in a repository's dependencies doesn't necessarily mean the candidate has demonstrated meaningful use of it, and a missing signal doesn't necessarily mean the candidate lacks that skill.

GitReal aims to make this investigation easier by connecting resume-listed skills to relevant repository evidence.

## 🔍 How It Works

The intended workflow is:

1. **Provide a candidate's resume** — Upload a PDF resume.
2. **Extract technical skills** — Use an LLM to identify skills and group them into categories.
3. **Review the extracted skills** — Allow the recruiter to verify or correct the extracted information.
4. **Connect GitHub repositories** — Access the candidate's public repository data through GitHub integration.
5. **Map skills to repositories** — Identify relevant repositories for each resume-listed skill.
6. **Inspect repository evidence** — Examine dependency metadata and relevant source files to understand how a technology appears in a repository.
7. **Generate an evidence report** — Present the supporting repositories, observed signals, and limitations for each skill.

The objective is not to produce another candidate score. It is to help recruiters understand what the available evidence does and does not support.

## 🧩 Core Features

### 📄 Resume Skill Extraction

GitReal accepts a resume PDF and extracts technical skills using an LLM.

The extraction process aims to:
- Preserve the skill categories used in the resume where possible.
- Extract explicitly mentioned technologies rather than inventing skills.
- Return structured data that can be processed by the rest of the application.
- Make extracted skills available for review before repository analysis.

LLM output can be incomplete or inconsistently formatted, so reliable extraction and validation are important parts of the implementation.

### 🐙 GitHub Repository Analysis

GitReal uses GitHub data to investigate the candidate's public repositories.

Repository analysis is intended to examine signals such as:
- Technologies declared in `package.json` dependencies and development dependencies.
- Relevant source files that may provide additional context.
- Which repositories contain evidence associated with a particular skill.

A dependency declaration is a useful discovery signal, not proof of proficiency. Source-level evidence can provide more context, but it must also be interpreted carefully.

### 🔗 Resume-to-Repository Skill Mapping

The central part of GitReal is connecting each skill claimed on the resume to relevant repositories.

For example:

| Resume skill | Potential evidence |
|---|---|
| React | Repositories declaring React dependencies, with source files to investigate |
| Express.js | Repositories declaring Express dependencies, with relevant backend files |
| MongoDB | Repositories with evidence of MongoDB usage |
| Python | Relevant Python repositories and source files, where available |

These are illustrative examples, not guaranteed findings. The evidence available depends on the candidate's repositories and the analysis supported for each technology.

### 📊 Evidence-Based Reporting

The intended report will help recruiters investigate each skill individually.

For each skill, GitReal aims to present:
- The skill listed on the resume.
- Relevant repositories and their owners.
- The evidence detected in each repository.
- An explanation of what the evidence supports and what remains uncertain.

The emphasis is on traceable evidence and clear explanations rather than unexplained scores or automatic candidate rankings.

A lack of public evidence should be reported as **evidence not found**, not as proof that a candidate lacks the skill.

## 🧠 Design Principles

GitReal is being developed around a few principles.

**Evidence before conclusions**

Repository signals should be traceable to the repositories and files they came from.

**Deterministic analysis where possible**

Rules and structured repository data should drive evidence detection. An LLM can help interpret information, but it should not invent repository evidence or independently determine a candidate's technical ability.

**Transparency over arbitrary scores**

Recruiters should be able to understand why a skill was matched to a repository and what limitations apply.

**No assumptions from missing evidence**

A candidate may have private repositories, professional work they cannot publish, or experience that is not represented on GitHub. Missing public evidence is not a negative verdict on ability.

**Human judgment stays central**

GitReal is intended to support technical screening, not replace recruiter judgment or automatically rank candidates.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, Express |
| Resume processing | PDF text extraction |
| AI integration | OpenRouter-compatible chat completions API |
| Repository data | GitHub API |
| Database | MongoDB — planned integration |

The stack reflects the current implementation and intended direction. Individual integrations and features are still being developed.

## 🚧 Development Status

GitReal is being built step by step, with an emphasis on understanding and validating each part of the system before expanding it.

### Implemented or in progress

- [x] Initial React + TypeScript + Vite frontend
- [x] Express backend setup
- [x] Resume PDF upload endpoint
- [x] PDF text extraction
- [x] LLM-based technical skill extraction
- [x] Display extracted skill categories and skills in the frontend
- [x] Initial GitHub repository and dependency analysis
- [ ] Improve extraction reliability and output validation
- [ ] Allow recruiters to review and edit extracted skills
- [ ] Map resume skills to relevant repositories more comprehensively
- [ ] Inspect relevant source files for additional evidence
- [ ] Build the recruiter-facing evidence report
- [ ] Add tests for extraction, matching, and evidence quality
- [ ] Complete end-to-end testing and deployment

The checklist will evolve as the implementation progresses. A planned feature is not considered complete simply because it appears in the intended workflow.

## 🔐 Privacy and Scope

GitReal is designed around evidence available from public GitHub repositories.

The intended analysis should:
- Use only repository data the integration is authorized to access.
- Clearly identify the repositories and evidence used for each finding.
- Avoid presenting inaccessible or unexamined code as analyzed evidence.
- Distinguish between a lack of detected evidence and a lack of technical ability.

Candidate data handling, retention, and access controls will need to be defined and implemented before production use.

## ⚠️ Important Disclaimer

GitReal is not a definitive measure of developer ability.

Public repositories offer only a partial view of someone's work. A candidate may be highly capable without maintaining extensive public projects, and the presence of a technology in a repository does not by itself demonstrate proficiency.

GitReal is intended to help recruiters investigate technical claims using available evidence. Its findings should inform further review, not serve as an automatic hiring decision.

## 💡 Why GitReal?

Technical skills are easy to list on a resume, but investigating the work behind those claims can take time.

GitReal is being built to bridge that gap by connecting resume-listed skills with concrete repository evidence, helping recruiters move from claims to informed questions.

The goal is not to decide whether a candidate is a good developer. It is to make the available evidence easier to find, understand, and evaluate.

---

**GitReal — Connecting resume claims with repository evidence.**

Built incrementally, with an emphasis on transparent analysis and responsible use of AI.