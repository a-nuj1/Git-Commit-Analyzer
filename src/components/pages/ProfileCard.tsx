import { GitHubProfile } from '../../lib/api.ts'

interface ProfileCardProps {
  profile: GitHubProfile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 w-full">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
        <img
          src={profile.avatar_url}
          alt={`${profile.login}'s avatar`}
          className="w-16 h-16 rounded-full border-2 border-gray-200"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-gray-900">
            {profile.name || profile.login}
          </h2>
          <p className="text-gray-600">@{profile.login}</p>
          {profile.bio && (
            <p className="text-gray-700 mt-1">{profile.bio}</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-center sm:justify-start space-x-4">
        <div className="text-center">
          <p className="text-gray-900 font-semibold">{profile.public_repos}</p>
          <p className="text-gray-500 text-sm">Repositories</p>
        </div>
        <div className="text-center">
          <p className="text-gray-900 font-semibold">{profile.followers}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-gray-900 font-semibold">{profile.following}</p>
          <p className="text-gray-500 text-sm">Following</p>
        </div>
      </div>
    </div>
  )
}