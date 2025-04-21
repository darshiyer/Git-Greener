import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatCO2(value: number): string {
  if (value < 1000) {
    return `${value.toFixed(2)} kg CO₂e`;
  } else {
    return `${(value / 1000).toFixed(2)} tonnes CO₂e`;
  }
}

export function formatCO2Equivalent(value: number): string {
  // Converting kg CO2 to everyday equivalents
  if (value < 10) {
    return `${(value * 4).toFixed(1)} miles driven by an average car`;
  } else if (value < 100) {
    return `${(value / 22).toFixed(1)} gallons of gasoline consumed`;
  } else if (value < 1000) {
    return `${(value / 500).toFixed(1)} months of electricity for one home`;
  } else {
    return `${(value / 12000).toFixed(1)} homes' electricity use for one year`;
  }
}

export function calculateGreenScore(metrics: {
  codeEfficiency: number;
  infrastructureEfficiency: number;
  resourceUtilization: number;
  carbonIntensity: number;
}): number {
  const { codeEfficiency, infrastructureEfficiency, resourceUtilization, carbonIntensity } = metrics;
  
  // Weighted calculation - this is a simplified example
  const score = 
    codeEfficiency * 0.25 + 
    infrastructureEfficiency * 0.25 + 
    resourceUtilization * 0.25 + 
    carbonIntensity * 0.25;
  
  // Return a value between 0 and 100, rounded to nearest integer
  return Math.round(Math.min(Math.max(score, 0), 100));
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-success-500';
  if (score >= 60) return 'text-primary-500'; 
  if (score >= 40) return 'text-warning-500';
  return 'text-error-500';
}

export function getScoreGradient(score: number): string {
  if (score >= 80) return 'from-success-500 to-success-400';
  if (score >= 60) return 'from-primary-500 to-primary-400';
  if (score >= 40) return 'from-warning-500 to-warning-400';
  return 'from-error-500 to-error-400';
}

export function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}