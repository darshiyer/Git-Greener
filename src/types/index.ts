export interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'code' | 'infrastructure' | 'database' | 'network';
  estimatedSavings: {
    co2: number; // in kg CO2e
    cost: number; // in USD
    performance: number; // percentage improvement
  };
  implementation: string;
  status: 'pending' | 'in-progress' | 'implemented' | 'dismissed';
}

export interface CodeIssue {
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

export interface ResourceUsage {
  id: string;
  name: string;
  type: 'server' | 'database' | 'storage' | 'network';
  provider: string;
  region: string;
  currentUsage: number;
  efficiency: number;
  cost: number;
  co2Emissions: number;
  recommendations: string[];
}

export interface GreenScoreMetrics {
  codeEfficiency: number;
  infrastructureEfficiency: number;
  resourceUtilization: number;
  carbonIntensity: number;
  overall: number;
}

export interface HistoricalData {
  date: string;
  co2Emissions: number;
  greenScore: number;
  energyUsage: number; // in kWh
  costSavings: number; // in USD
}

export interface ComplianceReport {
  id: string;
  name: string;
  type: 'ESG' | 'Carbon Offset' | 'Internal' | 'Regulatory';
  createdAt: string;
  status: 'draft' | 'ready' | 'submitted';
  metrics: {
    totalEmissions: number;
    reductions: number;
    offsetsApplied: number;
    netEmissions: number;
  };
  downloadUrl: string;
}

export interface EmissionSource {
  name: string;
  value: number;
  percentage: number;
}