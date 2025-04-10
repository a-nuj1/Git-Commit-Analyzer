import { GitHubRepo } from '../../lib/api.ts'

interface RepositoriesListProps {
  repos?: GitHubRepo[] // Make repos optional
}

export default function RepositoriesList({ repos }: RepositoriesListProps) {
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

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {repos.map((repo) => (
          <li key={repo.id} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
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
  )
}