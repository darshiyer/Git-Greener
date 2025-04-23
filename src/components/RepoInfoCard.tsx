import React from 'react';
import { GitHubRepoInfo } from '../services/githubService';
import { formatDistanceToNow } from 'date-fns';

interface RepoInfoCardProps {
  repoInfo: GitHubRepoInfo;
}

const RepoInfoCard: React.FC<RepoInfoCardProps> = ({ repoInfo }) => {
  return (
    <div className="card p-6 mb-6">
      <div className="flex items-start space-x-4">
        <img
          src={repoInfo.owner.avatar_url}
          alt={`${repoInfo.owner.login}'s avatar`}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{repoInfo.name}</h2>
          <p className="text-gray-500 mb-4">{repoInfo.description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-medium">Owner:</span>
              <span className="ml-1">{repoInfo.owner.login}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">Stars:</span>
              <span className="ml-1">{repoInfo.stargazers_count}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">Forks:</span>
              <span className="ml-1">{repoInfo.forks_count}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">Last commit:</span>
              <span className="ml-1">
                {formatDistanceToNow(new Date(repoInfo.last_commit.date), { addSuffix: true })}
              </span>
            </div>
          </div>
          
          {Object.keys(repoInfo.languages).length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(repoInfo.languages).map(([language, bytes]) => (
                  <span
                    key={language}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepoInfoCard; 