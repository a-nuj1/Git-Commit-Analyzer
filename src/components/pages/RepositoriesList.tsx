import { GitHubRepo } from '../../lib/api.ts'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'

interface RepositoriesListProps {
  repos?: GitHubRepo[]
  selectedRepo?: string | null
  onRepoSelect: (repoName: string | null) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function RepositoriesList({ 
  repos, 
  selectedRepo, 
  onRepoSelect,
  currentPage,
  totalPages,
  onPageChange
}: RepositoriesListProps) {
  if (!repos) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        Loading repositories...
      </div>
    )
  }

  if (repos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No repositories found
      </div>
    )
  }

  // Calculate the repos to show for the current page
  const reposPerPage = 10
  const startIndex = (currentPage - 1) * reposPerPage
  const paginatedRepos = repos.slice(startIndex, startIndex + reposPerPage)

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {paginatedRepos.map((repo) => (
            <li 
              key={repo.id} 
              className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedRepo === repo.name ? 'bg-blue-50' : ''}`}
              onClick={() => onRepoSelect(repo.name)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {repo.name}
                  </a>
                  {repo.description && (
                    <p className="text-gray-600 mt-1 text-sm">{repo.description}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  {repo.language && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {repo.language}
                    </span>
                  )}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    ⭐ {repo.stargazers_count}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    🍴 {repo.forks_count}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) onPageChange(currentPage - 1)
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(page)
                  }}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) onPageChange(currentPage + 1)
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}