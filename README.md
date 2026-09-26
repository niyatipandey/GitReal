# GitReal

> **Does your GitHub actually back up your resume?**

GitReal is a developer credibility tool that compares what you claim on your resume with what your public GitHub activity actually shows.

Upload your resume. Connect your GitHub. GitReal tells you what a recruiter sees — and where the gaps are.

**Built in public.**

[Live Demo](#) · [GitHub](#) · [Follow the Build](#)

---

## 🚨 The Problem

A resume can say:

> React · Node.js · MongoDB · Python · Docker · AWS

But a resume doesn't show whether those skills are backed by real work.

**GitHub does.**

The problem is that most developers have no idea what their public GitHub is actually communicating to someone reviewing their application.

GitReal closes that gap.

---

## 🔍 How It Works

```text
Upload Resume
      ↓
LLM extracts your tech stack
      ↓
You confirm or edit
      ↓
Connect GitHub (OAuth)
      ↓
Select which skills to check
      ↓
GitReal analyzes your public repositories
      ↓
Your GitReal Report
```

The result answers one simple question:

> **"Does my public GitHub support what my resume claims?"**

---

## ✨ What GitReal Analyzes

### 📄 Resume Skill Extraction

Upload your resume and GitReal uses an LLM to extract the technologies you claim.

It automatically normalizes variations such as:

| Resume   | Normalized |
| -------- | ---------- |
| ReactJS  | React      |
| Node.js  | Node       |
| Mongo DB | MongoDB    |
| Postgres | PostgreSQL |

You **confirm or edit the extracted skills** before analysis begins.

You stay in control.

---

### 🐙 GitHub Evidence

For every skill you select, GitReal analyzes your **public repositories** for two primary signals:

#### Breadth

How many repositories show evidence of the technology?

#### Recency

When did you last actively use it?

Both signals matter.

A skill used across 5 repositories but dormant for 18 months tells a different story from a skill you used last week.

---

## 📊 Resume vs Reality

GitReal turns the analysis into an easy-to-understand comparison.

| Resume Skill | GitHub Evidence                 | Assessment     |
| ------------ | ------------------------------- | -------------- |
| React        | Multiple repos, recently active | 🟢 Strong      |
| Node.js      | Several backend projects        | 🟢 Strong      |
| Python       | One small project               | 🟡 Moderate    |
| Docker       | Little to no evidence           | 🔴 Limited     |
| AWS          | No meaningful evidence found    | ⚫ No Evidence |

Each result includes a plain-English explanation rather than just a score.

### Example

> **"React found in 4 repositories. Last active 2 months ago. Strong visibility."**

Or:

> **"Docker mentioned on your resume but found in 0 public repositories. One small project would significantly improve this."**

---

## 🤖 AI Recommendations

Once the deterministic analysis is complete, GitReal passes the structured results to an LLM to generate specific, actionable recommendations.

For example:

> **"Your GitHub strongly supports React and Node.js. However, AWS appears prominently on your resume with no corresponding public evidence. Consider either building a small project that uses AWS or reducing its emphasis on your resume before your next application."**

**The underlying analysis is deterministic.**

AI is used for **interpretation and recommendations**, not for calculating the evidence itself.

---

## 🔗 Shareable Developer Report

GitReal generates a public report you can share with anyone.

```text
┌───────────────────────────────────┐
│             GITREAL               │
│                                   │
│          Your Name                │
│       Developer Report            │
│                                   │
│  🔥 24 day streak                 │
│  💻 6 languages                   │
│  📦 18 repositories               │
│                                   │
│  Resume vs Reality                │
│                                   │
│  React       🟢 Strong            │
│  Node        🟢 Strong            │
│  Python      🟡 Moderate          │
│  Docker      🔴 Limited           │
│                                   │
│     gitreal.app/your-username     │
└───────────────────────────────────┘
```

**One link. Everything a recruiter needs to see.**

---

## 🛠️ Tech Stack

| Layer               | Technology            |
| ------------------- | --------------------- |
| Frontend            | React, Vite, Recharts |
| Backend             | Node.js, Express      |
| Database            | MongoDB               |
| Authentication      | GitHub OAuth          |
| AI                  | Groq                  |
| Frontend Deployment | Vercel                |
| Backend Deployment  | Render                |

---

## 🗺️ Roadmap

| Week       | Focus                                                          |
| ---------- | -------------------------------------------------------------- |
| **Week 1** | GitHub OAuth, profile data, repo + language fetching           |
| **Week 2** | Streak calculations, activity patterns, analytics dashboard    |
| **Week 3** | Resume upload, PDF parsing, skill extraction, normalization    |
| **Week 4** | Evidence matching, Resume vs Reality table, AI recommendations |
| **Week 5** | Shareable reports, mobile responsiveness, deployment           |
| **Week 6** | End-to-end testing, bug fixes, launch                          |

---

## ✅ MVP Checklist

* [ ] GitHub OAuth
* [ ] Public repository analysis
* [ ] Language distribution
* [ ] Coding streaks and activity patterns
* [ ] Resume upload and parsing
* [ ] LLM skill extraction with user confirmation
* [ ] Skill normalization
* [ ] Resume vs GitHub evidence matching
* [ ] AI recommendations
* [ ] Shareable developer report
* [ ] Responsive UI
* [ ] Production deployment

---

## 🔐 Privacy & Scope

GitReal analyzes **public GitHub activity only** — exactly the information a recruiter can see when they open your public GitHub profile.

### GitReal does not:

* Access private repositories
* Analyze private commits
* Access private code
* Include private repositories in your report

Your analysis is based only on your public developer presence.

---

## ⚠️ Important Disclaimer

**GitReal is not a measure of developer ability.**

GitHub activity is only one source of evidence. Someone can be an excellent developer with a small public presence, private repositories, professional work that cannot be published, or experience outside of GitHub.

GitReal is intended as a **reflection and preparation tool**, not a definitive assessment of technical ability.

---

## 💡 Why I Built This

My resume claimed skills that my GitHub didn't visibly support.

When I realized that, I also realized something else: **I had no idea what my GitHub was actually communicating to recruiters.**

So I built GitReal because **I needed it**. Then I decided to build it publicly so the process itself would be worth something — not just the final product.

---

## 📢 Building in Public

I'm documenting the entire process — the decisions, the bugs, what works, what doesn't. Updates every few days.

⭐ **Star the repository to follow along.**

[⭐ Star GitReal](#)

---

*Your resume makes the claim. Your GitHub provides the evidence.*
