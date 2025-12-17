import React from 'react';

export function PrimaryButton({ children, onClick, className = '', fullWidth = true }) {
  return (
    <button
      onClick={onClick}
      className={`${fullWidth ? 'w-full' : ''} bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, className = '', fullWidth = true }) {
  return (
    <button
      onClick={onClick}
      className={`${fullWidth ? 'w-full' : ''} bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function GrayButton({ children, onClick, className = '', fullWidth = true }) {
  return (
    <button
      onClick={onClick}
      className={`${fullWidth ? 'w-full' : ''} bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function SmallButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function TabButton({ active, onClick, children, mobile = false }) {
  const baseClass = mobile
    ? `w-full text-left px-4 py-3 rounded-lg font-medium transition-colors`
    : `px-2 py-2 rounded-lg font-medium transition-colors text-xs whitespace-nowrap`;

  const activeClass = active
    ? 'bg-indigo-600 text-white'
    : 'text-gray-600 hover:bg-gray-100';

  return (
    <button onClick={onClick} className={`${baseClass} ${activeClass}`}>
      {children}
    </button>
  );
}

export function ModeButton({ active, onClick, children, className = '' }) {
  const activeClass = active
    ? 'bg-indigo-600 text-white'
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300';

  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${activeClass} ${className}`}
    >
      {children}
    </button>
  );
}
