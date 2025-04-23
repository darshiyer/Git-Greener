import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { ReportFormData } from '../types/reportTypes';
import { greenScoreMetrics, resourceUsage, emissionSources, optimizationImpact } from '../data/mockData';

interface ExtendedJsPDF extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

export const generateComplianceReport = (formData: ReportFormData) => {
  const doc = new jsPDF() as ExtendedJsPDF;
  const today = new Date().toLocaleDateString('en-IN');
  let currentY = 20;
  
  // Title
  doc.setFontSize(20);
  doc.text('Sustainability and Infrastructure Report', 20, currentY);
  currentY += 10;
  doc.setFontSize(12);
  doc.text(`Generated on: ${today}`, 20, currentY);
  currentY += 7;
  doc.text(`Organization: ${formData.organizationName}`, 20, currentY);
  currentY += 13;
  
  // Organization Details
  doc.setFontSize(16);
  doc.text('Organization Profile', 20, currentY);
  
  const orgDetails: RowInput[] = [
    ['Industry', formData.industry],
    ['Contact Person', formData.contactPerson],
    ['Email', formData.email],
    ['Primary Region', formData.primaryRegion],
  ];
  
  autoTable(doc, {
    startY: currentY + 5,
    head: [['Field', 'Value']],
    body: orgDetails,
    theme: 'striped',
    headStyles: { fillColor: [76, 175, 80] }
  });
  
  // Infrastructure Details
  doc.setFontSize(16);
  doc.text('Infrastructure Overview', 20, (doc.lastAutoTable?.finalY || currentY) + 15);
  
  const infraDetails: RowInput[] = [
    ['Cloud Providers', formData.cloudProviders.join(', ')],
    ['Total Servers', formData.totalServers.toString()],
    ['Monthly Cloud Budget', `$${formData.monthlyCloudBudget}`],
    ['Programming Languages', formData.mainProgrammingLanguages.join(', ')],
    ['Average Daily Traffic', `${formData.averageDailyTraffic} requests/day`],
    ['Peak Hour Traffic', `${formData.peakHourTraffic} requests/hour`],
    ['Number of Microservices', formData.numberOfMicroservices.toString()]
  ];
  
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY || currentY) + 20,
    head: [['Metric', 'Value']],
    body: infraDetails,
    theme: 'striped',
    headStyles: { fillColor: [63, 81, 181] }
  });
  
  // Sustainability Goals
  doc.setFontSize(16);
  doc.text('Sustainability Targets', 20, (doc.lastAutoTable?.finalY || currentY) + 15);
  
  const sustainabilityGoals: RowInput[] = [
    ['CO₂ Emission Target', `${formData.co2EmissionTarget} kg/year`],
    ['Energy Efficiency Target', `${formData.energyEfficiencyTarget}%`],
    ['Renewable Energy Goal', `${formData.renewableEnergyPercentage}%`]
  ];
  
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY || currentY) + 20,
    head: [['Goal', 'Target']],
    body: sustainabilityGoals,
    theme: 'striped',
    headStyles: { fillColor: [121, 85, 72] }
  });
  
  // Challenges Section
  doc.addPage();
  doc.setFontSize(16);
  doc.text('Current Challenges and Concerns', 20, 20);
  currentY = 20;
  
  // Performance Challenges
  if (formData.performanceChallenges) {
    doc.setFontSize(14);
    doc.text('Performance Challenges:', 20, currentY + 15);
    doc.setFontSize(12);
    doc.text(formData.performanceChallenges, 25, currentY + 25, {
      maxWidth: 170,
    });
    currentY += 40 + (formData.performanceChallenges.length / 100) * 5;
  }
  
  // Scalability Concerns
  if (formData.scalabilityConcerns) {
    doc.setFontSize(14);
    doc.text('Scalability Concerns:', 20, currentY + 15);
    doc.setFontSize(12);
    doc.text(formData.scalabilityConcerns, 25, currentY + 25, {
      maxWidth: 170,
    });
    currentY += 40 + (formData.scalabilityConcerns.length / 100) * 5;
  }
  
  // Sustainability Concerns
  if (formData.sustainabilityConcerns) {
    doc.setFontSize(14);
    doc.text('Sustainability Concerns:', 20, currentY + 15);
    doc.setFontSize(12);
    doc.text(formData.sustainabilityConcerns, 25, currentY + 25, {
      maxWidth: 170,
    });
  }
  
  // Compliance and Additional Information
  doc.addPage();
  currentY = 20;
  doc.setFontSize(16);
  doc.text('Compliance & Additional Information', 20, currentY);
  
  const complianceInfo: RowInput[] = [
    ['Compliance Requirements', formData.complianceRequirements.join(', ') || 'None specified'],
    ['Budget Constraints', formData.budgetConstraints || 'None specified']
  ];
  
  if (formData.additionalNotes) {
    complianceInfo.push(['Additional Notes', formData.additionalNotes]);
  }
  
  autoTable(doc, {
    startY: currentY + 10,
    head: [['Category', 'Details']],
    body: complianceInfo,
    theme: 'striped',
    headStyles: { fillColor: [0, 150, 136] }
  });
  
  // Recommendations Section
  doc.setFontSize(16);
  doc.text('Recommendations', 20, (doc.lastAutoTable?.finalY || currentY) + 15);
  
  // Generate recommendations based on the form data
  const recommendations: RowInput[] = generateRecommendations(formData);
  
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY || currentY) + 20,
    head: [['Category', 'Recommendation']],
    body: recommendations,
    theme: 'striped',
    headStyles: { fillColor: [156, 39, 176] }
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
    doc.text(
      'Generated by GitGreener - Sustainable Infrastructure Analysis',
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 5,
      { align: 'center' }
    );
  }
  
  // Save the PDF
  doc.save(`${formData.organizationName}-Sustainability-Report-${today.replace(/\//g, '-')}.pdf`);
};

