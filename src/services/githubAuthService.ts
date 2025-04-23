import axios from 'axios';

// Get environment variables with fallbacks
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || 'Ov23li1trPD6kDMaEJds';
const GITHUB_CLIENT_SECRET = import.meta.env.VITE_GITHUB_CLIENT_SECRET || 'd180e55f73df644c938a14f7d4e5047def72dc2d';
const REDIRECT_URI = `${window.location.origin}/auth/github/callback`;

// Log configuration for debugging
console.log('GitHub OAuth Configuration:', {
  clientId: GITHUB_CLIENT_ID,
  redirectUri: REDIRECT_URI,
  origin: window.location.origin,
  hasClientSecret: !!GITHUB_CLIENT_SECRET
});

export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  html_url?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  private: boolean;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language?: string;
  topics?: string[];
  default_branch?: string;
  visibility?: string;
}

class GitHubAuthService {
  private accessToken: string | null = null;
  private user: GitHubUser | null = null;

  constructor() {
    // Check for access token in localStorage
    const storedToken = localStorage.getItem('github_access_token');
    if (storedToken) {
      this.accessToken = storedToken;
      console.log('Found existing GitHub access token, fetching user data...');
      this.fetchUserData().catch(error => {
        console.error('Error fetching user data with stored token:', error);
        this.logout(); // Clear invalid token
      });
    }
  }

  get isAuthenticated(): boolean {
    const isAuth = !!this.accessToken;
    console.log('Checking authentication status:', isAuth);
    return isAuth;
  }

  get currentUser(): GitHubUser | null {
    console.log('Getting current user:', this.user);
    return this.user;
  }

  initiateAuth(): void {
    try {
      // Construct the authorization URL
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.append('client_id', GITHUB_CLIENT_ID);
      authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
      authUrl.searchParams.append('scope', 'repo user');
      authUrl.searchParams.append('state', Math.random().toString(36).substring(7));

      console.log('Initiating GitHub auth with URL:', authUrl.toString());
      
      // Use window.open for better error handling
      const authWindow = window.open(authUrl.toString(), '_blank');
      if (!authWindow) {
        throw new Error('Failed to open GitHub authorization window. Please check your popup blocker settings.');
      }
    } catch (error) {
      console.error('Error during GitHub authentication:', error);
      throw new Error('Failed to initiate GitHub authentication');
    }
  }

  async handleCallback(code: string): Promise<void> {
    try {
      console.log('Starting OAuth callback handling with code:', code);
      
      // Exchange code for access token
      const tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: REDIRECT_URI
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Received token response:', tokenResponse.data);

      if (!tokenResponse.data.access_token) {
        throw new Error('No access token received from GitHub');
      }

      const token = tokenResponse.data.access_token;
      if (typeof token !== 'string') {
        throw new Error('Invalid access token received');
      }

      this.accessToken = token;
      localStorage.setItem('github_access_token', token);
      console.log('Successfully stored GitHub access token');

      // Fetch user data
      await this.fetchUserData();
      console.log('Callback handling completed successfully');
    } catch (error) {
      console.error('Error during GitHub authentication:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
      }
      throw new Error('Failed to authenticate with GitHub');
    }
  }

  private async fetchUserData(): Promise<void> {
    if (!this.accessToken) {
      console.error('No access token available for fetching user data');
      return;
    }

    try {
      console.log('Fetching user data from GitHub API...');
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });
      
      this.user = {
        login: response.data.login,
        avatar_url: response.data.avatar_url,
        name: response.data.name || response.data.login,
        bio: response.data.bio,
        public_repos: response.data.public_repos,
        followers: response.data.followers,
        following: response.data.following,
        html_url: response.data.html_url
      };
      
      console.log('Successfully fetched user data:', this.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (axios.isAxiosError(error)) {
        console.error('API Error Response:', error.response?.data);
      }
      throw new Error('Failed to fetch user data');
    }
  }

  async fetchUserRepos(): Promise<GitHubRepo[]> {
    if (!this.accessToken) {
      console.error('No access token available for fetching repositories');
      throw new Error('Not authenticated');
    }

    try {
      console.log('Fetching user repositories from GitHub API...');
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          Accept: 'application/vnd.github.v3+json'
        },
        params: {
          sort: 'updated',
          per_page: 100,
          visibility: 'all'
        }
      });
      
      const repos = response.data.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        private: repo.private,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        language: repo.language,
        topics: repo.topics,
        default_branch: repo.default_branch,
        visibility: repo.visibility
      }));

      console.log(`Successfully fetched ${repos.length} repositories:`, repos);
      return repos;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      if (axios.isAxiosError(error)) {
        console.error('API Error Response:', error.response?.data);
      }
      throw new Error('Failed to fetch repositories');
    }
  }

  logout(): void {
    console.log('Logging out from GitHub...');
    this.accessToken = null;
    this.user = null;
    localStorage.removeItem('github_access_token');
    console.log('Successfully logged out from GitHub');
  }
}

export const githubAuthService = new GitHubAuthService(); 