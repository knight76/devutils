import React from 'react';
import { Code2 } from 'lucide-react';
import { Card, CardHeader, Label, ErrorBox, CopyButton } from '../shared';
import { useJSON } from '../../hooks';

export function JSONTool() {
  const { input, output, error, setInput, format, minify, validate } = useJSON();

  return (
    <>
      {/* Header */}
      <Card className="text-center">
        <CardHeader
          icon={Code2}
          title="JSON Formatter"
          subtitle="JSON 포맷팅 & 검증 도구"
          center
        />
      </Card>

      {/* Input */}
      <Card>
        <Label>JSON 입력</Label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "홍길동", "age": 30, "city": "서울"}'
          className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none font-mono text-sm"
        />
        <ErrorBox>{error}</ErrorBox>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <button
            onClick={format}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            포맷팅
          </button>
          <button
            onClick={minify}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            압축
          </button>
          <button
            onClick={validate}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            검증
          </button>
        </div>
      </Card>

      {/* Output */}
      {output && (
        <Card>
          <Label>결과</Label>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm max-h-96 overflow-y-auto whitespace-pre">
            {output}
          </div>
          <CopyButton text={output} />
        </Card>
      )}

      {/* Guide */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">사용법</h2>
        <div className="space-y-2 text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span><strong>포맷팅:</strong> JSON을 읽기 쉽게 정리합니다</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span><strong>압축:</strong> 공백을 제거하여 최소화합니다</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span><strong>검증:</strong> JSON 문법이 올바른지 확인합니다</span>
          </div>
        </div>
        <div className="mt-4 bg-indigo-50 rounded-lg p-4">
          <div className="text-sm text-gray-700">
            <div className="font-semibold mb-2">예시:</div>
            <div className="font-mono text-xs bg-white p-3 rounded">
              {`{"name":"홍길동","age":30,"hobbies":["독서","운동"]}`}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
