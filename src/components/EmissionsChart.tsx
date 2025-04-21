import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { EmissionSource } from '../types';

interface EmissionsChartProps {
  data: EmissionSource[];
}

const EmissionsChart: React.FC<EmissionsChartProps> = ({ data }) => {
  const COLORS = ['#10B981', '#3B82F6', '#0D9488', '#F59E0B', '#EF4444'];
  
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Emission Sources</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              animationBegin={200}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value} kg CO₂e`, 'Emissions']}
              contentStyle={{ 
                borderRadius: '0.5rem', 
                border: 'none', 
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                padding: '0.75rem'
              }}
              itemStyle={{ fontSize: '0.875rem' }}
            />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              formatter={(value) => {
                const item = data.find(d => d.name === value);
                return <span className="text-xs">{`${value} (${item?.percentage}%)`}</span>;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4">
        <div className="text-sm font-medium text-gray-500">Total Emissions</div>
        <div className="text-2xl font-bold text-gray-900">
          {data.reduce((total, item) => total + item.value, 0)} kg CO₂e
        </div>
      </div>
    </div>
  );
};

export default EmissionsChart;