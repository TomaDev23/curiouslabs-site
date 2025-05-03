import React from 'react';
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechDrive",
      quote: "CuriousLabs transformed our development pipeline. Their AI-powered tools cut our bug-fixing time in half and improved code quality dramatically.",
      avatar: "🧑‍💼",
      color: "from-blue-600/20 to-purple-600/20"
    },
    {
      name: "Alex Chen",
      role: "Lead Developer, Quantum Solutions",
      quote: "OpsPipe has revolutionized how we handle deployments. It's like having an elite DevOps team working 24/7 without the overhead.",
      avatar: "👩‍💻",
      color: "from-purple-600/20 to-pink-600/20"
    },
    {
      name: "Michael Rodriguez",
      role: "Security Engineer, SecureNet",
      quote: "Guardian caught vulnerabilities that slipped past our senior security team. It's now an essential part of our code review process.",
      avatar: "🧑‍💻",
      color: "from-green-600/20 to-teal-600/20"
    },
    {
      name: "Priya Sharma",
      role: "Product Manager, Innovate Inc",
      quote: "The development speed with CodeLab is unmatched. We've reduced sprint times by 40% while maintaining higher quality standards.",
      avatar: "👩‍💼",
      color: "from-orange-600/20 to-amber-600/20"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="relative py-20 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
          
          <p className="text-lg text-gray-300">
            We're proud to help companies build better software and streamline their development workflows.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${testimonial.color} backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300`}
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.2)" }}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-2xl">
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-2 -left-2 text-purple-500/20 text-4xl">"</div>
                <p className="relative text-gray-300 italic z-10 pl-3">
                  {testimonial.quote}
                </p>
                <div className="absolute -bottom-6 -right-2 text-purple-500/20 text-4xl">"</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.button 
            className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View all case studies</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 