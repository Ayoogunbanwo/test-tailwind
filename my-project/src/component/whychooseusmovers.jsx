import React from 'react';
import { CheckCircle, Award, Zap, Users, Clock, Shield } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
    <div className="flex items-center mb-6">
      <Icon className="w-10 h-10 text-teal-600 mr-4" />
      <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const WhyChooseUsmovers = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Professional Excellence",
      description: "Our team of certified professionals brings years of expertise to every project, ensuring highest quality standards and exceptional results."
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Award-winning services trusted by leading companies worldwide. Our track record speaks for itself with numerous accolades and satisfied clients."
    },
    {
      icon: Zap,
      title: "Swift Execution",
      description: "Quick turnaround times without compromising quality. We understand the value of time and deliver results when you need them."
    },
    {
      icon: Users,
      title: "Customer-Centric Approach",
      description: "Your success is our priority. We work closely with you to understand your needs and deliver tailored solutions that exceed expectations."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance ensures you're never left waiting. Our dedicated support team is always ready to help you succeed."
    },
    {
      icon: Shield,
      title: "Guaranteed Results",
      description: "We stand behind our work with solid guarantees. Your satisfaction is assured with our commitment to excellence and proven methodology."
    }
  ];

  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how our expertise and dedication can transform your business with innovative solutions and unparalleled service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsmovers;