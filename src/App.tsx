import { useState, useEffect } from 'react';
import { Field, RotationPlan } from './types';
import { FieldForm } from './components/FieldForm';
import { RotationPlanDisplay } from './components/RotationPlanDisplay';
import { generateRotation } from './utils/rotationLogic';
import { Sprout } from 'lucide-react';
import './index.css';

function App() {
  const [fields, setFields] = useState<Field[]>([]);
  const [plans, setPlans] = useState<RotationPlan[]>([]);

  useEffect(() => {
    const savedFields = localStorage.getItem('fields');
    const savedPlans = localStorage.getItem('plans');
    
    if (savedFields) setFields(JSON.parse(savedFields));
    if (savedPlans) setPlans(JSON.parse(savedPlans));
  }, []);

  const handleAddField = (field: Field) => {
    const newFields = [...fields, field];
    setFields(newFields);
    localStorage.setItem('fields', JSON.stringify(newFields));

    // Generate rotation plan for new field
    const rotation = generateRotation(field.currentCrop);
    const plan: RotationPlan = {
      id: crypto.randomUUID(),
      fieldId: field.id,
      createdAt: new Date().toISOString(),
      years: rotation.map((crop, index) => ({
        year: index + 1,
        crop,
      })),
    };

    const newPlans = [...plans, plan];
    setPlans(newPlans);
    localStorage.setItem('plans', JSON.stringify(newPlans));
  };

  const handleDeletePlan = (planId: string) => {
    const newPlans = plans.filter(plan => plan.id !== planId);
    setPlans(newPlans);
    localStorage.setItem('plans', JSON.stringify(newPlans));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Sprout className="text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Crop Rotation Planner</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <FieldForm onSubmit={handleAddField} />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Rotation Plans</h2>
            {plans.map(plan => (
              <RotationPlanDisplay
                key={plan.id}
                plan={plan}
                onDelete={handleDeletePlan}
              />
            ))}
            {plans.length === 0 && (
              <p className="text-gray-500">
                Add a field to generate your first rotation plan.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
