import { motion } from "framer-motion";

/**
 * AboutSection component with three feature cards
 * Self-contained with no external dependencies
 */
export default function AboutSection() {
  // Feature card data
  const features = [
    {
      icon: "🧪",
      title: "Elite Engineering",
      description: "Showcase elite-level AI engineering without the fluff or marketing hype."
    },
    {
      icon: "🛠️",
      title: "Tool Ecosystem",
      description: "Sell and showcase our tools—CodeLab, OpsPipe, MoonSignal, Guardian, and Curious."
    },
    {
      icon: "🎭",
      title: "System Intelligence",
      description: "Reflect aesthetic taste and system-level intelligence in everything we build."
    }
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-black to-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-gray-900/70 backdrop-blur-sm z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            CuriousLabs is a Studio
          </h2>
          
          <p className="text-lg text-gray-300 mb-12">
            Building intelligent solutions for tomorrow's challenges—where code meets imagination.
            We are a hybrid of a studio, a product lab, and a tech brand with tools, services, and actual IP.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.2)" }}
              >
                <div className="text-purple-400 text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 