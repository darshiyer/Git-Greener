import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { GitHubRepo } from '../services/githubAuthService';
import { githubAuthService } from '../services/githubAuthService';

interface RepositorySelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (repoUrl: string) => void;
}

const RepositorySelectionDialog: React.FC<RepositorySelectionDialogProps> = ({
  isOpen,
  onClose,
  onSelect
}) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadRepositories();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = repos.filter(repo => 
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRepos(filtered);
    } else {
      setFilteredRepos(repos);
    }
  }, [searchQuery, repos]);

  const loadRepositories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userRepos = await githubAuthService.fetchUserRepos();
      setRepos(userRepos);
      setFilteredRepos(userRepos);
    } catch (error) {
      console.error('Error loading repositories:', error);
      setError('Failed to load repositories. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Repository</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {error && (
          <div className="bg-error-50 text-error-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : filteredRepos.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No repositories found
            </div>
          ) : (
            <div className="space-y-2">
              {filteredRepos.map((repo) => (
                <button
                  key={repo.id}
                  onClick={() => onSelect(repo.html_url)}
                  className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{repo.name}</h3>
                      {repo.description && (
                        <p className="text-sm text-gray-500 mt-1">{repo.description}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>🍴 {repo.forks_count}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepositorySelectionDialog; 