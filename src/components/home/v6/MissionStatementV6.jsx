/**
 * @component MissionStatementV6
 * @description Eclipse-style mission statement with numbered points
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - MissionStatementV6 passes LEGIT protocol
 */

import React from 'react';

const MissionStatementV6 = () => {
  return (
    <div className="relative w-full" style={{ minHeight: '100vh', paddingTop: '15vh' }}>
      {/* Main content wrapper with proper spacing from top */}
      <div className="relative w-full h-full">
        {/* Right Section with Numbered Mission Points - Positioned in the middle section */}
        <div className="md:ml-[45%] md:mr-[5%] pr-4 md:pr-8 flex flex-col space-y-20 md:space-y-32 mt-[15vh]">
          {/* Point 01 */}
          <div className="grid grid-cols-12 items-center gap-4" data-animate="mission-point-01">
            <div className="col-span-7 col-start-1 pr-4">
              <div className="text-right">
                <h3 className="text-white text-xl md:text-2xl mb-2">Research & Analyze</h3>
                <p className="text-white/70 text-xs md:text-sm">
                  Understanding your vision and requirements is our first step. We dive deep to analyze the market, audience, and technical needs.
                </p>
              </div>
            </div>
            <div className="col-span-5 col-start-8 pl-4">
              <div className="text-white text-[80px] md:text-[120px] font-light opacity-90">01</div>
            </div>
          </div>
          
          {/* Point 02 */}
          <div className="grid grid-cols-12 items-center gap-4" data-animate="mission-point-02">
            <div className="col-span-5 col-start-1 pr-4">
              <div className="text-white text-[80px] md:text-[120px] font-light opacity-90 text-right">02</div>
            </div>
            <div className="col-span-7 col-start-6 pl-4">
              <div>
                <h3 className="text-white text-xl md:text-2xl mb-2">Concept & Sketch</h3>
                <p className="text-white/70 text-xs md:text-sm">
                  Translating ideas into visual concepts and architectural plans. We create the blueprint for your digital solution.
                </p>
              </div>
            </div>
          </div>
          
          {/* Point 03 */}
          <div className="grid grid-cols-12 items-center gap-4" data-animate="mission-point-03">
            <div className="col-span-7 col-start-1 pr-4">
              <div className="text-right">
                <h3 className="text-white text-xl md:text-2xl mb-2">Design & Build</h3>
                <p className="text-white/70 text-xs md:text-sm">
                  From concept to code, we craft every aspect with precision. Our development process ensures quality and performance.
                </p>
              </div>
            </div>
            <div className="col-span-5 col-start-8 pl-4">
              <div className="text-white text-[80px] md:text-[120px] font-light opacity-90">03</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Eclipse/Circle with Mission Statement - Bottom Left */}
      <div className="absolute bottom-16 left-8 md:left-24" data-animate="mission-eclipse">
        {/* Bottom left corner nebula */}
        <div 
          className="absolute w-[600px] h-[400px] md:w-[700px] md:h-[460px]"
          style={{
            background: 'radial-gradient(circle at 0% 100%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            filter: 'blur(30px)',
            transform: 'translate(-30%, 30%)'
          }}
        ></div>

        {/* Cosmic Shimmering Gradient Layer (was Under-sphere nebula) */}
        <div 
          className="absolute animate-pulse" // Added animate-pulse
          style={{
            width: '80vw', // Made larger
            height: '60vh',
            background: 'radial-gradient(ellipse at 50% 60%, rgba(100, 0, 150, 0.15) 0%, rgba(50, 0, 100, 0.1) 30%, rgba(255, 100, 0, 0.05) 60%, transparent 80%)', // Cosmic gradient
            filter: 'blur(60px)', // Increased blur
            transform: 'translate(-50%, -40%)', // Repositioned
            zIndex: 0
          }}
        ></div>

        {/* Combined and Reshaped Engulfing Nebula (Whitish + Subtle Purple) */}
        <div 
          className="absolute" // Removed centering classes, positioning via style
          style={{
            width: '150vw', 
            height: '150vh',
            bottom: '-25vh', // Positioned to extend from bottom-left
            left: '-25vw',
            background: `
              radial-gradient(ellipse at 15% 85%, rgba(220,220,240,0.25) 0%, rgba(200,200,220,0.1) 30%, transparent 65%),
              radial-gradient(ellipse at center, rgba(160, 32, 240, 0.06) 0%, transparent 70%)
            `,
            filter: 'blur(90px)',
          }}
        ></div>

        {/* Translucent Padding Nebula 1 (was Keep existing nebula) */}
        <div 
          className="absolute"
          style={{
            width: '70vw', // Made larger
            height: '90vh',
            background: 'radial-gradient(ellipse at 30% 70%, rgba(200,200,220,0.1) 0%, rgba(200,200,220,0.05) 40%, transparent 70%)', // Softer, translucent
            filter: 'blur(50px)', // Increased blur
            transform: 'translate(-40%, -60%) rotate(-25deg)', // Repositioned
            zIndex: 0
          }}
        ></div>

        {/* Keep existing nebula */}
        <div 
          className="absolute w-[400px] h-[1000px] md:w-[460px] md:h-[1200px]"
          style={{
            background: 'radial-gradient(circle at 0% 70%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 15%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            filter: 'blur(30px)',
            transform: 'translate(-30%, -70%) rotate(-15deg)'
          }}
        ></div>

        {/* Keep existing nebula */}
        <div 
          className="absolute w-[400px] h-[400px] md:w-[460px] md:h-[460px]"
          style={{
            background: 'radial-gradient(circle at 20% 70%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 15%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            filter: 'blur(30px)',
            transform: 'translate(-20%, 10%)'
          }}
        ></div>

        {/* Outer glow layers - multiple layers for realistic effect */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl bg-white"
          style={{ 
            width: '180%', 
            height: '180%', 
            filter: 'blur(80px)'
          }}
        ></div>
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-2xl bg-white"
          style={{ 
            width: '170%', 
            height: '170%', 
            filter: 'blur(60px)'
          }}
        ></div>
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-xl bg-white"
          style={{ 
            width: '160%', 
            height: '160%', 
            filter: 'blur(40px)'
          }}
        ></div>

        {/* Main black circle */}
        <div 
          className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px] rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20,20,20,1) 40%, rgba(20,20,20,0.5) 70%, rgba(0,0,0,0) 100%)'
          }}
        >
          {/* Fuzzy Crescent Shadow Layer for depth */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 80% 20%, rgba(0,0,0,0.35) 0%, transparent 50%)',
              filter: 'blur(20px)',
              pointerEvents: 'none'
            }}
          ></div>
          {/* Text content container */}
          <div className="relative z-20 text-center max-w-[320px]">
            <p className="uppercase tracking-widest text-sm text-white/50">
              <span className="inline-block mr-1">↗</span> our mission
            </p>
            <h2 className="text-3xl font-light mt-2 mb-4">Human-first AI</h2>
            <p className="text-sm text-white/70 leading-relaxed">
              We are building responsible, ethical systems for a future where technology aligns with human well-being.
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      {/* Metadata text - right side of the circle */}
      <div className="absolute bottom-[45%] left-[34rem] text-white/50 text-xs font-mono">
        limbo<br />
        {'}'}
        <div className="mt-6">
          this is not<br />
          a hobby<br />
          it is a mission;
        </div>
        <div className="mt-6">
          {'})'}
          <br />
          humanly digital
          <br />
          ------------
        </div>
      </div>
      
      {/* New era badge */}
      <div className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-white/90 flex items-center" data-animate="mission-badge">
        <div className="mr-3 flex space-x-1">
          <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-xs">⊕</span>
          <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-xs">⊕</span>
          <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-xs">⊖</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-light">new era</span>
          <span className="text-xs ml-8">01</span>
        </div>
      </div>
      
      {/* Heart icon */}
      <div className="absolute top-8 left-8 z-20">
        <span className="text-white/70 text-xl">♡</span>
      </div>
      
      {/* Decorative slashes */}
      <div className="absolute top-8 right-[30%] z-20 text-white/50 font-light">
        //<br/>//<br/>//
      </div>
    </div>
  );
};

export default MissionStatementV6; 