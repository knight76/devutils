import React, { useState } from 'react';
import { Clock, Menu, X } from 'lucide-react';
import { TabButton } from './shared';

const TABS = [
  { id: 'timestamp', label: 'Timestamp', mobileLabel: 'Timestamp Converter' },
  { id: 'base64', label: 'Base64', mobileLabel: 'Base64 Encoder/Decoder' },
  { id: 'json', label: 'JSON', mobileLabel: 'JSON Formatter' },
  { id: 'regex', label: 'RegExp', mobileLabel: 'RegExp Tester' },
  { id: 'url', label: 'URL Encode', mobileLabel: 'URL Encoder/Decoder' },
  { id: 'parser', label: 'URL Parser', mobileLabel: 'URL Parser' },
  { id: 'html', label: 'HTML', mobileLabel: 'HTML Preview' },
  { id: 'diff', label: 'Diff', mobileLabel: 'Text Diff Checker' },
  { id: 'cron', label: 'Cron', mobileLabel: 'Cron Parser' }
];

export function Navigation({ activeTab, onTabChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTabChange = (tabId) => {
    onTabChange(tabId);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">DevTools</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {TABS.map((tab) => (
              <TabButton
                key={tab.id}
                mobile
                active={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.mobileLabel}
              </TabButton>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
