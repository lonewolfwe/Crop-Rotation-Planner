import { RotationPlan } from '../types';
import { Calendar } from 'lucide-react';
import { Field } from '../types'; // Assuming Field type is available

interface RotationPlanDisplayProps {
  plan: RotationPlan;
  onDelete: (id: string) => void;
  fieldName?: string; // Optional prop for field name
  // OR
  fields?: Field[]; // Pass the array of fields to look up the name
}

export function RotationPlanDisplay({ plan, onDelete, fieldName, fields }: RotationPlanDisplayProps) {
  const currentFieldName = fieldName || (fields && fields.find(f => f.id === plan.fieldId)?.name) || 'Unknown Field';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="text-green-600" />
          <h3 className="text-lg font-semibold">Rotation Plan for {currentFieldName}</h3> {/* Display field name */}
        </div>
        <button
          onClick={() => onDelete(plan.id)}
          className="text-red-600 hover:text-red-700 text-sm"
        >
          Delete Plan
        </button>
      </div>

      <div className="space-y-4">
        {plan.years.map((year) => (
          <div
            key={year.year}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <span className="font-medium">Year {year.year}</span>
            <span className="text-gray-600">{year.crop}</span>
          </div>
        ))}
        <p className="text-gray-500 text-sm italic">Created on: {new Date(plan.createdAt).toLocaleDateString()}</p> {/* Display creation date */}
      </div>
    </div>
  );
}