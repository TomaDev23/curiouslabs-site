export default function Footer() {
  return (
    <footer className="py-12 bg-gradient-to-b from-transparent to-[#28293D]/90 border-t border-[#3D3A63]/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} CuriousLabs. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 