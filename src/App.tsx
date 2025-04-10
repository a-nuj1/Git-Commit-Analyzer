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
  const [currentPage, setCurrentPage] = useState(1)
  
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
    selectRepo(null)
    setCurrentPage(1) // Reset to first page when analyzing new user
  }

  const handleShowOverall = () => {
    selectRepo(null)
  }

  // Calculate total pages
  const reposPerPage = 10
  const totalPages = repos ? Math.ceil(repos.length / reposPerPage) : 0

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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
                      Clear Selection
                    </button>
                  )}
                </div>
                <RepositoriesList 
                  repos={repos} 
                  selectedRepo={selectedRepo}
                  onRepoSelect={selectRepo}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {selectedRepo ? `Commit Activity for ${selectedRepo}` : 'Select a repository to view commits'}
                </h2>
                {selectedRepo ? (
                  <CommitsChart 
                    commitsData={commitsData} 
                    repoName={selectedRepo}
                    isOverallView={isOverallView}
                  />
                ) : (
                  <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                    Click on a repository to view its commit activity
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App