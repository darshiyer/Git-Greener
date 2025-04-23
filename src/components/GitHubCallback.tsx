import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { githubAuthService } from '../services/githubAuthService';

export function GitHubCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          console.error('No code received from GitHub');
          navigate('/code-analyzer');
          return;
        }

        // Handle the GitHub callback
        await githubAuthService.handleCallback(code);
        
        // If this is a popup window
        if (window.opener) {
          // Send success message to main window
          window.opener.postMessage({ 
            type: 'GITHUB_AUTH_SUCCESS',
            origin: window.location.origin 
          }, window.location.origin);
          window.close();
        } else {
          // If not in popup, navigate to code analyzer
          navigate('/code-analyzer', { replace: true });
        }
      } catch (error) {
        console.error('Error handling GitHub callback:', error);
        navigate('/code-analyzer?error=github_auth_failed');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Connecting to GitHub...</h2>
        <p className="text-gray-600">Please wait while we complete the authentication.</p>
      </div>
    </div>
  );
} 