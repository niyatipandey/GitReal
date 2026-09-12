# GitReal

> **Does your GitHub actually back up your resume?**

GitReal is a developer credibility tool that compares what you **claim on your resume** with what your **GitHub activity actually shows**.

Connect your GitHub, upload your resume, and GitReal analyzes your repositories, languages, coding activity, and projects to generate an evidence-based view of your technical skills.

**Built in public. 30 days. One product.**

[Live Demo] · [GitHub] · [Build in Public]

---

## 🚀 The Problem

A resume can say:

> React · Node.js · MongoDB · Python · Docker · AWS

But a resume doesn't show whether those skills are actually backed by real work.

At the same time, GitHub contains a huge amount of information about how a developer actually builds:

* What languages they use
* What projects they've worked on
* How consistently they contribute
* Which technologies appear repeatedly
* Where their recent activity is concentrated
* How diverse their development experience is

The problem is that this information is difficult to interpret.

**GitReal connects the two.**

---

## 💡 How It Works

```text
                ┌─────────────────┐
                │   Connect GitHub │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ Analyze GitHub  │
                │    Activity     │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │  Upload Resume  │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ Extract Skills  │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ Match Skills to │
                │ GitHub Evidence  │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │    GitReal      │
                │     Report      │
                └─────────────────┘
```

The result is a simple answer to:

> **"Does my GitHub actually support what I say I can do?"**

---

# 📊 What GitReal Analyzes

### GitHub Profile

GitReal retrieves basic profile information such as:

* Name
* Bio
* Avatar
* Public repositories
* Repository languages

### Coding Activity

GitReal analyzes GitHub activity to calculate things such as:

* Current coding streak
* Longest coding streak
* Activity patterns
* Most active days
* Inactive periods
* Contribution distribution

### Language Distribution

GitReal looks across your repositories to understand your actual technology distribution.

For example:

```text
JavaScript      ████████████████  42%
TypeScript      ███████████       29%
Python          █████              13%
HTML/CSS        ████              10%
Other           ██                 6%
```

This provides a more realistic picture of your development activity than simply listing languages on a resume.

### Repository Diversity

GitReal also attempts to understand how broad your development experience is across repositories, languages, and project types.

---

# 📄 Resume vs Reality

This is the core feature of GitReal.

Upload your resume and GitReal extracts the technical skills you claim to have.

It then normalizes different ways of writing the same technology:

```text
ReactJS       → React
React.js      → React
NodeJS        → Node
Node.js       → Node
Mongo DB      → MongoDB
Postgres      → PostgreSQL
```

GitReal then compares those skills against available GitHub evidence.

### Example

| Resume Skill | GitHub Evidence                              | Assessment    |
| ------------ | -------------------------------------------- | ------------- |
| React        | Multiple repositories + significant activity | 🟢 Strong     |
| Node.js      | Several backend projects                     | 🟢 Strong     |
| Python       | One small project                            | 🟡 Moderate   |
| Docker       | Mentioned on resume, little/no evidence      | 🔴 Limited    |
| AWS          | No meaningful GitHub evidence detected       | ⚫ No Evidence |

The goal isn't to judge whether someone is a "good" or "bad" developer.

The goal is to answer:

> **"How well does your public GitHub evidence support your resume claims?"**

---

# 🤖 AI Recommendations

Once GitReal has structured your GitHub and resume data, the analytics can be passed to an LLM to generate personalized recommendations.

For example:

> **Your GitHub strongly supports your React and Node.js experience, but your resume lists AWS prominently without much corresponding evidence. Consider either adding a project demonstrating AWS usage or reducing the emphasis on AWS in your resume.**

The AI is used for **interpretation and recommendations**, while the underlying GitHub analytics remain structured and deterministic.

---

# 🔗 Shareable Developer Report

GitReal is designed to produce a public, shareable report for each developer.

Instead of sending someone a GitHub profile and a resume separately, you can share one link showing:

```text
┌───────────────────────────────────┐
│             GITREAL               │
│                                   │
│          Your Name                │
│       Developer Report             │
│                                   │
│  🔥 24 day streak                 │
│  💻 6 languages                   │
│  📦 18 repositories               │
│                                   │
│  Resume vs Reality                │
│                                   │
│  React       🟢 Strong             │
│  Node        🟢 Strong             │
│  Python      🟡 Moderate           │
│  Docker      🔴 Limited            │
│                                   │
│       gitreal.app/...             │
└───────────────────────────────────┘
```

The goal is to make the report useful **and** worth sharing.

---

# 🛠️ Tech Stack

### Frontend

* React
* Vite
* Recharts

### Backend

* Node.js
* Express

### Database

* MongoDB

### Authentication

* GitHub OAuth

### AI

* Groq

### Deployment

* Vercel — Frontend
* Render — Backend

---

# 🏗️ Project Structure

