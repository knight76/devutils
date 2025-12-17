import React from 'react';

export function ResultBox({ children, mono = true, className = '' }) {
  return (
    <div className={`bg-gray-50 rounded-xl p-4 ${mono ? 'font-mono text-sm' : ''} max-h-64 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
}

export function ErrorBox({ children }) {
  if (!children) return null;

  return (
    <div className="mt-3 bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700 text-sm">
      {children}
    </div>
  );
}

export function SuccessBox({ label, children, mono = false }) {
  return (
    <div className="bg-indigo-50 rounded-xl p-4">
      {label && <div className="text-sm text-gray-600 mb-1">{label}</div>}
      <div className={`text-xl font-semibold text-indigo-700 ${mono ? 'font-mono' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export function CopyButton({ text, message = '복사되었습니다!' }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert(message);
    } catch (e) {
      alert('복사 실패');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full mt-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors"
    >
      클립보드에 복사
    </button>
  );
}
