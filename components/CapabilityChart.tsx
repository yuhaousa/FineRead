
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { CapabilityType } from '../types';
import { PISA_CAPABILITIES } from '../constants';

interface CapabilityChartProps {
  data: Record<CapabilityType, number>;
}

const CapabilityChart: React.FC<CapabilityChartProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([key, value]) => ({
    subject: PISA_CAPABILITIES[key as CapabilityType].name,
    A: value,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
          <Radar
            name="能力画像"
            dataKey="A"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CapabilityChart;
