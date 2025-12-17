import React from 'react';

export function TextInput({ value, onChange, placeholder, className = '', type = 'text', mono = false }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg ${mono ? 'font-mono' : ''} ${className}`}
    />
  );
}

export function TextArea({ value, onChange, placeholder, className = '', rows = 8, mono = false }) {
  const heightClass = rows === 8 ? 'h-32' : rows === 16 ? 'h-64' : `h-${rows * 4}`;

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full ${heightClass} p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none ${mono ? 'font-mono text-sm' : ''} ${className}`}
    />
  );
}

export function DateInput({ value, onChange, label }) {
  return (
    <div>
      {label && <label className="block text-sm text-gray-600 mb-1">{label}</label>}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
      />
    </div>
  );
}

export function TimeInput({ value, onChange, label }) {
  return (
    <div>
      {label && <label className="block text-sm text-gray-600 mb-1">{label}</label>}
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
      />
    </div>
  );
}
