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
      <header className="bg-green-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="text-green-600" size={32} />
            <div>
              <h1 className="text-xl font-bold text-green-700">Kaustubh Agri Organics</h1>
              <p className="text-sm text-gray-600">Cultivating Sustainable Futures</p>
            </div>
          </div>
          {/* You could add a small logo here if you have one */}
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
              <p className="text-gray-500 mb-4">
                Start planning your sustainable crop rotations with **Kaustubh Agri Organics**. Add a field to generate your first plan.
              </p>
            )}
            <div className="bg-green-50 rounded-md p-4 mb-4"> {/* Added margin-bottom */}
              <p className="text-green-700 font-semibold">
                🌱 Stay Updated!
              </p>
              <p className="text-gray-700 text-sm">
                Join our WhatsApp channel for daily organic farming tips: <a href="https://whatsapp.com/channel/0029VbAMsWv7DAWwU1wdRi17" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Join Now</a>
              </p>
            </div>
            <div className="bg-blue-50 rounded-md p-4"> {/* Different background color */}
              <p className="text-blue-700 font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 inline-block mr-1"> {/* Added a small icon */}
                  <path fillRule="evenodd" d="M2.25 12c0-5.154 4.146-9.3 9.3-9.3 5.154 0 9.3 4.146 9.3 9.3 0 5.154-4.146 9.3-9.3 9.3-5.154 0-9.3-4.146-9.3-9.3ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75V15Z" clipRule="evenodd" />
                </svg>
                Free Disease Detection!
              </p>
              <p className="text-gray-700 text-sm">
                Get FREE Disease Detection for your crops: <a href="https://agri-raksha.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Check it Out</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;