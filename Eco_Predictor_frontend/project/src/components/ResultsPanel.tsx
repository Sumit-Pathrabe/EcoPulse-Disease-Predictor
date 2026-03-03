import { AlertCircle, Info, Loader } from 'lucide-react';

interface ResultsPanelProps {
  loading: boolean;
  result: {
    risk_level: string;
    message: string;
  } | null;
  error: string | null;
}

export default function ResultsPanel({ loading, result, error }: ResultsPanelProps) {
  const getRiskColor = (riskLevel: string) => {
    const level = riskLevel.toLowerCase();
    if (level.includes('high')) {
      return { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700' };
    }
    if (level.includes('medium') || level.includes('moderate')) {
      return { text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700' };
    }
    return { text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700' };
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          Risk Assessment Result
        </h3>
        <p className="text-sm text-gray-600">Real-time prediction based on API analysis</p>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader className="w-12 h-12 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Analyzing environmental data...</p>
          <p className="text-sm text-gray-500 mt-1">Processing factors for risk assessment</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-red-800 mb-1">Error</p>
              <p className="text-sm text-red-700">{error}</p>
              <p className="text-xs text-red-600 mt-2">Please ensure the API is running at http://127.0.0.1:8000</p>
            </div>
          </div>
        </div>
      )}

      {result && !loading && !error && (
        <div className="space-y-6">
          <div className={`${getRiskColor(result.risk_level).bg} ${getRiskColor(result.risk_level).border} border rounded-lg p-8`}>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-3">Risk Level Assessment</p>
              <div className={`inline-block px-6 py-2 rounded-full ${getRiskColor(result.risk_level).badge} font-bold text-lg mb-4`}>
                {result.risk_level}
              </div>
              <div className={`text-4xl font-bold ${getRiskColor(result.risk_level).text}`}>
                {result.risk_level}
              </div>
            </div>
          </div>

          <div className={`${getRiskColor(result.risk_level).bg} ${getRiskColor(result.risk_level).border} border rounded-lg p-6`}>
            <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Analysis Message</p>
            <p className={`text-base leading-relaxed ${getRiskColor(result.risk_level).text}`}>
              {result.message}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-blue-900 mb-1">Information</p>
            <p className="text-xs text-blue-800">
              This risk assessment is based on real-time environmental and population data analysis. Always consult with healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      )}

      {!loading && !result && !error && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-blue-50 p-4 rounded-full mb-4">
            <Info className="w-12 h-12 text-blue-500" />
          </div>
          <p className="text-gray-600 font-medium mb-2">No analysis yet</p>
          <p className="text-sm text-gray-500">Fill in all environmental parameters and click "Analyze Risk" to see results</p>
        </div>
      )}
    </div>
  );
}
