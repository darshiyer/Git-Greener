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
    name: 'Web Application Servers',
    type: 'server',
    provider: 'AWS',
    region: 'us-east-1',
    currentUsage: 65,
    efficiency: 58,
    cost: 450,
    co2Emissions: 320,
    recommendations: [
      'Implement auto-scaling based on traffic patterns',
      'Migrate to ARM-based instances for better energy efficiency',
      'Use spot instances for non-critical workloads'
    ]
  },
  {
    id: '2',
    name: 'PostgreSQL Database',
    type: 'database',
    provider: 'AWS',
    region: 'us-east-1',
    currentUsage: 42,
    efficiency: 71,
    cost: 380,
    co2Emissions: 210,
    recommendations: [
      'Optimize schema and indexes for common queries',
      'Implement connection pooling to reduce idle connections',
      'Consider serverless options for variable workloads'
    ]
  },
  {
    id: '3',
    name: 'Object Storage',
    type: 'storage',
    provider: 'AWS',
    region: 'us-east-1',
    currentUsage: 78,
    efficiency: 85,
    cost: 250,
    co2Emissions: 120,
    recommendations: [
      'Implement lifecycle policies to archive infrequently accessed data',
      'Enable compression for compressible file types',
      'Set up intelligent tiering for cost optimization'
    ]
  },
  {
    id: '4',
    name: 'CDN Distribution',
    type: 'network',
    provider: 'Cloudflare',
    region: 'Global',
    currentUsage: 82,
    efficiency: 90,
    cost: 180,
    co2Emissions: 90,
    recommendations: [
      'Optimize cache hit ratio by reviewing TTL settings',
      'Enable Brotli compression for text-based assets',
      'Implement image optimization at edge'
    ]
  }
];

export const greenScoreMetrics: GreenScoreMetrics = {
  codeEfficiency: 68,
  infrastructureEfficiency: 72,
  resourceUtilization: 65,
  carbonIntensity: 75,
  overall: 70
};

export const historicalData: HistoricalData[] = [
  { date: getDaysAgo(30), co2Emissions: 1820, greenScore: 60, energyUsage: 450, costSavings: 0 },
  { date: getDaysAgo(25), co2Emissions: 1760, greenScore: 62, energyUsage: 438, costSavings: 120 },
  { date: getDaysAgo(20), co2Emissions: 1680, greenScore: 65, energyUsage: 420, costSavings: 250 },
  { date: getDaysAgo(15), co2Emissions: 1590, greenScore: 67, energyUsage: 405, costSavings: 390 },
  { date: getDaysAgo(10), co2Emissions: 1450, greenScore: 69, energyUsage: 380, costSavings: 520 },
  { date: getDaysAgo(5), co2Emissions: 1320, greenScore: 72, energyUsage: 350, costSavings: 680 },
  { date: getDaysAgo(0), co2Emissions: 1240, greenScore: 75, energyUsage: 320, costSavings: 820 }
];

export const complianceReports: ComplianceReport[] = [
  {
    id: '1',
    name: 'Q1 2025 ESG Report',
    type: 'ESG',
    createdAt: '2025-03-30',
    status: 'submitted',
    metrics: {
      totalEmissions: 4850,
      reductions: 750,
      offsetsApplied: 2000,
      netEmissions: 2100
    },
    downloadUrl: '#'
  },
  {
    id: '2',
    name: 'Carbon Offset Verification',
    type: 'Carbon Offset',
    createdAt: '2025-02-15',
    status: 'submitted',
    metrics: {
      totalEmissions: 5200,
      reductions: 0,
      offsetsApplied: 5200,
      netEmissions: 0
    },
    downloadUrl: '#'
  },
  {
    id: '3',
    name: 'Sustainability Initiative Progress',
    type: 'Internal',
    createdAt: '2025-04-10',
    status: 'draft',
    metrics: {
      totalEmissions: 4500,
      reductions: 950,
      offsetsApplied: 1500,
      netEmissions: 2050
    },
    downloadUrl: '#'
  }
];

export const emissionSources: EmissionSource[] = [
  { name: 'Server Infrastructure', value: 520, percentage: 42 },
  { name: 'Database Operations', value: 310, percentage: 25 },
  { name: 'CDN & Network', value: 180, percentage: 14.5 },
  { name: 'Client-Side Rendering', value: 150, percentage: 12 },
  { name: 'Background Processes', value: 80, percentage: 6.5 }
];

export const optimizationImpact = {
  before: {
    co2Emissions: 2100,
    costPerMonth: 2850,
    pageLoadTime: 3.2,
    serverResponseTime: 280
  },
  after: {
    co2Emissions: 1240,
    costPerMonth: 2030,
    pageLoadTime: 1.8,
    serverResponseTime: 120
  },
  savings: {
    co2EmissionsPercentage: 41,
    costPercentage: 29,
    pageLoadTimePercentage: 44,
    serverResponseTimePercentage: 57
  }
};