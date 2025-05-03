Tile 3: Narrative Arc
Goal: Build a scrollable story that unfolds CuriousLabs’ mission.
Deliverable: Fully implemented sections with narrative flow and animations.
Time: 2 days (16 hours)
Subtasks:
About Section (4h)
Content: “A hybrid studio, lab, and brand.”
Animation: Fade-in on scroll.
Cursor Task: Build About component with content and animation.
Services Section (4h)
Content: Highlight tools like CodeLab and OpsPipe (3-4 cards).
Animation: Staggered card reveal.
Cursor Task: Create Services component with card grid.
Code Starter:
jsx
// components/Services.jsx
import { motion } from "framer-motion";

const services = [
  { title: "CodeLab", desc: "AI-powered coding." },
  { title: "OpsPipe", desc: "Streamlined workflows." },
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-800">
      <h2 className="text-4xl font-bold text-center text-white">Our Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-6 bg-gray-900 rounded-lg"
          >
            <h3 className="text-2xl font-bold text-white">{service.title}</h3>
            <p className="mt-2 text-gray-300">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
Projects Section (4h)
Content: Showcase flagship projects with images.
Animation: Image zoom-in on scroll.
Cursor Task: Build Projects component with image grid.
CTA Section (4h)
Content: “Join us or explore more” with buttons.
Animation: Pulse effect on buttons.
Cursor Task: Create CTA component.


Perfect. Here's a clean, professional **Cursor task block** with everything needed to execute **TILE 3.3 – MetricsAndLogsSection**, using Claude's original plan and verified atomic build strategy:

---

### 🧩 CURSOR TASK – TILE 3.3: `MetricsAndLogsSection` (Atomic Build)

**🎯 GOAL:**
Build the `MetricsAndLogsSection.jsx` component as a self-contained, animated section using **Framer Motion** and **TailwindCSS only**.

**📁 Destination:**
Create file:

```
src/components/home/MetricsAndLogsSection.jsx
```

**🧪 Test Location:**
Append this new component to the local dev test page at:

```
src/pages/dev.jsx
```

---

### 📦 COMPONENT REQUIREMENTS

**1. Metrics (Left Column):**

* Display animated numbers using **Framer Motion**.
* Labels: `Bugs Resolved`, `Tests Written`, `Deployments`, `AI Commits`
* Animate numbers when scrolled into view (1-time trigger).

**2. Logs Feed (Right Column):**

* Show a list of 5–6 log entries (e.g., "Fixed parser bug", "Pushed v2.1.3", etc.)
* Use Framer fade-in with stagger.
* Logs should animate upward (scroll illusion).

**3. Layout:**

* Use a **2-column grid** (stack on mobile).
* Background: subtle gradient or blurred dark.
* Add a section title: “📊 CuriousLabs Activity Log”

---

### 📚 Reference

This exact section is described in:

```
Docs/planning/Site_v2/2.5/v4.2.2.md
```

Look for the section:

```
Tile 3: Narrative Arc → Metrics Section (4h)
```

---

### ⚙️ Tech Restrictions

* ✅ Framer Motion
* ✅ TailwindCSS
* ❌ No props, no imports from outside `/components/home`
* ❌ No useContext or layout wrappers

---

### ✅ Done When:

* You can see the metrics animate and logs appear at `http://localhost:5179/dev`
* The component is responsive, clean, and matches the atomic format of the rest
* Zero console errors or import warnings

---

Let me know if you want the next tile scaffolded after this (e.g. TestimonialsSection).


================================================================================================================

# TILE 3.3: MetricsAndLogsSection - Simulation & Implementation Plan

## 🔍 Mission Analysis

Based on the requirements from v4_tile3_v1.0, we need to create a MetricsAndLogsSection component displaying:
- Animated metrics (left column)
- Logs feed with staggered animation (right column)
- Responsive 2-column grid layout

## 📋 Implementation Plan

### Step 1: File Creation & Structure
1. Create `src/components/home/MetricsAndLogsSection.jsx`
2. Add component to development page (`src/pages/dev.jsx`)

### Step 2: Component Structure
```jsx
import { motion } from "framer-motion";

export default function MetricsAndLogsSection() {
  // Metrics data
  const metrics = [
    { label: "Bugs Resolved", value: 2483 },
    { label: "Tests Written", value: 15792 },
    { label: "Deployments", value: 347 },
    { label: "AI Commits", value: 8261 }
  ];

  // Logs data
  const logs = [
    { text: "Fixed parser bug in OpsPipe v2.1.3", time: "2m ago" },
    { text: "Deployed Guardian security patch", time: "17m ago" },
    { text: "Added 142 unit tests to CodeLab", time: "1h ago" },
    { text: "Optimized CI/CD pipeline - 32% faster", time: "3h ago" },
    { text: "Released DataForge v1.2 to production", time: "6h ago" },
    { text: "Patched Kubernetes cluster vulnerability", time: "12h ago" }
  ];

  // Animation variants
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
      {/* Section content */}
    </section>
  );
}
```

### Step 3: Component Layout Implementation
- Add section title and container
- Create 2-column grid using Tailwind (responsive)
- Implement metrics column with counter animations
- Implement logs column with staggered, upward animations

### Step 4: Animation Implementation
- Create counter animation for metrics using Framer Motion
- Create staggered animation for logs with upward motion
- Trigger all animations on scroll into view

### Step 5: Component Testing & Integration
- Add to development page
- Test responsive behavior
- Verify animations trigger correctly
- Confirm no console errors

## 💻 Code Execution Plan

Here's the detailed component implementation:

```jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function MetricsAndLogsSection() {
  // Metrics data
  const metrics = [
    { label: "Bugs Resolved", value: 2483, icon: "🐛" },
    { label: "Tests Written", value: 15792, icon: "✅" },
    { label: "Deployments", value: 347, icon: "🚀" },
    { label: "AI Commits", value: 8261, icon: "🤖" }
  ];

  // Logs data
  const logs = [
    { text: "Fixed parser bug in OpsPipe v2.1.3", time: "2m ago", type: "fix" },
    { text: "Deployed Guardian security patch", time: "17m ago", type: "deploy" },
    { text: "Added 142 unit tests to CodeLab", time: "1h ago", type: "test" },
    { text: "Optimized CI/CD pipeline - 32% faster", time: "3h ago", type: "optimize" },
    { text: "Released DataForge v1.2 to production", time: "6h ago", type: "release" },
    { text: "Patched Kubernetes cluster vulnerability", time: "12h ago", type: "security" }
  ];

  // Animation variants for metrics
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  // Animation variants for logs
  const logContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const logItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Animated counter component
  const AnimatedCounter = ({ value }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      // Simple counter animation
      let start = 0;
      const end = value;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // Update every 16ms (60fps)
      
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, [value]);
    
    return <span>{count.toLocaleString()}</span>;
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          📊 CuriousLabs Activity Log
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Metrics Column */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl text-purple-300 font-semibold">Real-time Metrics</h3>
            
            <div className="grid grid-cols-2 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-xl border border-gray-700/50"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{metric.icon}</span>
                    <h4 className="text-gray-300 font-medium">{metric.label}</h4>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    <AnimatedCounter value={metric.value} />
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Logs Column */}
          <motion.div
            className="space-y-6"
            variants={logContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl text-purple-300 font-semibold">Latest Activity</h3>
            
            <div className="space-y-3">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  variants={logItemVariants}
                  className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-lg border-l-4 border-purple-500"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-white">{log.text}</p>
                    <span className="text-xs text-gray-400 ml-2">{log.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

## 🚀 Integration Steps

1. Create the file with the implementation above
2. Update the dev page to include this component:

```jsx
// In src/pages/dev.jsx
import MetricsAndLogsSection from '@/components/home/MetricsAndLogsSection';

// Add to the JSX return
<MetricsAndLogsSection />
```

## ✅ Validation

The component will be considered complete when:
- All metrics animate with counters when scrolled into view
- Log entries appear with staggered animation
- Layout is responsive (2 columns on desktop, 1 column on mobile)
- No console errors appear
- Component fits the atomic component pattern established in TILE 2

Should we proceed with implementation of this plan?
