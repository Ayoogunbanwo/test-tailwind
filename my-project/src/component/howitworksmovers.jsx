import React from 'react';
import { UserPlus, Users, CheckCircle } from 'lucide-react';

const ProcessFlow = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your account in minutes and get started",
    },
    {
      icon: Users,
      title: "Order a Driver or Mover",
      description: "Browse our network of professional Drivers and movers and select the best match",
    },
    {
      icon: CheckCircle,
      title: "Enjoy the Service",
      description: "Sit back and relax while we handle your moves",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center text-center group"
              >
                {/* Icon with teal color */}
                <div className="mb-6 p-4 rounded-full bg-gray-100 text-teal-500 transform transition-transform group-hover:scale-110">
                  <Icon size={32} />
                </div>
                
                {/* Step content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;