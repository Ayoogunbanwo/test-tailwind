import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);


  const navigate = useNavigate();
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I sign up?",
      answer: "You can sign up by creating an account and following the registration process. It takes less than 5 minutes!",
    },
    {
      question: "Is there a sign-up fee?",
      answer: "No, signing up is completely free. You only earn when you complete jobs.",
    },
    {
      question: "How much can I earn?",
      answer: "Earnings depend on the number of jobs you complete. Most drivers earn between $2500 and $5000 per week.",
    },
    {
      question: "How do I get paid?",
      answer: "Payments are made directly to your bank account after each week. It’s simple and secure.",
    },
    {
      question: "What types of services are available?",
      answer: "Jobs include moving assistance (movers), Drivers, and more. You can choose the ones that suit you best.",
    },
    {
      question: "Do I need a vehicle?",
      answer: "Yes, you need a reliable vehicle as a driver to complete jobs. The type of vehicle depends on the job requirements.",
    },
    {
      question: "Can I work part-time?",
      answer: "Absolutely! You can work as much or as little as you want. It’s completely flexible.",
    },
    {
      question: "Is there a minimum age requirement?",
      answer: "Yes, you must be at least 18 years old to sign up.",
    },
    {
      question: "How do I find jobs?",
      answer: "Jobs are listed in the app. You can browse and accept jobs that fit your schedule and location.",
    },
    {
      question: "What if I have a problem during a job?",
      answer: "Our support team is available 24/7 to assist you with any issues.",
    },
    {
      question: "Can I cancel a job after accepting it?",
      answer: "Yes, but frequent cancellations may affect your rating. Please cancel only if necessary.",
    },
    {
      question: "How do I improve my driver rating?",
      answer: "Provide excellent service, arrive on time, and communicate clearly with customers.",
    },
    {
      question: "Are there any background checks?",
      answer: "Yes, we conduct background checks to ensure the safety of our customers and drivers.",
    },
    {
      question: "Can I use the web app in multiple cities?",
      answer: "Yes, you can use the web app wherever our services are available.",
    },
    {
      question: "How do I contact support?",
      answer: "You can contact support through the chat feature or email us at support@truckit.com.",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
          {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="mb-8 flex items-center text-teal-600 hover:text-teal-700 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>

       <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center bg-white p-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
              >
                <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
                <span className="text-teal-600">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="p-6 bg-gray-100 rounded-b-lg">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;