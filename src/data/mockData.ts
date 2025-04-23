import { 
  OptimizationSuggestion, 
  CodeIssue, 
  ResourceUsage, 
  GreenScoreMetrics,
  HistoricalData,
  ComplianceReport,
  EmissionSource
} from '../types';
import { getDaysAgo } from '../lib/utils';
import { GitHubRepoInfo } from '../services/githubService';

export const optimizationSuggestions: OptimizationSuggestion[] = [
  {
    id: '1',
    title: 'Optimize image assets with WebP format',
    description: 'Convert JPEG and PNG images to WebP format to reduce file size by up to 30% while maintaining visual quality.',
    impact: 'high',
    category: 'code',
    estimatedSavings: {
      co2: 120,
      cost: 250,
      performance: 15
    },
    implementation: 'Use an image optimization tool or CDN that supports automatic WebP conversion.',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Right-size underutilized EC2 instances',
    description: 'Several EC2 instances are operating at less than 20% CPU utilization consistently.',
    impact: 'high',
    category: 'infrastructure',
    estimatedSavings: {
      co2: 850,
      cost: 520,
      performance: 5
    },
    implementation: 'Downgrade from t3.large to t3.small for the identified instances.',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Implement database query caching',
    description: 'Repeated identical queries are causing unnecessary database load and server processing.',
    impact: 'medium',
    category: 'database',
    estimatedSavings: {
      co2: 320,
      cost: 180,
      performance: 25
    },
    implementation: 'Implement Redis cache for frequently accessed query results with a 15-minute TTL.',
    status: 'implemented'
  },
  {
    id: '4',
    title: 'Optimize JavaScript bundle size',
    description: 'Current JS bundle is 1.2MB. Implement code splitting and lazy loading to reduce initial load.',
    impact: 'medium',
    category: 'code',
    estimatedSavings: {
      co2: 95,
      cost: 130,
      performance: 20
    },
    implementation: 'Use dynamic imports for route-based code splitting and tree-shaking for unused dependencies.',
    status: 'pending'
  },
  {
    id: '5',
    title: 'Implement CDN for static assets',
    description: 'Static assets are currently served directly from origin servers in a single region.',
    impact: 'medium',
    category: 'network',
    estimatedSavings: {
      co2: 220,
      cost: 310,
      performance: 30
    },
    implementation: 'Configure CloudFront or Cloudflare CDN for all static assets with appropriate cache headers.',
    status: 'pending'
  }
];

export const codeIssues: CodeIssue[] = [
  {
    id: '1',
    file: 'src/components/Dashboard.js',
    lineStart: 127,
    lineEnd: 145,
    severity: 'high',
    description: 'Inefficient list rendering with nested loops and redundant DOM operations',
    suggestion: 'Implement virtualized list rendering and memoization for child components',
    impact: {
      co2: 75,
      performance: 25
    }
  },
  {
    id: '2',
    file: 'src/services/api.js',
    lineStart: 43,
    lineEnd: 58,
    severity: 'medium',
    description: 'Multiple separate API calls for related data that could be batched',
    suggestion: 'Implement GraphQL or a batch endpoint to reduce network requests',
    impact: {
      co2: 45,
      performance: 15
    }
  },
  {
    id: '3',
    file: 'src/utils/data-processing.js',
    lineStart: 92,
    lineEnd: 118,
    severity: 'high',
    description: 'Unnecessary data processing on the client side',
    suggestion: 'Move complex calculations to the server and cache results',
    impact: {
      co2: 120,
      performance: 35
    }
  },
  {
    id: '4',
    file: 'src/components/Chart.js',
    lineStart: 22,
    lineEnd: 48,
    severity: 'medium',
    description: 'Chart re-rendering on every data update, even for unrelated changes',
    suggestion: 'Implement shouldComponentUpdate or React.memo with custom comparison',
    impact: {
      co2: 35,
      performance: 20
    }
  },
  {
    id: '5',
    file: 'src/styles/main.css',
    lineStart: 156,
    lineEnd: 210,
    severity: 'low',
    description: 'Unused CSS selectors increasing stylesheet size',
    suggestion: 'Implement PurgeCSS to remove unused styles during build',
    impact: {
      co2: 15,
      performance: 5
    }
  }
];

export const resourceUsage: ResourceUsage[] = [
  {
    id: '1',
    name: 'App Engine Instance',
    type: 'server',
    provider: 'Google Cloud',
    region: 'asia-south1',
    currentUsage: 15,
    efficiency: 82,
    cost: 3200, // INR
    co2Emissions: 45,
    recommendations: [
      'Consider using App Engine automatic scaling for better resource utilization',
      'Implement Cloud CDN to reduce server load',
      'Enable Cloud Monitoring for better resource tracking'
    ]
  },
  {
    id: '2',
    name: 'Cloud SQL - MySQL',
    type: 'database',
    provider: 'Google Cloud',
    region: 'asia-south1',
    currentUsage: 12,
    efficiency: 78,
    cost: 2800, // INR
    co2Emissions: 35,
    recommendations: [
      'Enable query caching to improve performance',
      'Consider downgrading instance size during non-peak hours',
      'Implement connection pooling to reduce idle connections'
    ]
  },
  {
    id: '3',
    name: 'Cloud Storage',
    type: 'storage',
    provider: 'Google Cloud',
    region: 'asia-south1',
    currentUsage: 8,
    efficiency: 90,
    cost: 850, // INR
    co2Emissions: 15,
    recommendations: [
      'Enable Object Lifecycle Management for infrequently accessed data',
      'Use Cloud Storage compression for text-based files',
      'Implement signed URLs for secure temporary access'
    ]
  },
  {
    id: '4',
    name: 'Cloud CDN',
    type: 'network',
    provider: 'Google Cloud',
    region: 'Global',
    currentUsage: 10,
    efficiency: 95,
    cost: 750, // INR
    co2Emissions: 12,
    recommendations: [
      'Review cache TTL settings for static assets',
      'Enable Cloud CDN compression',
      'Configure custom domains for better SEO'
    ]
  }
];

export const greenScoreMetrics: GreenScoreMetrics = {
  codeEfficiency: 85,
  infrastructureEfficiency: 88,
  resourceUtilization: 25, // Low utilization
  carbonIntensity: 92, // Good score due to low usage
  overall: 82
};

export const historicalData: HistoricalData[] = [
  { date: getDaysAgo(30), co2Emissions: 120, greenScore: 80, energyUsage: 85, costSavings: 0 },
  { date: getDaysAgo(25), co2Emissions: 115, greenScore: 81, energyUsage: 82, costSavings: 450 },
  { date: getDaysAgo(20), co2Emissions: 112, greenScore: 82, energyUsage: 80, costSavings: 850 },
  { date: getDaysAgo(15), co2Emissions: 108, greenScore: 83, energyUsage: 78, costSavings: 1200 },
  { date: getDaysAgo(10), co2Emissions: 105, greenScore: 84, energyUsage: 75, costSavings: 1500 },
  { date: getDaysAgo(5), co2Emissions: 102, greenScore: 85, energyUsage: 72, costSavings: 1800 },
  { date: getDaysAgo(0), co2Emissions: 98, greenScore: 86, energyUsage: 70, costSavings: 2100 }
];

export const complianceReports: ComplianceReport[] = [
  {
    id: '1',
    name: 'GCP Resource Optimization Report',
    type: 'Infrastructure',
    createdAt: '2024-03-30',
    status: 'submitted',
    metrics: {
      totalEmissions: 285,
      reductions: 45,
      offsetsApplied: 120,
      netEmissions: 120
    },
    downloadUrl: '#'
  },
  {
    id: '2',
    name: 'Carbon Footprint Analysis',
    type: 'Carbon Offset',
    createdAt: '2024-02-15',
    status: 'submitted',
    metrics: {
      totalEmissions: 310,
      reductions: 0,
      offsetsApplied: 310,
      netEmissions: 0
    },
    downloadUrl: '#'
  },
  {
    id: '3',
    name: 'Q1 2024 Sustainability Report',
    type: 'Internal',
    createdAt: '2024-04-10',
    status: 'draft',
    metrics: {
      totalEmissions: 280,
      reductions: 55,
      offsetsApplied: 100,
      netEmissions: 125
    },
    downloadUrl: '#'
  }
];

