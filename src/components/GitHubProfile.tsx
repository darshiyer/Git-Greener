import React from 'react';
import { GitHubUser } from '../services/githubAuthService';

interface GitHubProfileProps {
  user: GitHubUser;
}

export const GitHubProfile: React.FC<GitHubProfileProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-start space-x-6">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-24 h-24 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{user.name || user.login}</h2>
              <p className="text-gray-600">@{user.login}</p>
            </div>
            {user.html_url && (
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                View Profile
              </a>
            )}
          </div>
          
          {user.bio && (
            <p className="mt-2 text-gray-700">{user.bio}</p>
          )}
          
          <div className="mt-4 flex items-center space-x-6">
            {user.public_repos !== undefined && (
              <div className="flex items-center">
                <span className="text-gray-500">Repositories</span>
                <span className="ml-2 font-semibold">{user.public_repos}</span>
              </div>
            )}
            {user.followers !== undefined && (
              <div className="flex items-center">
                <span className="text-gray-500">Followers</span>
                <span className="ml-2 font-semibold">{user.followers}</span>
              </div>
            )}
            {user.following !== undefined && (
              <div className="flex items-center">
                <span className="text-gray-500">Following</span>
                <span className="ml-2 font-semibold">{user.following}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 