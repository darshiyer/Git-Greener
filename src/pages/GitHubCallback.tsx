import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { githubAuthService } from '../services/githubAuthService';

const GitHubCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      setError('No authorization code received');
      return;
    }

    const handleCallback = async () => {
      try {
        await githubAuthService.handleCallback(code);
        navigate('/analyzer');
      } catch (error) {
        console.error('Error during GitHub authentication:', error);
        setError('Failed to authenticate with GitHub');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        {error ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-error-600 mb-4">Authentication Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/analyzer')}
              className="btn btn-primary"
            >
              Return to Analyzer
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authenticating with GitHub</h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
            <p className="mt-4 text-gray-600">Please wait while we complete the authentication...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubCallback; 