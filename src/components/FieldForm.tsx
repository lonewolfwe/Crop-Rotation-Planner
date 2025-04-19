import { useState } from 'react';
import { Field } from '../types';
import { Leaf } from 'lucide-react';

interface FieldFormProps {
  onSubmit: (field: Field) => void;
}

const nashikCommonCrops = ['Wheat', 'Onion', 'Grapes', 'Soybeans', 'Sugarcane', 'Cotton', 'Maize', 'Pulses'];
const soilTypeOptions = [
  { value: '', label: 'Select soil type...' },
  { value: 'clay_heavy', label: 'Heavy Clay' },
  { value: 'clay_light', label: 'Light Clay' },
  { value: 'sandy_coarse', label: 'Coarse Sandy' },
  { value: 'sandy_fine', label: 'Fine Sandy' },
  { value: 'loam_sandy', label: 'Sandy Loam' },
  { value: 'loam_silty', label: 'Silty Loam' },
  { value: 'silt_pure', label: 'Pure Silt' },
];

export function FieldForm({ onSubmit }: FieldFormProps) {
  const [formData, setFormData] = useState<Omit<Field, 'id'>>({
    name: '',
    size: 0,
    soilType: '',
    currentCrop: '',
    pH: 7.0,
  });
  const [sizeError, setSizeError] = useState('');
  const [phError, setPhError] = useState('');

  const validateSize = (size: number) => {
    if (size < 0) {
      setSizeError('Please enter a non-negative size.');
      return false;
    }
    setSizeError('');
    return true;
  };

  const validatePh = (ph: number) => {
    if (ph < 0 || ph > 14) {
      setPhError('pH value must be between 0 and 14.');
      return false;
    }
    setPhError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isSizeValid = validateSize(formData.size);
    const isPhValid = validatePh(formData.pH);

    if (isSizeValid && isPhValid) {
      onSubmit({
        ...formData,
        id: crypto.randomUUID(),
      });
      setFormData({
        name: '',
        size: 0,
        soilType: '',
        currentCrop: '',
        pH: 7.0,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Leaf className="text-green-600" />
        <h2 className="text-xl font-semibold">Add New Field</h2>
      </div>

      <div>
        <label htmlFor="fieldName" className="block text-sm font-medium text-gray-700">Field Name</label>
        <input
          type="text"
          id="fieldName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="fieldSize" className="block text-sm font-medium text-gray-700">Size (acres)</label>
        <input
          type="number"
          id="fieldSize"
          required
          min="0"
          step="0.1"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border ${sizeError ? 'border-red-500' : ''}`}
          value={formData.size}
          onChange={(e) => setFormData(prev => ({ ...prev, size: parseFloat(e.target.value) }))}
          onBlur={(e) => validateSize(parseFloat(e.target.value))}
        />
        {sizeError && <p className="text-red-500 text-xs italic">{sizeError}</p>}
      </div>

      <div>
        <label htmlFor="soilType" className="block text-sm font-medium text-gray-700">Soil Type</label>
        <select
          id="soilType"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
          value={formData.soilType}
          onChange={(e) => setFormData(prev => ({ ...prev, soilType: e.target.value }))}
        >
          {soilTypeOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="currentCrop" className="block text-sm font-medium text-gray-700">Current Crop</label>
        <select
          id="currentCrop"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
          value={formData.currentCrop}
          onChange={(e) => setFormData(prev => ({ ...prev, currentCrop: e.target.value }))}
        >
          <option value="">Select current crop...</option>
          {nashikCommonCrops.map(crop => (
            <option key={crop} value={crop}>{crop}</option>
          ))}
          <option value="other">Other (please specify)</option>
        </select>
        {formData.currentCrop === 'other' && (
          <input
            type="text"
            placeholder="Specify other crop"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
            value={formData.currentCrop}
            onChange={(e) => setFormData(prev => ({ ...prev, currentCrop: e.target.value }))}
          />
        )}
      </div>

      <div>
        <label htmlFor="pH" className="block text-sm font-medium text-gray-700">Soil pH</label>
        <input
          type="number"
          id="pH"
          required
          min="0"
          max="14"
          step="0.1"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border ${phError ? 'border-red-500' : ''}`}
          value={formData.pH}
          onChange={(e) => setFormData(prev => ({ ...prev, pH: parseFloat(e.target.value) }))}
          onBlur={(e) => validatePh(parseFloat(e.target.value))}
        />
        {phError && <p className="text-red-500 text-xs italic">{phError}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
      >
        Add Field
      </button>
    </form>
  );
}