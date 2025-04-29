import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// ✅ Use path alias or direct directory import
import Home from './pages'; // This resolves to index.jsx safely

// ✅ Valid page imports
import ProductsPortal from './pages/products';
import Aegis from './pages/products/aegis';
import OpsPipe from './pages/products/opspipe';
import CodeLab from './pages/codelab';

import Blog from './pages/blog';
import About from './pages/about';
import Contact from './pages/contact';
import Documentation from './pages/docs';
import NotFound from './pages/404';

// 🧪 Temporary stubs
const MoonSignal = () => <div>MoonSignal Page</div>;
const Curious = () => <div>Curious Page</div>;
const Guardian = () => <div>Guardian Page</div>;

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPortal />} />
        <Route path="/products/aegis" element={<Aegis />} />
        <Route path="/products/opspipe" element={<OpsPipe />} />
        <Route path="/products/moonsignal" element={<MoonSignal />} />
        <Route path="/products/curious" element={<Curious />} />
        <Route path="/products/guardian" element={<Guardian />} />
        <Route path="/codelab" element={<CodeLab />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/docs/*" element={<Documentation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
