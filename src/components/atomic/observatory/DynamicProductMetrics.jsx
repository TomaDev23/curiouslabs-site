/**
 * @file DynamicProductMetrics.jsx
 * @description Dynamic metrics panel for Observatory Card System V2
 * @version 2.0.0
 * @author CuriousLabs
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const DynamicProductMetrics = React.memo(({ activeProduct }) => {
  const metrics = useMemo(() => {
    // Dynamic metrics based on product (replace with real data source if available)
    const baseMetrics = {
      'AEGIS Command': [
        { label: 'System Uptime', value: '99.9%', trend: '+0.1%' },
        { label: 'Response Time', value: '0.8ms', trend: '-0.2ms' },
        { label: 'Active Agents', value: '247', trend: '+12' },
      ],
      'OpsPipe': [
        { label: 'Automation Rate', value: '94%', trend: '+12%' },
        { label: 'Processing Speed', value: '2.3s', trend: '-0.4s' },
        { label: 'Accuracy', value: '99.7%', trend: '+0.3%' },
      ],
      'Curious': [
        { label: 'Engagement Rate', value: '87%', trend: '+8%' },
        { label: 'Response Time', value: '1.8s', trend: '-0.2s' },
        { label: 'User Retention', value: '92%', trend: '+5%' },
      ],
      'Guardian': [
        { label: 'Safety Score', value: '98%', trend: '+3%' },
        { label: 'Engagement Time', value: '15min', trend: '+2min' },
        { label: 'Content Filters', value: '99.9%', trend: '+0.1%' },
      ],
      'MoonSignal': [
        { label: 'Signal Accuracy', value: '91%', trend: '+7%' },
        { label: 'Trade Success', value: '88%', trend: '+4%' },
        { label: 'Alert Speed', value: '0.9s', trend: '-0.1s' },
      ],
    };
    return baseMetrics[activeProduct.title] || baseMetrics['AEGIS Command'];
  }, [activeProduct.title]);

  return (
    <motion.div 
      className="backdrop-blur-sm bg-slate-900/30 rounded-xl border border-white/10 p-4 h-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      key={activeProduct.id} // Force re-render on product change
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: activeProduct.accentColor }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-sm font-mono text-white/60 uppercase tracking-wider">
            {activeProduct.title} Metrics
          </span>
        </div>
        <div className="flex space-x-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={`metric-${activeProduct.id}-${index}`}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <motion.div 
                className="text-lg font-bold" 
                style={{ color: activeProduct.accentColor }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                {metric.value}
              </motion.div>
              <div className="text-xs text-white/60">{metric.label}</div>
              <motion.div 
                className="text-xs text-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              >
                {metric.trend}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

DynamicProductMetrics.displayName = 'DynamicProductMetrics';

export default DynamicProductMetrics; 