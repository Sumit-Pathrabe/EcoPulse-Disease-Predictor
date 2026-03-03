interface RiskGaugeProps {
  percentage: number;
}

export default function RiskGauge({ percentage }: RiskGaugeProps) {
  const getColor = (percent: number) => {
    if (percent > 70) return 'from-red-500 to-red-600';
    if (percent > 50) return 'from-orange-500 to-orange-600';
    return 'from-green-500 to-teal-600';
  };

  const getGlowColor = (percent: number) => {
    if (percent > 70) return 'shadow-red-200';
    if (percent > 50) return 'shadow-orange-200';
    return 'shadow-green-200';
  };

  return (
    <div className="relative w-full">
      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${getColor(percentage)} transition-all duration-1000 ease-out relative`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
        </div>
      </div>

      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>0%</span>
        <span className="font-medium text-gray-700">Risk Level</span>
        <span>100%</span>
      </div>

      <div className="flex justify-between mt-1 text-xs font-medium">
        <span className="text-green-600">Low</span>
        <span className="text-orange-600">Moderate</span>
        <span className="text-red-600">High</span>
      </div>
    </div>
  );
}
