import React, { Suspense } from 'react';
import { AtomicPageFrame } from '../components/layouts/AtomicPageFrame';

const metadata = {
  id: 'home_v5_atomic_page',
  scs: 'SCS-HOME-V5',
  type: 'page',
  doc: 'contract_home_v5_atomic.md'
};

export default function HomeV5AtomicPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
        <p className="text-xl">Loading...</p>
      </div>
    }>
      <AtomicPageFrame />
    </Suspense>
  );
} 