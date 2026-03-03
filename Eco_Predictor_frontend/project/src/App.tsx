import { useState } from 'react';
import { Activity } from 'lucide-react';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel';

interface PredictionResult {
  risk_level: string;
  message: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: {
    aqi: string;
    temperature: string;
    humidity: string;
    populationDensity: string;
  }) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        AQI: parseFloat(formData.aqi),
        Temperature_C: parseFloat(formData.temperature),
        Humidity_pct: parseFloat(formData.humidity),
        Population_Density: parseFloat(formData.populationDensity),
      };

      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-green-500 to-teal-600 p-2 rounded-lg">
              <Activity className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">EcoPulse</h1>
              <p className="text-sm text-gray-600">Disease Predictor</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Risk Assessment Dashboard
          </h2>
          <p className="text-gray-600">
            Analyze environmental factors to predict healthcare risk
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputPanel onSubmit={handleSubmit} loading={loading} />
          <ResultsPanel loading={loading} result={result} error={error} />
        </div>
      </main>

      <footer className="mt-12 py-6 text-center text-gray-500 text-sm">
        <p>EcoPulse Disease Predictor - Environmental Health Intelligence</p>
      </footer>
    </div>
  );
}

export default App;
