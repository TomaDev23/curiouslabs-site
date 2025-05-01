import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer_legacy';
import ScrollToTop from '../../components/ScrollToTop';
import './opspipe.css'; // For custom animations

export default function OpsPipe() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#16213E] to-[#0F172A] text-white">
      <Helmet>
        <title>OpsPipe - Operational Workflow | CuriousLabs</title>
        <meta name="description" content="Streamline your operational workflow with real-time monitoring and intelligent automation. Built with flexibility for enterprise-grade efficiency." />
        <meta property="og:title" content="OpsPipe - Operational Workflow | CuriousLabs" />
        <meta property="og:description" content="Streamline your operational workflow with real-time monitoring and intelligent automation. Built with flexibility for enterprise-grade efficiency." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/opspipe" />
      </Helmet>
      
      <NavBar />
      
      <main className="container mx-auto px-4 py-20 md:py-24 max-w-6xl">
        {/* Hero Section with anchor ID */}
        <section id="overview" className="mb-24 text-center pt-8 md:pt-12">
          <div className="inline-block mb-4 p-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="bg-[#1A1A2E] rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 22v-4m3 4v-6m3 6v-8" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">OpsPipe</h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Streamline your operational workflow with real-time monitoring and intelligent automation
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/codelab" 
              className="btn px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 transition duration-300"
            >
              Visit CodeLab
            </Link>
            <a 
              href="#features" 
              className="btn px-8 py-3 rounded-lg bg-transparent border border-blue-500 text-blue-400 font-medium hover:bg-blue-500/10 transition duration-300"
            >
              Explore Features
            </a>
          </div>
        </section>
        
        {/* Product Description */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Chaos into Order</h2>
              <p className="text-gray-300 mb-6">
                OpsPipe is the enterprise-grade solution for automating, monitoring, and optimizing your operational processes. 
                Built with flexibility in mind, OpsPipe integrates seamlessly with your existing infrastructure while providing 
                the tools you need to scale efficiently.
              </p>
              <ul className="space-y-3">
                {['Real-time monitoring dashboard', 'Intelligent alert system', 'Custom automation workflows', 'Comprehensive API'].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden shadow-blue-900/30 shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-blue-800/50 to-cyan-700/30 rounded-xl p-1">
                <div className="w-full h-full bg-[#0F172A] rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 22v-4m3 4v-6m3 6v-8" />
                      </svg>
                    </div>
                    <p className="text-gray-300">OpsPipe Dashboard Interface</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section with anchor ID */}
        <section id="features" className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-Time Monitoring',
                description: 'Live state tracking with trace logs, session keys, and output diagnostics for every task in the queue. Visualize exact FSM positions across your fleet.',
                icon: '🚨'
              },
              {
                title: 'Intelligent Automation',
                description: 'Declarative workflows with branching logic and retry patterns. Configure fallback chains, escalation routes, and validation hooks via simple config files.',
                icon: '🔁'
              },
              {
                title: 'Multi-Source Ingest',
                description: 'Process jobs via CLI, Telegram, webhooks or file watchers. Each input source writes to shared state registry with cryptographic session integrity.',
                icon: '🧪'
              },
              {
                title: 'Enterprise Error Handling',
                description: 'Sophisticated recovery framework with isolation guarantees. Failed operations create trace artifacts and auto-generate incident tickets with full context.',
                icon: '🛠️'
              },
              {
                title: 'Structured Output Router',
                description: 'Route validated operation results to multiple destinations — DB, API endpoints, file exports, or messaging systems. Each route enforces schema validation.',
                icon: '📦'
              },
              {
                title: 'Defense-Grade Telemetry',
                description: 'Every operation generates immutable trace logs with timing metrics, state transitions, and cryptographic integrity hashes. Full audit compliance built-in.',
                icon: '🔐'
              },
            ].map((feature, index) => (
              <div key={index} className="bg-blue-900/10 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors duration-300 h-full">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Pipeline Flow Section - NEW */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How OpsPipe Executes</h2>
          
          <div className="bg-gradient-to-br from-[#1E293B]/80 to-[#0F172A]/80 p-6 md:p-8 rounded-xl border border-blue-500/20">
            <div className="relative overflow-x-auto py-4">
              <div className="flex flex-col items-center text-center">
                <pre className="text-xs md:text-sm lg:text-base font-mono text-blue-300 whitespace-pre overflow-x-auto w-full">
{`                           ┌────────────────────────────┐
                           │      OpsPipe System        │
                           │   (AI Ops Automation OS)   │
                           └────────────┬───────────────┘
                                        │
             ┌──────────────────────────┼────────────────────────────┐
             │                          │                            │
   ┌─────────▼─────────┐      ┌─────────▼─────────┐      ┌──────────▼─────────┐
   │    Input Layer    │      │    State Machine   │      │     Interfaces     │
   │   (Multi-Source)  │      │     Coordinator    │      │   (Users+Clients)  │
   └────────┬──────────┘      └─────────┬──────────┘      └──────────┬─────────┘
            │                           │                            │
     ┌──────┴──────┐     ┌──────────────┼──────────┐      ┌──────────┼─────────┐
     │ TelegramBot │◄────┤ Command Center Registry  │      │    Client Layer    │
     └──────┬──────┘     └──────────────┼──────────┘      └──────────┬─────────┘
            │                           │                            │
     ┌──────┴──────┐     ┌──────────────┼──────────┐     ┌───────────┼─────────┐
     │ File Upload │◄────┤     Decision Engine     │     │      API Gateway    │
     └──────┬──────┘     └──────────────┼──────────┘     └───────────┬─────────┘
            │                           │                            │
     ┌──────┴──────┐     ┌──────────────┼──────────┐     ┌───────────┼─────────┐
     │ POS Adapter │◄────┤    Recovery Manager      │     │     Web/Mobile      │
     └──────┬──────┘     └──────────────┼──────────┘     └───────────┬─────────┘
            │                           │                            │
     ┌──────┴──────┐                    │                            │
     │ Other Input │                    │                            │
     └──────┬──────┘                    │                            │
            │                           │                            │
            └───────────────────────────┼────────────────────────────┘
                                        │
                   ┌───────────────────┐│┌───────────────────┐
                   │ AI ORCHESTRATION  ├┘└┤ PROCESSOR CHAIN  │
                   │ ┌───────────────┐ │  │ ┌─────────────┐  │
                   │ │ Agent Loop    │ │  │ │ Tokenizer   │  │
                   │ └───────┬───────┘ │  │ └─────┬───────┘  │
                   │         │         │  │       │          │
                   │ ┌───────┴───────┐ │  │ ┌─────┴───────┐  │
                   │ │  FSM + Trace  │ │  │ │ State Memory│  │
                   │ └───────┬───────┘ │  │ └─────┬───────┘  │
                   │         │         │  │       │          │
                   │ ┌───────┴───────┐ │  │ ┌─────┴───────┐  │
                   │ │Recovery System│ │  │ │  Validator  │  │
                   │ └───────────────┘ │  │ └─────────────┘  │
                   └───────────────────┘  └───────────────────┘
                                │
                    ┌───────────┴────────────┐
                    │  Output & Knowledge    │
                    │         Zone           │
                    └───────────┬────────────┘
                                │
            ┌───────────────────┼───────────────────┐
            │                   │                   │
    ┌───────┴────────┐  ┌───────┴────────┐  ┌───────┴────────┐
    │  Data Exports  │  │ Knowledge Base │  │  Human Layer   │
    │  /logs/ /docs/ │  │ /cards/ /kb/   │  │  /interfaces/  │
    └───────┬────────┘  └───────┬────────┘  └───────┬────────┘
            │                   │                   │
            │      ┌────────────┴───────────┐      │
            └──────┤ Interface Distribution ├──────┘
                   └────────────┬───────────┘
                                │
            ┌───────┬───────────┼───────────┬───────┐
            │       │           │           │       │
    ┌───────┴─────┐ │   ┌───────┴─────┐   ┌─┴───────┴─────┐
    │  Dashboard  │ │   │   Web App   │   │  Mobile App   │
    │(OpsCockpit) │ │   │   (Admin)   │   │  (OpsField)   │
    └─────────────┘ │   └─────────────┘   └───────────────┘
                    │
              ┌─────┴─────┐
              │ Telegram  │
              │(StaffBot) │
              └───────────┘`}
                </pre>
              </div>
            </div>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/10">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Input Layer</h3>
                <p className="text-sm text-gray-400">Multiple ingestion points capture data from CLI, bots, file watchers or API calls into a unified processing queue.</p>
              </div>
              
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/10">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">AI Orchestration</h3>
                <p className="text-sm text-gray-400">Decision engine plots optimal path through state machine based on input parameters and runtime conditions.</p>
              </div>
              
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/10">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">State Management</h3>
                <p className="text-sm text-gray-400">Transitions between steps are logged, validated and recoverable. Every state emits telemetry for analysis.</p>
              </div>
              
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/10">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Knowledge Registry</h3>
                <p className="text-sm text-gray-400">Centralized document store with metrics, logs, and trace data organized for compliance and performance analysis.</p>
              </div>
              
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/10">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Output Router</h3>
                <p className="text-sm text-gray-400">Channel-aware distribution system pipes results to their destinations with format transformation as needed.</p>
              </div>
              
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/10">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Interface Layer</h3>
                <p className="text-sm text-gray-400">Multiple frontends for human interaction, from admin dashboards to field worker mobile apps and chat interfaces.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Use Cases Section - NEW */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Use Cases</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Ghost Kitchen Operations",
                description: "Streamline receipt processing, inventory management, and order fulfillment in ghost kitchens. OpsPipe ingests supplier invoices, collates inventory data, and synchronizes with delivery platforms—all in one audit-ready system.\n\nCompletely transforms F&B back-office operations with minimal staff overhead.",
                icon: "🧾"
              },
              {
                title: "Event Photo Management",
                description: "Automate guest photo collection and curation for weddings and corporate events. OpsPipe filters submissions by quality, applies moderation rules, and distributes approved images to real-time displays, galleries and participant feeds.\n\nNo more manual photo sorting or lost memories.",
                icon: "📸"
              },
              {
                title: "Financial Batch Processing",
                description: "Simplify bookkeeping workflows with intelligent receipt and invoice processing. OpsPipe parses financial documents, validates data against accounting rules, and syncs directly with Xero, QuickBooks and other platforms.\n\nReduces accounting overhead by 60% with error-validation built in.",
                icon: "💹"
              },
              {
                title: "Telegram OpsBot",
                description: "Deploy custom Telegram bots for shift management, reporting, and alerts. Field staff can submit reports, check schedules, and receive notifications directly in chat—while managers get real-time analytics and compliance data.\n\nConnects remote teams with mission control effortlessly.",
                icon: "💬"
              },
              {
                title: "Document Processing Pipeline",
                description: "Transform document processing for SMEs and legal firms. OpsPipe creates extraction workflows that parse contracts, invoices, and forms—routing data to the right systems while maintaining document integrity.\n\nFully traceable document journeys with compliance built-in.",
                icon: "📄"
              },
              {
                title: "Healthcare Patient Intake",
                description: "Streamline patient registration and record management for clinics. OpsPipe processes intake forms, validates insurance information, and routes patient data securely through compliant channels with privacy controls.\n\nReduces administrative burden while enhancing data security.",
                icon: "🏥"
              }
            ].map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-[#1E293B]/60 to-[#0F172A]/60 p-5 sm:p-6 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition duration-300 min-h-[220px] flex flex-col">
                <div className="text-2xl mb-3">{useCase.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{useCase.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 whitespace-pre-line">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* LEGIT Protocol Section - NEW */}
        <section className="max-w-6xl mx-auto px-4 py-6 sm:py-10 mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-[#1E293B]/70 to-[#0F172A]/70 border border-blue-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_25px_rgba(59,130,246,0.15)]">
            {/* Blue glow effect */}
            <div className="absolute -inset-1 bg-blue-500/5 blur-md animate-pulse-glow"></div>
            <div className="absolute inset-0 bg-blue-400/5 blur-lg" style={{ animation: 'secondary-glow 5s infinite ease-in-out 0.5s' }}></div>
            
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4 sm:mb-6 text-center">
                Built LEGIT for Operational Accountability
              </h2>
              <p className="text-sm sm:text-base text-gray-300 text-center max-w-3xl mx-auto mb-6 sm:mb-8">
                OpsPipe follows the <span className="font-semibold text-blue-300">LEGIT</span> standard — our framework for secure, testable, and audit-compliant operational systems.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-sm sm:text-base text-white text-center mb-12">
                <div className="bg-black/20 p-4 rounded-lg border border-blue-500/10">
                  <div className="text-xl mb-2">📜</div>
                  <h3 className="font-semibold text-blue-300 mb-1">Logged</h3>
                  <p className="text-gray-400">Every operation and state change creates comprehensive audit logs.</p>
                </div>

                <div className="bg-black/20 p-4 rounded-lg border border-blue-500/10">
                  <div className="text-xl mb-2">🧪</div>
                  <h3 className="font-semibold text-blue-300 mb-1">Evaluated</h3>
                  <p className="text-gray-400">Workflows are tested against real-world operational scenarios.</p>
                </div>

                <div className="bg-black/20 p-4 rounded-lg border border-blue-500/10">
                  <div className="text-xl mb-2">🧠</div>
                  <h3 className="font-semibold text-blue-300 mb-1">Grounded</h3>
                  <p className="text-gray-400">All data processing follows strict schema validation rules.</p>
                </div>

                <div className="bg-black/20 p-4 rounded-lg border border-blue-500/10">
                  <div className="text-xl mb-2">🛡️</div>
                  <h3 className="font-semibold text-blue-300 mb-1">Isolated</h3>
                  <p className="text-gray-400">Each operation runs in its own context without shared state risk.</p>
                </div>

                <div className="bg-black/20 p-4 rounded-lg border border-blue-500/10">
                  <div className="text-xl mb-2">✅</div>
                  <h3 className="font-semibold text-blue-300 mb-1">Tested</h3>
                  <p className="text-gray-400">Continuous evaluation ensures consistent and reliable results.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section with anchor ID */}
        <section id="cta" className="mb-20">
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 rounded-2xl p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Own Your Operations</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Take control of your operational workflow with enterprise-grade automation and intelligence that scales with your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 transition duration-300"
              >
                Contact for Enterprise
              </Link>
              <Link
                to="/codelab"
                className="px-8 py-4 rounded-lg bg-transparent border border-blue-500 text-blue-400 font-medium hover:bg-blue-500/10 transition duration-300"
              >
                View CodeLab
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
} 