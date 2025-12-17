import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import {
  TimestampTool,
  Base64Tool,
  JSONTool,
  RegexTool,
  URLEncoderTool,
  URLParserTool,
  HTMLPreviewTool,
  DiffTool,
  CronTool
} from './components/tools';

const TOOL_COMPONENTS = {
  timestamp: TimestampTool,
  base64: Base64Tool,
  json: JSONTool,
  regex: RegexTool,
  url: URLEncoderTool,
  parser: URLParserTool,
  html: HTMLPreviewTool,
  diff: DiffTool,
  cron: CronTool
};

export default function App() {
  const [activeTab, setActiveTab] = useState('timestamp');

  const ActiveTool = TOOL_COMPONENTS[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <ActiveTool />

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm py-4">
            Made with ❤️ by Claude
          </div>
        </div>
      </div>
    </div>
  );
}

