import React from 'react';

export function Card({ children, className = '', gradient = false }) {
  const baseClass = gradient
    ? 'rounded-2xl shadow-lg p-6'
    : 'bg-white rounded-2xl shadow-lg p-6';

  return (
    <div className={`${baseClass} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, icon: Icon, actions, center = false }) {
  return (
    <div className={`${center ? 'text-center' : ''} ${subtitle ? 'mb-2' : 'mb-4'}`}>
      <div className={`flex items-center ${center ? 'justify-center' : 'justify-between'} gap-2`}>
        <div className={`flex items-center gap-2 ${center ? '' : ''}`}>
          {Icon && <Icon className="w-8 h-8 text-indigo-600" />}
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );
}

export function SectionTitle({ children, icon: Icon }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {Icon && <Icon className="w-5 h-5 text-indigo-600" />}
      <h2 className="text-xl font-semibold text-gray-800">{children}</h2>
    </div>
  );
}

export function Label({ children }) {
  return (
    <label className="block text-lg font-semibold text-gray-800 mb-3">
      {children}
    </label>
  );
}
