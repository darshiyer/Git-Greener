import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cloud, Database, Download, Laptop, Server, Zap, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DataGrid } from '../components/ui/DataGrid';
import GreenScoreCard from '../components/GreenScoreCard';
import EmissionsChart from '../components/EmissionsChart';
import SuggestionsCard from '../components/SuggestionsCard';
import MetricsCard from '../components/MetricsCard';
import HistoricalChart from '../components/HistoricalChart';
import RecommendationChat from '../components/RecommendationChat';
import { 
  greenScoreMetrics, 
  emissionSources, 
  optimizationSuggestions,
  historicalData,
  optimizationImpact
} from '../data/mockData';
import { formatCO2, formatCO2Equivalent } from '../lib/utils';

const Dashboard: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const formattedCO2 = formatCO2(optimizationImpact.after.co2Emissions);
  const co2Equivalent = formatCO2Equivalent(optimizationImpact.after.co2Emissions);
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Sustainability Dashboard</h1>
          <p className="mt-1 text-gray-500">Monitor and optimize your digital carbon footprint</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            leftIcon={<Download className="h-4 w-4" />}
          >
            Export Report
          </Button>
          <Button
            variant="primary"
            leftIcon={<Zap className="h-4 w-4" />}
          >
            Run New Analysis
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Current Carbon Footprint"
          value={formattedCO2}
          icon={<Cloud className="h-5 w-5 text-primary-500" />}
          change={optimizationImpact.savings.co2EmissionsPercentage}
          trend="down"
          color="bg-primary-50"
          subtitle={co2Equivalent}
        />
        
        <MetricsCard
          title="Infrastructure Efficiency"
          value={`${greenScoreMetrics.infrastructureEfficiency}%`}
          icon={<Server className="h-5 w-5 text-secondary-500" />}
          change={12}
          trend="up"
          color="bg-secondary-50"
        />
        
        <MetricsCard
          title="Monthly Cost Savings"
          value={`₹${optimizationImpact.savings.costPercentage * 100}`}
          icon={<Zap className="h-5 w-5 text-warning-500" />}
          change={optimizationImpact.savings.costPercentage}
          trend="down"
          color="bg-warning-50"
        />
        
        <MetricsCard
          title="Response Time"
          value={`${optimizationImpact.after.serverResponseTime}ms`}
          icon={<Database className="h-5 w-5 text-accent-500" />}
          change={optimizationImpact.savings.serverResponseTimePercentage}
          trend="down"
          color="bg-accent-50"
        />
      </div>

      {/* Green Score and Emissions Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Green Score</CardTitle>
            <CardDescription>Overall sustainability rating</CardDescription>
          </CardHeader>
          <CardContent>
            <GreenScoreCard metrics={greenScoreMetrics} />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Carbon Emissions Trend</CardTitle>
            <CardDescription>Historical carbon footprint data</CardDescription>
          </CardHeader>
          <CardContent>
            <HistoricalChart
              data={historicalData}
              dataKey="co2Emissions"
              color="#10B981"
              gradient="carbonGradient"
              title="Carbon Emissions Trend"
              valueFormatter={(value) => `${value} kg CO₂e`}
            />
          </CardContent>
        </Card>
      </div>

      {/* Optimization Suggestions and Emission Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Optimization Suggestions</CardTitle>
              <CardDescription>Actionable insights to reduce emissions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                leftIcon={<MessageSquare className="h-4 w-4" />}
                onClick={() => setIsChatOpen(true)}
              >
                Chat with AI
              </Button>
              <Button variant="ghost" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <SuggestionsCard suggestions={optimizationSuggestions} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emission Sources</CardTitle>
            <CardDescription>Breakdown of carbon footprint</CardDescription>
          </CardHeader>
          <CardContent>
            <EmissionsChart data={emissionSources} />
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Green Score Progress</CardTitle>
            <CardDescription>Sustainability score over time</CardDescription>
          </CardHeader>
          <CardContent>
            <HistoricalChart
              data={historicalData}
              dataKey="greenScore"
              color="#3B82F6"
              gradient="scoreGradient"
              title="Green Score Trend"
              valueFormatter={(value) => `${value}/100`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Optimization</CardTitle>
            <CardDescription>Financial benefits of green initiatives</CardDescription>
          </CardHeader>
          <CardContent>
            <HistoricalChart
              data={historicalData}
              dataKey="costSavings"
              color="#F59E0B"
              gradient="costGradient"
              title="Cost Savings Trend"
              valueFormatter={(value) => `₹${value}`}
            />
          </CardContent>
        </Card>
      </div>

      {/* Chat Modal */}
      <RecommendationChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;