function generateRecommendations(formData: ReportFormData): RowInput[] {
  const recommendations: RowInput[] = [];
  
  // Infrastructure recommendations
  if (formData.totalServers > 50) {
    recommendations.push(['Infrastructure', 'Consider containerization and orchestration to optimize server utilization']);
  }
  
  if (formData.monthlyCloudBudget > 10000) {
    recommendations.push(['Cost Optimization', 'Implement auto-scaling and reserved instances to reduce cloud costs']);
  }
  
  // Traffic-based recommendations
  if (formData.peakHourTraffic > formData.averageDailyTraffic / 8) {
    recommendations.push(['Performance', 'Implement caching and CDN to handle traffic spikes efficiently']);
  }
  
  // Sustainability recommendations
  if (formData.renewableEnergyPercentage < 50) {
    recommendations.push(['Sustainability', 'Explore green energy providers and carbon offset programs']);
  }
  
  if (formData.energyEfficiencyTarget > 0) {
    recommendations.push(['Energy Efficiency', 'Implement server power management and workload optimization']);
  }
  
  // Microservices recommendations
  if (formData.numberOfMicroservices > 20) {
    recommendations.push(['Architecture', 'Consider service mesh for better microservices management']);
  }
  
  // Add compliance-based recommendations
  if (formData.complianceRequirements.includes('GDPR')) {
    recommendations.push(['Compliance', 'Implement data encryption and regular privacy impact assessments']);
  }
  
  if (formData.complianceRequirements.includes('ISO 27001')) {
    recommendations.push(['Security', 'Establish information security management system (ISMS)']);
  }
  
  return recommendations;
}

export const generateReport = async (): Promise<void> => {
  const doc = new jsPDF() as ExtendedJsPDF;
  const pageWidth = doc.internal.pageSize.width;
  
  // Title
  doc.setFontSize(20);
  doc.text('Sustainability and Infrastructure Report', pageWidth / 2, 20, { align: 'center' });
  
  // Infrastructure Health Scores
  doc.setFontSize(16);
  doc.text('Infrastructure Health Scores', 14, 40);
  autoTable(doc, {
    startY: 45,
    head: [['Metric', 'Score']],
    body: Object.entries(greenScoreMetrics).map(([metric, score]) => [metric, score.toString()]),
  });

  // Infrastructure Resources
  doc.text('Infrastructure Resources', 14, (doc.lastAutoTable?.finalY || 0) + 20);
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY || 0) + 25,
    head: [['Resource', 'Usage']],
    body: Object.entries(resourceUsage).map(([resource, usage]) => [resource, usage.toString()]),
  });

  // Emission Sources Breakdown
  doc.text('Emission Sources Breakdown', 14, (doc.lastAutoTable?.finalY || 0) + 20);
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY || 0) + 25,
    head: [['Source', 'Percentage']],
    body: Object.entries(emissionSources).map(([source, percentage]) => [source, `${percentage}%`]),
  });

  // Optimization Impact Analysis
  doc.text('Optimization Impact Analysis', 14, (doc.lastAutoTable?.finalY || 0) + 20);
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY || 0) + 25,
    head: [['Area', 'Impact']],
    body: Object.entries(optimizationImpact).map(([area, impact]) => [area, impact.toString()]),
  });

  // Footer with page numbers
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
    doc.text(
      'Generated by GreenStack',
      14,
      doc.internal.pageSize.height - 10
    );
  }

  // Save the PDF
  doc.save('sustainability-report.pdf');
}; 