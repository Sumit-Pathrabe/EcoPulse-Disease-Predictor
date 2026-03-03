import { useState } from 'react';
import { Cloud, Thermometer, Droplets, Users } from 'lucide-react';

interface InputPanelProps {
  onSubmit: (formData: {
    aqi: string;
    temperature: string;
    humidity: string;
    populationDensity: string;
  }) => void;
  loading: boolean;
}

export default function InputPanel({ onSubmit, loading }: InputPanelProps) {
  const [formData, setFormData] = useState({
    aqi: '',
    temperature: '',
    humidity: '',
    populationDensity: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = Object.values(formData).every((val) => val.trim() !== '');

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Cloud className="w-5 h-5 text-blue-500" />
          Environmental Factors
        </h3>
        <p className="text-sm text-gray-600">Enter environmental parameters for analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="aqi" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-gray-500" />
            Air Quality Index (AQI)
          </label>
          <input
            type="number"
            id="aqi"
            value={formData.aqi}
            onChange={(e) => handleChange('aqi', e.target.value)}
            placeholder="0-500"
            step="0.1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>

        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-gray-500" />
            Temperature (°C)
          </label>
          <input
            type="number"
            id="temperature"
            value={formData.temperature}
            onChange={(e) => handleChange('temperature', e.target.value)}
            placeholder="Enter temperature"
            step="0.1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>

        <div>
          <label htmlFor="humidity" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-gray-500" />
            Humidity (%)
          </label>
          <input
            type="number"
            id="humidity"
            value={formData.humidity}
            onChange={(e) => handleChange('humidity', e.target.value)}
            placeholder="0-100"
            step="0.1"
            min="0"
            max="100"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>

        <div>
          <label htmlFor="populationDensity" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            Population Density
          </label>
          <input
            type="number"
            id="populationDensity"
            value={formData.populationDensity}
            onChange={(e) => handleChange('populationDensity', e.target.value)}
            placeholder="People per km²"
            step="0.1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-4 rounded-lg font-semibold text-white transition-all transform ${
            isFormValid && !loading
              ? 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {loading ? 'Analyzing...' : 'Analyze Risk'}
        </button>
      </form>
    </div>
  );
}