export const emissionSources: EmissionSource[] = [
  { name: 'App Engine', value: 45, percentage: 42 },
  { name: 'Cloud SQL', value: 35, percentage: 32 },
  { name: 'Cloud Storage', value: 15, percentage: 14 },
  { name: 'Cloud CDN', value: 12, percentage: 11 },
  { name: 'Other Services', value: 1, percentage: 1 }
];

export const optimizationImpact = {
  before: {
    co2Emissions: 285,
    costPerMonth: 7600, // INR
    pageLoadTime: 2.8,
    serverResponseTime: 220
  },
  after: {
    co2Emissions: 98,
    costPerMonth: 4850, // INR
    pageLoadTime: 1.5,
    serverResponseTime: 95
  },
  savings: {
    co2EmissionsPercentage: 65,
    costPercentage: 36,
    pageLoadTimePercentage: 46,
    serverResponseTimePercentage: 57
  }
};

export const mockRepoInfo: GitHubRepoInfo = {
  name: 'HackForge',
  description: 'A comprehensive development platform for modern web applications',
  owner: {
    login: 'tanay-koli',
    avatar_url: 'https://avatars.githubusercontent.com/u/default'
  },
  stargazers_count: 0,
  forks_count: 0,
  last_commit: {
    sha: '8f9b5d1',
    date: new Date().toISOString(),
    message: 'Update deployment configuration'
  },
  languages: {
    JavaScript: 65,
    TypeScript: 20,
    HTML: 10,
    CSS: 5
  }
};

export interface AnalysisIssue {
  id: string;
  file: string;
  lineStart: number;
  lineEnd: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  suggestion: string;
  impact: {
    co2: number;
    performance: number;
  };
}

export const mockAnalysisResults: AnalysisIssue[] = [
  {
    id: 'ISSUE-001',
    file: 'src/components/Dashboard.js',
    lineStart: 45,
    lineEnd: 67,
    severity: 'critical',
    description: 'Redundant API Calls: Multiple components fetch the same data independently, leading to unnecessary network requests and increased load times.',
    suggestion: 'Implement centralized data fetching using React Query or Redux Toolkit. Cache responses and share data between components.',
    impact: {
      co2: 5.2,
      performance: 35
    }
  },
  {
    id: 'ISSUE-002',
    file: 'src/services/dataProcessor.js',
    lineStart: 112,
    lineEnd: 145,
    severity: 'high',
    description: 'Unoptimized Loops: Large dataset processing on client-side causing high CPU usage and energy consumption.',
    suggestion: 'Move data processing to server-side. Implement pagination and virtual scrolling for large datasets.',
    impact: {
      co2: 3.8,
      performance: 28
    }
  },
  {
    id: 'ISSUE-003',
    file: 'src/components/UserProfile.js',
    lineStart: 23,
    lineEnd: 89,
    severity: 'medium',
    description: 'Lack of Memoization: Unnecessary re-renders of complex components affecting performance.',
    suggestion: 'Use React.memo for functional components and useMemo for expensive calculations.',
    impact: {
      co2: 2.1,
      performance: 15
    }
  },
  {
    id: 'ISSUE-004',
    file: 'src/utils/database.js',
    lineStart: 78,
    lineEnd: 92,
    severity: 'high',
    description: 'Inefficient Database Queries: Unindexed queries leading to increased processing time and resource utilization.',
    suggestion: 'Add proper indexes for frequently queried fields. Implement query caching.',
    impact: {
      co2: 4.5,
      performance: 40
    }
  },
  {
    id: 'ISSUE-005',
    file: 'public/assets/images/',
    lineStart: 1,
    lineEnd: 1,
    severity: 'medium',
    description: 'Static Asset Loading: Uncompressed image files causing longer load times and increased bandwidth usage.',
    suggestion: 'Implement image compression and use modern formats like WebP. Add lazy loading for images.',
    impact: {
      co2: 2.8,
      performance: 25
    }
  }
];