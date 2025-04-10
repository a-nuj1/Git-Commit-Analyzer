import axios from 'axios'

const GITHUB_API = 'https://api.github.com'

export interface GitHubProfile {
  login: string
  name: string
  avatar_url: string
  bio: string
  public_repos: number
  followers: number
  following: number
}

export interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string
  stargazers_count: number
  forks_count: number
  language: string
}

export interface CommitActivity {
  date: string
  count: number
}

export const getGitHubProfile = async (username: string): Promise<GitHubProfile> => {
  const { data } = await axios.get(`${GITHUB_API}/users/${username}`)
  return data
}

export const getGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  const { data } = await axios.get(`${GITHUB_API}/users/${username}/repos?sort=updated`)
  return data
}

export const getOverallCommitActivity = async (username: string): Promise<CommitActivity[]> => {
  const { data } = await axios.get(`${GITHUB_API}/users/${username}/events/public`)
  
  const commitEvents = data.filter((event: any) => event.type === 'PushEvent')
  const commitsByDate: Record<string, number> = {}
  
  commitEvents.forEach((event: any) => {
    const date = new Date(event.created_at).toISOString().split('T')[0]
    const commitCount = event.payload.commits.length
    
    commitsByDate[date] = (commitsByDate[date] || 0) + commitCount
  })
  
  return Object.entries(commitsByDate).map(([date, count]) => ({
    date,
    count
  }))
}

export const getRepoCommitActivity = async (username: string, repoName: string): Promise<CommitActivity[]> => {
  try {
    const { data } = await axios.get(`${GITHUB_API}/repos/${username}/${repoName}/commits`, {
      params: {
        per_page: 100
      }
    })
    
    const commitsByDate: Record<string, number> = {}
    
    data.forEach((commit: any) => {
      const date = new Date(commit.commit.author.date).toISOString().split('T')[0]
      commitsByDate[date] = (commitsByDate[date] || 0) + 1
    })
    
    return Object.entries(commitsByDate).map(([date, count]) => ({
      date,
      count
    }))
  } catch (error) {
    console.error(`Error fetching commits for ${repoName}:`, error)
    return []
  }
}