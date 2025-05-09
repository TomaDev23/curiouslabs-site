import React from 'react';

const metadata = {
  id: 'loading',
  scs: 'SCS-LOADING',
  type: 'utility',
  doc: 'contract_loading.md'
};

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
      <p className="text-xl">Loading...</p>
    </div>
  );
} 