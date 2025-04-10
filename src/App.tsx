import { useState } from 'react'
import { Input } from './components/ui/input.tsx'
import { Button } from './components/ui/button.tsx'
import ProfileCard from './components/pages/ProfileCard.tsx'
import RepositoriesList from './components/pages/RepositoriesList.tsx'
import CommitsChart from './components/pages/CommitsChart.tsx'
import { useGitHubData } from './hooks/useGitHubData.ts'


function App() {
  const [username, setUsername] = useState('')
  const [submittedUsername, setSubmittedUsername] = useState('')
  
  const { 
    profile, 
    repos, 
    commitsData, 
    isLoading, 
    error, 
    selectRepo, 
    selectedRepo,
    isOverallView
  } = useGitHubData(submittedUsername)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedUsername(username)
    selectRepo(null) // Reset to overall view when analyzing new user
  }

  const handleShowOverall = () => {
    selectRepo(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GitHub Profile Analyzer</h1>
          <p className="text-gray-600">Explore GitHub profiles and their activity metrics</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error.message}
          </div>
        )}

{profile && (
          <>
            <div className="mb-6 w-full">
              <ProfileCard profile={profile} />
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Repositories</h2>
                  {selectedRepo && (
                    <button 
                      onClick={handleShowOverall}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Show All Commits
                    </button>
                  )}
                </div>
                <RepositoriesList 
                  repos={repos} 
                  selectedRepo={selectedRepo}
                  onRepoSelect={selectRepo}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Commit Activity</h2>
                <CommitsChart 
                  commitsData={commitsData} 
                  repoName={selectedRepo}
                  isOverallView={isOverallView}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App