export interface EvidenceItem {
  type: 'source_code' | 'dependency'
  source: string
  details: string
  repository: string
}

export interface SkillRepository {
  name: string
  owner: string
  evidence: Omit<EvidenceItem, 'repository'>[]
}

export interface SkillMatch {
  category: string
  skill: string
  status: 'source_verified' | 'dependency_only' | 'not_verified'
  repositories: SkillRepository[]
  evidence: EvidenceItem[]
}

export interface SourceFile {
  path: string
  mode: string
  type: string
  sha: string
  size: number
  url: string
}

export interface Repository {
  repoName: string
  owner: string
  sourceFiles: SourceFile[]
  technologies: string[]
  sourceTechnologies: unknown[]
}

export interface AnalysisResult {
  repositoriesAnalyzed: number
  repositories: Repository[]
  technologyEvidence: Record<string, unknown>
  skillMatches: SkillMatch[]
}
