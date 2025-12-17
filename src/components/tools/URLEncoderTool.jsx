import React from 'react';
import { Code2 } from 'lucide-react';
import { Card, CardHeader, Label, CopyButton, ResultBox } from '../shared';
import { useURLEncoder } from '../../hooks';

export function URLEncoderTool() {
  const { input, output, setInput, encode, decode } = useURLEncoder();

  return (
    <>
      {/* Header */}
      <Card className="text-center">
        <CardHeader
          icon={Code2}
          title="URL Encoder/Decoder"
          subtitle="URL 인코딩/디코딩 도구"
          center
        />
      </Card>

      {/* Input */}
      <Card>
        <Label>입력</Label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="인코딩하거나 디코딩할 URL 또는 텍스트를 입력하세요..."
          className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={encode}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors"
          >
            인코딩
          </button>
          <button
            onClick={decode}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition-colors"
          >
            디코딩
          </button>
        </div>
      </Card>

      {/* Output */}
      {output && (
        <Card>
          <Label>결과</Label>
          <ResultBox className="break-all">{output}</ResultBox>
          <CopyButton text={output} />
        </Card>
      )}

      {/* Guide */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">URL 인코딩이란?</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          URL에서 사용할 수 없는 특수문자를 안전하게 전송하기 위해 퍼센트 인코딩(% 인코딩)으로 변환합니다.
        </p>
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="text-sm text-gray-700">
            <div className="font-semibold mb-2">변환 예시:</div>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span>공백 ( )</span>
                <span className="text-indigo-600">→ %20</span>
              </div>
              <div className="flex justify-between">
                <span>느낌표 (!)</span>
                <span className="text-indigo-600">→ %21</span>
              </div>
              <div className="flex justify-between">
                <span>한글 (가)</span>
                <span className="text-indigo-600">→ %EA%B0%80</span>
              </div>
              <div className="flex justify-between">
                <span>앰퍼샌드 (&)</span>
                <span className="text-indigo-600">→ %26</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
