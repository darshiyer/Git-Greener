import axios from 'axios';

export interface GitHubRepoInfo {
  name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  last_commit: {
    sha: string;
    date: string;
    message: string;
  };
  languages: Record<string, number>;
}

// Create an axios instance with default config
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${process.env.VITE_GITHUB_TOKEN || ''}`
  }
});

// Add request interceptor to handle errors
githubApi.interceptors.response.use(
  response => response,
  error => {
    console.error('GitHub API Error:', error.response?.data || error.message);
    if (error.response?.status === 404) {
      throw new Error('Repository not found. Please check if the repository URL is correct and the repository exists.');
    }
    if (error.response?.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later or configure a GitHub token.');
    }
    if (error.response?.status === 401) {
      throw new Error('GitHub token is invalid or not configured. Please check your GitHub token configuration.');
    }
    throw new Error('Failed to fetch repository information. Please make sure the repository is accessible.');
  }
);

export const fetchRepoInfo = async (owner: string, repo: string): Promise<GitHubRepoInfo> => {
  try {
    // First check if the repository exists and get basic info
    const repoResponse = await githubApi.get(`/repos/${owner}/${repo}`);
    
    if (!repoResponse.data) {
      throw new Error('Repository not found');
    }

    // Get the latest commit
    const commitsResponse = await githubApi.get(`/repos/${owner}/${repo}/commits?per_page=1`);
    const lastCommit = commitsResponse.data[0];

    // Get languages
    const languagesResponse = await githubApi.get(`/repos/${owner}/${repo}/languages`);
    const languages = languagesResponse.data;

    return {
      name: repoResponse.data.name,
      description: repoResponse.data.description || 'No description available',
      owner: {
        login: repoResponse.data.owner.login,
        avatar_url: repoResponse.data.owner.avatar_url
      },
      stargazers_count: repoResponse.data.stargazers_count,
      forks_count: repoResponse.data.forks_count,
      last_commit: lastCommit ? {
        sha: lastCommit.sha,
        date: lastCommit.commit.author.date,
        message: lastCommit.commit.message
      } : {
        sha: '',
        date: new Date().toISOString(),
        message: 'No commits found'
      },
      languages: languages || {}
    };
  } catch (error) {
    console.error('Error fetching repository info:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Repository not found. Please check if the repository URL is correct and the repository exists.');
      }
      if (error.response?.status === 403) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
    }
    throw new Error('Failed to fetch repository information. Please make sure the repository is public and try again.');
  }
}; 