import { useState } from 'react';
import { Field } from '../types';
import { Leaf } from 'lucide-react';

interface FieldFormProps {
  onSubmit: (field: Field) => void;
}

export function FieldForm({ onSubmit }: FieldFormProps) {
  const [formData, setFormData] = useState<Omit<Field, 'id'>>({
    name: '',
    size: 0,
    soilType: '',
    currentCrop: '',
    pH: 7.0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Leaf className="text-green-600" />
        <h2 className="text-xl font-semibold">Add New Field</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Field Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Size (acres)</label>
        <input
          type="number"
          required
          min="0"
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
          value={formData.size}
          onChange={(e) => setFormData(prev => ({ ...prev, size: parseFloat(e.target.value) }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Soil Type</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
          value={formData.soilType}
          onChange={(e) => setFormData(prev => ({ ...prev, soilType: e.target.value }))}
        >
          <option value="">Select soil type...</option>
          <option value="clay">Clay</option>
          <option value="sandy">Sandy</option>
          <option value="loam">Loam</option>
          <option value="silt">Silt</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Current Crop</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
          value={formData.currentCrop}
          onChange={(e) => setFormData(prev => ({ ...prev, currentCrop: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Soil pH</label>
        <input
          type="number"
          required
          min="0"
          max="14"
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
          value={formData.pH}
          onChange={(e) => setFormData(prev => ({ ...prev, pH: parseFloat(e.target.value) }))}
        />
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
