export interface ComplianceReport {
  id: string;
  name: string;
  type: 'ESG' | 'Carbon Offset' | 'Internal' | 'Regulatory' | 'Infrastructure';
  createdAt: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  metrics: {
    totalEmissions: number;
    reductions: number;
    offsetsApplied: number;
    netEmissions: number;
  };
  downloadUrl: string;
} 