import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  getGitHubProfile,
  getGitHubRepos,
  getOverallCommitActivity,
  getRepoCommitActivity
} from '../lib/api.ts'

export const useGitHubData = (username: string) => {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)

  const profileQuery = useQuery({
    queryKey: ['profile', username],
    queryFn: () => getGitHubProfile(username),
    enabled: !!username,
  })

  const reposQuery = useQuery({
    queryKey: ['repos', username],
    queryFn: () => getGitHubRepos(username),
    enabled: !!username,
  })

  const overallCommitsQuery = useQuery({
    queryKey: ['overall-commits', username],
    queryFn: () => getOverallCommitActivity(username),
    enabled: !!username,
  })

  const repoCommitsQuery = useQuery({
    queryKey: ['repo-commits', username, selectedRepo],
    queryFn: () => selectedRepo ? getRepoCommitActivity(username, selectedRepo) : [],
    enabled: !!username && !!selectedRepo,
  })

  const isLoading = profileQuery.isLoading || reposQuery.isLoading || overallCommitsQuery.isLoading
  const error = profileQuery.error || reposQuery.error || overallCommitsQuery.error

  return {
    profile: profileQuery.data,
    repos: reposQuery.data,
    commitsData: selectedRepo ? repoCommitsQuery.data : overallCommitsQuery.data,
    isLoading,
    error: error as Error | null,
    selectRepo: setSelectedRepo,
    selectedRepo,
    isOverallView: !selectedRepo
  }
}