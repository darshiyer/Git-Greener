export interface ReportFormData {
  // Organization Details
  organizationName: string;
  industry: string;
  contactPerson: string;
  email: string;
  
  // Infrastructure Details
  cloudProviders: string[];
  totalServers: number;
  monthlyCloudBudget: number;
  primaryRegion: string;
  
  // Application Details
  mainProgrammingLanguages: string[];
  averageDailyTraffic: number;
  peakHourTraffic: number;
  numberOfMicroservices: number;
  
  // Sustainability Goals
  co2EmissionTarget: number;
  energyEfficiencyTarget: number;
  renewableEnergyPercentage: number;
  
  // Current Challenges
  performanceChallenges: string;
  scalabilityConcerns: string;
  sustainabilityConcerns: string;
  
  // Additional Information
  complianceRequirements: string[];
  budgetConstraints: string;
  additionalNotes: string;
}

export const cloudProviderOptions = [
  'AWS',
  'Google Cloud',
  'Microsoft Azure',
  'DigitalOcean',
  'IBM Cloud',
  'Oracle Cloud',
  'Other'
];

export const programmingLanguageOptions = [
  'JavaScript/TypeScript',
  'Python',
  'Java',
  'Go',
  'Ruby',
  'PHP',
  'C#',
  'Rust',
  'Other'
];

export const complianceOptions = [
  'GDPR',
  'HIPAA',
  'SOC 2',
  'ISO 27001',
  'PCI DSS',
  'CCPA',
  'None'
];

export const regionOptions = [
  'North America',
  'South America',
  'Europe',
  'Asia Pacific',
  'Middle East',
  'Africa',
  'Australia'
]; 