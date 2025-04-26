const logos = [
  { name: "Company 1", alt: "Company 1 logo" },
  { name: "Company 2", alt: "Company 2 logo" },
  { name: "Company 3", alt: "Company 3 logo" },
  { name: "Company 4", alt: "Company 4 logo" },
  { name: "Company 5", alt: "Company 5 logo" },
  { name: "Company 6", alt: "Company 6 logo" },
];

export default function LogoStrip() {
  return (
    <section className="py-12 bg-curious-dark-800">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-gray-400 mb-8">
          Trusted by innovative teams
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="h-12 flex items-center justify-center transform hover:scale-110 transition-transform"
            >
              <div className="bg-curious-dark-700 text-gray-400 px-4 py-2 rounded-md">
                {logo.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
