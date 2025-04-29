const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Set up readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Template for product page
const getProductTemplate = (name, slug, description, features) => `import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { IMAGES } from '../../utils/assets';

export default function ${name}() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#272750] to-[#1A1A2E]">
      <NavBar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">${name}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              ${description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/codelab" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-3 px-6 rounded-md transition-all duration-300">
                Visit CodeLab
              </Link>
              <Link to="/docs" className="bg-transparent border border-purple-500 text-white hover:bg-purple-500/10 font-medium py-3 px-6 rounded-md transition-all duration-300">
                Documentation
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md h-80 bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 rounded-xl border border-purple-500/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-400">Product Preview Image</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-br from-[#2A2A45]/30 to-[#1A1A30]/30 rounded-xl border border-purple-500/10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${features.map((feature, index) => `
            <div className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-6 rounded-xl border border-purple-500/10">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl text-purple-400">${index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">${feature.title}</h3>
              <p className="text-gray-400">${feature.description}</p>
            </div>`).join('')}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="max-w-5xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">${name}</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join the growing community of developers leveraging our tools for their projects.
          </p>
          <Link to="/codelab" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 inline-block">
            Get Started Today
          </Link>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}`;

// Function to capitalize first letter
const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to create slug from product name
const createSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '');
};

// Main function to gather inputs and create file
const createProductPage = () => {
  console.log('=== Product Page Generator ===');
  
  rl.question('Enter product name: ', (name) => {
    const productName = capitalize(name.trim());
    const productSlug = createSlug(name);
    
    rl.question('Enter product description: ', (description) => {
      console.log('Now let\'s add some features. Enter up to 6 features.');
      
      const features = [];
      const getFeature = (index) => {
        if (index > 6) {
          generateFile(productName, productSlug, description, features);
          return;
        }
        
        rl.question(`Feature ${index} title: `, (title) => {
          if (!title.trim()) {
            generateFile(productName, productSlug, description, features);
            return;
          }
          
          rl.question(`Feature ${index} description: `, (desc) => {
            features.push({
              title: title.trim(),
              description: desc.trim()
            });
            
            getFeature(index + 1);
          });
        });
      };
      
      getFeature(1);
    });
  });
};

// Function to generate and write the file
const generateFile = (name, slug, description, features) => {
  const dirPath = path.join(__dirname, '..', 'src', 'pages', 'products');
  const filePath = path.join(dirPath, `${slug}.jsx`);
  
  // Ensure the directory exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Generate the content
  const content = getProductTemplate(name, slug, description, features);
  
  // Write the file
  fs.writeFileSync(filePath, content);
  
  console.log(`\nProduct page created at: ${filePath}`);
  console.log(`\nTo include this product in the routes, add this to your App.jsx:`);
  console.log(`import ${name} from './pages/products/${slug}.jsx';`);
  console.log(`<Route path="/products/${slug}" element={<${name} />} />`);
  
  rl.close();
};

// Run the script
createProductPage(); 