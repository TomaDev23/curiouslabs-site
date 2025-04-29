import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Main Pages
import Home from './pages/index.jsx';
import ProductsPortal from './pages/products/index.jsx';
import Aegis from './pages/products/aegis.jsx';
import OpsPipe from './pages/products/opspipe.jsx';
import CodeLab from './pages/codelab.jsx';
import Blog from './pages/blog.jsx';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import Documentation from './pages/docs.jsx';
import NotFound from './pages/404.jsx';

// Placeholder Routes
const MoonSignal = () => <div className="p-8 text-white">MoonSignal Page</div>;
const Curious = () => <div className="p-8 text-white">Curious Page</div>;
const Guardian = () => <div className="p-8 text-white">Guardian Page</div>;

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
