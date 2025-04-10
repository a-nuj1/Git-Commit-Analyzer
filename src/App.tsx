import { useState } from 'react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import ProfileCard from './components/pages/ProfileCard'
import RepositoriesList from './components/pages/RepositoriesList'
import CommitsChart from './components/pages/CommitsChart'
import { useGitHubData } from './hooks/useGitHubData'
import { Sparkles } from 'lucide-react'

function App() {
  const [username, setUsername] = useState('')
  const [submittedUsername, setSubmittedUsername] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  
  const { profile, repos, commitsData, isLoading, error, selectRepo, selectedRepo } = useGitHubData(submittedUsername)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedUsername(username)
    selectRepo(null)
    setCurrentPage(1)
  }

  const reposPerPage = 10
  const totalPages = repos ? Math.ceil(repos.length / reposPerPage) : 0

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
            GitHub Profile Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover detailed insights into GitHub profiles with beautiful visualizations
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-12 bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username..."
                className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus-visible:ring-0"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-12 px-8 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all transform hover:scale-105"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze Profile
                </span>
              )}
            </Button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8 max-w-2xl mx-auto">
            <p className="font-medium">Error</p>
            <p>{error.message}</p>
          </div>
        )}

        {profile && (
          <>
            {/* Profile Card Section */}
            <div className="mb-10 max-w-4xl mx-auto">
              <ProfileCard profile={profile} />
            </div>

            {/* Data Visualization Section */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Repositories Column */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Repositories</h2>
                    {selectedRepo && (
                      <button 
                        onClick={() => selectRepo(null)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Clear Selection
                      </button>
                    )}
                  </div>
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

              {/* Commits Column */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedRepo ? `Commit Activity: ${selectedRepo}` : 'Select a Repository'}
                  </h2>
                </div>
                <div className="p-6">
                  {selectedRepo ? (
                    <CommitsChart 
                      commitsData={commitsData} 
                      repoName={selectedRepo}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="bg-blue-50 p-4 rounded-full mb-4">
                        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">No Repository Selected</h3>
                      <p className="text-gray-600 max-w-md">
                        Click on any repository from the list to view its detailed commit activity
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App