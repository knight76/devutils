import React from 'react';
import { Code2 } from 'lucide-react';
import { Card, CardHeader, Label, ErrorBox, PrimaryButton } from '../shared';
import { useRegex } from '../../hooks';

export function RegexTool() {
  const {
    pattern,
    flags,
    testText,
    matches,
    error,
    highlightedText,
    setPattern,
    setFlags,
    setTestText,
    test
  } = useRegex();

  return (
    <>
      {/* Header */}
      <Card className="text-center">
        <CardHeader
          icon={Code2}
          title="RegExp Tester"
          subtitle="정규식 테스트 & 매칭 도구"
          center
        />
      </Card>

      {/* Pattern Input */}
      <Card>
        <Label>정규식 패턴</Label>
        <div className="flex gap-2">
          <span className="text-2xl text-gray-400">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="[A-Z]\w+"
            className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-mono"
          />
          <span className="text-2xl text-gray-400">/</span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="g"
            className="w-20 p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-mono text-center"
          />
        </div>
        <div className="mt-3 text-sm text-gray-600">
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-100 px-2 py-1 rounded">g: 전역 검색</span>
            <span className="bg-gray-100 px-2 py-1 rounded">i: 대소문자 무시</span>
            <span className="bg-gray-100 px-2 py-1 rounded">m: 다중행</span>
          </div>
        </div>
      </Card>

      {/* Test Text */}
      <Card>
        <Label>테스트 텍스트</Label>
        <textarea
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="테스트할 텍스트를 입력하세요..."
          className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
        />
        <ErrorBox>{error}</ErrorBox>
        <PrimaryButton onClick={test} className="mt-4">
          테스트 실행
        </PrimaryButton>
      </Card>

      {/* Match Results */}
      {matches.length > 0 && (
        <>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <Label>매치 결과</Label>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                {matches.length}개 매치
              </span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 whitespace-pre-wrap break-words">
              {highlightedText}
            </div>
          </Card>

          <Card>
            <Label>상세 정보</Label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {matches.map((match, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                      #{i + 1}
                    </span>
                    <span className="font-mono font-semibold text-green-700">
                      "{match.text}"
                    </span>
                  </div>
                  <div className="text-gray-600">
                    위치: {match.index} ~ {match.index + match.text.length}
                  </div>
                  {match.groups.length > 0 && (
                    <div className="text-gray-600 mt-1">
                      그룹: {match.groups.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {matches.length === 0 && testText && !error && pattern && (
        <Card className="text-center text-gray-500">
          매치되는 항목이 없습니다
        </Card>
      )}

      {/* Cheatsheet */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">정규식 치트시트</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">\d</span> 숫자
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">\w</span> 단어 문자
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">\s</span> 공백
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">.</span> 모든 문자
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">*</span> 0회 이상
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">+</span> 1회 이상
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">?</span> 0 또는 1회
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">^</span> 시작
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">$</span> 끝
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">[ ]</span> 문자 클래스
          </div>
        </div>
      </Card>
    </>
  );
}
