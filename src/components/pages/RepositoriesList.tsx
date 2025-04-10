import { GitHubRepo } from '../../lib/api'
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
      <div className="p-8 text-center text-gray-500">
        Loading repositories...
      </div>
    )
  }

  if (repos.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No repositories found
      </div>
    )
  }

  const reposPerPage = 10
  const startIndex = (currentPage - 1) * reposPerPage
  const paginatedRepos = repos.slice(startIndex, startIndex + reposPerPage)

  return (
    <div className="space-y-6">
      <ul className="divide-y divide-gray-200">
        {paginatedRepos.map((repo) => (
          <li 
            key={repo.id} 
            className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${selectedRepo === repo.name ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
            onClick={() => onRepoSelect(repo.name)}
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {repo.name}
                  </a>
                </div>
                {repo.description && (
                  <p className="text-gray-600 mt-2">{repo.description}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {repo.language && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {repo.language}
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  ⭐ {repo.stargazers_count}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  🍴 {repo.forks_count}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="px-6 pb-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) onPageChange(currentPage - 1)
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        onPageChange(pageNum)
                      }}
                      isActive={pageNum === currentPage}
                      className="hover:bg-gray-100"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) onPageChange(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}