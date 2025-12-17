import React from 'react';
import { Code2 } from 'lucide-react';
import { Card, CardHeader, Label, ErrorBox, PrimaryButton, SmallButton } from '../shared';
import { useURLParser } from '../../hooks';

export function URLParserTool() {
  const { input, parsed, error, setInput, parse } = useURLParser();

  const copyJSON = async (data) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      alert('JSON으로 복사되었습니다!');
    } catch (e) {
      alert('복사 실패');
    }
  };

  return (
    <>
      {/* Header */}
      <Card className="text-center">
        <CardHeader
          icon={Code2}
          title="URL Parser"
          subtitle="URL 구조 분석 도구"
          center
        />
      </Card>

      {/* Input */}
      <Card>
        <Label>URL 입력</Label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://www.example.com/path?key=value"
          className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
        />
        <ErrorBox>{error}</ErrorBox>
        <PrimaryButton onClick={parse} className="mt-4">
          파싱하기
        </PrimaryButton>
      </Card>

      {/* Parsed Result */}
      {parsed && (
        <>
          {/* Basic Info */}
          <Card>
            <Label>기본 정보</Label>
            <div className="space-y-3">
              <div className="flex border-b border-gray-200 pb-3">
                <div className="w-32 font-semibold text-gray-700">Protocol</div>
                <div className="flex-1 font-mono text-indigo-600">{parsed.protocol}</div>
              </div>
              <div className="flex border-b border-gray-200 pb-3">
                <div className="w-32 font-semibold text-gray-700">Host</div>
                <div className="flex-1 font-mono text-indigo-600">{parsed.host}</div>
              </div>
              {parsed.port && (
                <div className="flex border-b border-gray-200 pb-3">
                  <div className="w-32 font-semibold text-gray-700">Port</div>
                  <div className="flex-1 font-mono text-indigo-600">{parsed.port}</div>
                </div>
              )}
              <div className="flex border-b border-gray-200 pb-3">
                <div className="w-32 font-semibold text-gray-700">Path</div>
                <div className="flex-1 font-mono text-indigo-600">{parsed.path || '/'}</div>
              </div>
              {parsed.fileName && (
                <div className="flex border-b border-gray-200 pb-3">
                  <div className="w-32 font-semibold text-gray-700">File name</div>
                  <div className="flex-1 font-mono text-indigo-600">{parsed.fileName}</div>
                </div>
              )}
              {parsed.query && (
                <div className="flex border-b border-gray-200 pb-3">
                  <div className="w-32 font-semibold text-gray-700">Query</div>
                  <div className="flex-1 font-mono text-indigo-600 break-all">{parsed.query}</div>
                </div>
              )}
              {parsed.hash && (
                <div className="flex">
                  <div className="w-32 font-semibold text-gray-700">Hash</div>
                  <div className="flex-1 font-mono text-indigo-600">{parsed.hash}</div>
                </div>
              )}
            </div>
          </Card>

          {/* Query Parameters */}
          {Object.keys(parsed.queryParams).length > 0 && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <Label>Query Parameters</Label>
                <SmallButton onClick={() => copyJSON(parsed.queryParams)}>
                  Copy as JSON
                </SmallButton>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {Object.entries(parsed.queryParams).map(([key, value]) => (
                    <div key={key} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="text-sm font-semibold text-gray-700 mb-1">{key}</div>
                      <div className="font-mono text-sm text-indigo-600 break-all">
                        {Array.isArray(value) ? JSON.stringify(value) : value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* JSON View */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <Label>Query String (JSON)</Label>
              <SmallButton onClick={() => copyJSON(parsed.queryParams)}>
                Copy
              </SmallButton>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm whitespace-pre overflow-x-auto">
              {JSON.stringify(parsed.queryParams, null, 2)}
            </div>
          </Card>
        </>
      )}

      {/* Guide */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">URL 구조</h2>
        <div className="bg-indigo-50 rounded-lg p-4 font-mono text-xs break-all">
          <div className="mb-3 text-gray-700">
            <span className="text-red-600">protocol</span>://
            <span className="text-blue-600">host</span>
            <span className="text-purple-600">:port</span>
            <span className="text-green-600">/path</span>
            <span className="text-orange-600">?query</span>
            <span className="text-pink-600">#hash</span>
          </div>
          <div className="text-gray-600">
            예시: <span className="text-red-600">https</span>://
            <span className="text-blue-600">www.example.com</span>
            <span className="text-purple-600">:443</span>
            <span className="text-green-600">/search</span>
            <span className="text-orange-600">?q=hello&lang=ko</span>
            <span className="text-pink-600">#results</span>
          </div>
        </div>
      </Card>
    </>
  );
}