```text
gitreal/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── services/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   │   ├── github/
│   │   ├── analytics/
│   │   ├── resume/
│   │   └── ai/
│   ├── models/
│   ├── middleware/
│   └── ...
│
└── README.md
```

---

# 🔐 Data & Architecture

GitReal uses the backend as the intermediary between the frontend and GitHub.

```text
Browser
   │
   ↓
GitReal Backend
   │
   ├──── GitHub API
   │
   ├──── MongoDB
   │
   └──── AI / Analysis
```

GitHub data is cached where appropriate to avoid repeatedly requesting the same information and to reduce unnecessary API usage.

The application also accounts for GitHub API pagination and rate limits when collecting activity data.

---

# 🗓️ Building GitReal in 30 Days

I'm building GitReal publicly over 30 days.

The objective isn't just to finish a project.

It's to document the actual process of turning an idea into a deployed product — including the bugs, mistakes, design decisions, technical problems, and things I learn along the way.

### The roadmap

| Day | Milestone                       |
| --- | ------------------------------- |
| 01  | Project setup                   |
| 02  | GitHub OAuth                    |
| 03  | GitHub profile data             |
| 04  | Profile frontend                |
| 05  | Repository + language data      |
| 06  | MongoDB caching                 |
| 07  | **Week 1 MVP**                  |
| 08  | Commit pagination + rate limits |
| 09  | Streak calculations             |
| 10  | Language analysis               |
| 11  | Activity patterns               |
| 12  | Repository diversity            |
| 13  | Analytics dashboard             |
| 14  | **Analytics complete**          |
| 15  | Resume upload                   |
| 16  | PDF parsing                     |
| 17  | Skill extraction                |
| 18  | Skill normalization             |
| 19  | Evidence matching               |
| 20  | Evidence table                  |
| 21  | **Resume vs Reality complete**  |
| 22  | AI recommendations              |
| 23  | Recommendation UI               |
| 24  | Shareable reports               |
| 25  | Share card                      |
| 26  | Mobile responsiveness           |
| 27  | Deployment                      |
| 28  | End-to-end testing              |
| 29  | Bug fixing                      |
| 30  | **🚀 Launch**                   |

---

# 📈 Build in Public

I'm documenting the journey publicly rather than disappearing for months and coming back with:

> "I made a project."

The idea is to show the actual progression:

```text
Idea
 ↓
Architecture
 ↓
First commit
 ↓
OAuth
 ↓
APIs
 ↓
Analytics
 ↓
Resume parsing
 ↓
Skill matching
 ↓
AI recommendations
 ↓
Deployment
 ↓
Launch
```

Follow along to see GitReal go from an idea to a working product in 30 days.

---

# 🎯 MVP Goals

The first version of GitReal is intentionally focused.

### By Day 30:

* [x] GitHub authentication
* [x] GitHub profile analysis
* [x] Repository analysis
* [x] Language distribution
* [x] Coding streaks
* [x] Activity patterns
* [x] Resume upload
* [x] Resume skill extraction
* [x] Skill normalization
* [x] Resume vs GitHub evidence matching
* [x] AI recommendations
* [x] Shareable developer report
* [x] Responsive UI
* [x] Production deployment

---

# 🔮 Future Ideas

GitReal is starting with a focused MVP, but there are plenty of directions it could eventually go:

* More detailed project-level evidence
* Package/dependency analysis
* README analysis
* Commit-quality signals
* Pull request analysis
* Technology recency
* Private repository support
* GitLab support
* Resume improvement suggestions
* Job-description matching
* Developer growth tracking
* Historical reports
* Team/company analytics

The goal is to expand only when the core product proves useful.

---

# 🤝 Contributing

GitReal is being built publicly, and feedback is welcome.

If you find a bug, have an idea, or think an analysis metric is misleading:

1. Open an issue
2. Describe the problem or idea
3. Include examples where possible
4. Explain why you think it would improve GitReal

Contributions are welcome as the project evolves.

---

# ⚠️ Important

GitReal's analysis is **not a definitive measurement of developer ability**.

GitHub activity is only one source of evidence.

Someone can be an excellent developer with:

* a small GitHub presence
* private repositories
* contributions to closed-source projects
* work that isn't reflected in commits
* a different development workflow

GitReal should therefore be viewed as an **evidence and reflection tool**, not a hiring score or objective measure of technical skill.

---

# 👨‍💻 Why I'm Building This

I wanted to build something that sits at the intersection of:

**developers + GitHub + resumes + data + AI**

But more importantly, I wanted to build a project where the engineering itself could be visible.

Instead of simply putting another project on my resume, I'm documenting the process of building GitReal from scratch and seeing whether people actually find it useful.

**30 days. One idea. Let's see what happens.**

---

## ⭐ If GitReal is useful to you

Try it, share your report, open an issue, or tell me what you think.

And if you want to follow the build:

**⭐ Star the repository and follow the 30-day journey.**

---

**GitReal — Your resume makes the claim. Your GitHub provides the evidence.**
