import { GitHubProfile } from '../../lib/api'

interface ProfileCardProps {
  profile: GitHubProfile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 p-6 flex justify-center">
          <img 
            className="h-32 w-32 rounded-full border-4 border-white shadow-md" 
            src={profile.avatar_url} 
            alt={`${profile.login}'s avatar`}
          />
        </div>
        <div className="p-8 flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.name || profile.login}</h1>
              <p className="text-blue-600 font-medium">@{profile.login}</p>
            </div>
            <a 
              href={`https://github.com/${profile.login}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              View on GitHub
            </a>
          </div>
          
          {profile.bio && (
            <p className="mt-4 text-gray-600 text-lg">{profile.bio}</p>
          )}

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm font-medium text-blue-600">Repositories</p>
              <p className="text-2xl font-bold text-gray-900">{profile.public_repos}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm font-medium text-green-600">Followers</p>
              <p className="text-2xl font-bold text-gray-900">{profile.followers}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-sm font-medium text-purple-600">Following</p>
              <p className="text-2xl font-bold text-gray-900">{profile.following}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}