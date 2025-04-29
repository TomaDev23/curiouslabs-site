import React, { useEffect, useRef } from 'react';

export default function FeedbackBlock() {
  const testimonials = [
    {
      id: 1,
      quote: "CuriousLabs has transformed our development workflow. Their OpsPipe solution reduced our deployment time by 70%.",
      author: "Sarah Chen",
      position: "CTO, TechVision Inc.",
      image: "https://randomuser.me/api/portraits/women/42.jpg"
    },
    {
      id: 2,
      quote: "The Aegis engine powering their products is truly remarkable. We've seen unprecedented efficiency in our operations.",
      author: "Marcus Johnson",
      position: "VP Engineering, DataStream",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      quote: "Guardian has given us peace of mind knowing our children's online activities are protected with cutting-edge AI.",
      author: "Lisa Rodriguez",
      position: "Founder, FamilySafe",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  const testimonialsRef = useRef([]);

  // Set up intersection observer for scroll animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, options);

    testimonialsRef.current.forEach((testimonial) => {
      if (testimonial) {
        observer.observe(testimonial);
      }
    });

    return () => {
      testimonialsRef.current.forEach((testimonial) => {
        if (testimonial) {
          observer.unobserve(testimonial);
        }
      });
    };
  }, []);

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#28293d] to-[#1a1a2e]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Feedback</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            See what our clients have to say about our solutions and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (testimonialsRef.current[index] = el)}
              className={`bg-gradient-to-br from-[#2A2A45]/60 to-[#1A1A30]/60 p-6 rounded-xl border border-purple-500/20 shadow-xl opacity-0 translate-y-8 transition-all duration-700 ease-out delay-${index * 150}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-purple-500/50">
                  <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.author}</h4>
                  <p className="text-purple-300 text-sm">{testimonial.position}</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-0 left-0 text-purple-500/40 text-4xl">"</div>
                <p className="text-gray-300 italic pt-4 px-5">{testimonial.quote}</p>
                <div className="absolute bottom-0 right-0 text-purple-500/40 text-4xl">"</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 