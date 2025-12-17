import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { Card, CardHeader, Label, SmallButton, ModeButton, PrimaryButton } from '../shared';
import { useDiff } from '../../hooks';

export function DiffTool() {
  const {
    text1,
    text2,
    mode,
    result,
    stats,
    setText1,
    setText2,
    setMode,
    compute,
    loadSample,
    swap
  } = useDiff();

  const pasteFromClipboard = async (setter) => {
    try {
      const text = await navigator.clipboard.readText();
      setter(text);
    } catch (e) {
      alert('클립보드 읽기 실패');
    }
  };

  return (
    <>
      {/* Header */}
      <Card className="text-center">
        <CardHeader
          icon={ArrowRightLeft}
          title="Text Diff Checker"
          subtitle="두 텍스트의 차이점 비교"
          center
        />
      </Card>

      {/* Mode Selection */}
      <Card>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Diff 모드
        </label>
        <div className="flex gap-3">
          <ModeButton active={mode === 'characters'} onClick={() => setMode('characters')}>
            문자
          </ModeButton>
          <ModeButton active={mode === 'words'} onClick={() => setMode('words')}>
            단어
          </ModeButton>
          <ModeButton active={mode === 'lines'} onClick={() => setMode('lines')}>
            줄
          </ModeButton>
        </div>
      </Card>

      {/* Two Column Input */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Original Text */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <Label>원본 텍스트</Label>
            <SmallButton onClick={() => pasteFromClipboard(setText1)}>
              붙여넣기
            </SmallButton>
          </div>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="비교할 첫 번째 텍스트를 입력하세요..."
            className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none font-mono text-sm"
          />
        </Card>

        {/* Compare Text */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <Label>비교 텍스트</Label>
            <SmallButton onClick={swap}>⇄ 교체</SmallButton>
          </div>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="비교할 두 번째 텍스트를 입력하세요..."
            className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none font-mono text-sm"
          />
        </Card>
      </div>

      {/* Compare Button */}
      <Card>
        <div className="flex gap-3">
          <PrimaryButton onClick={compute}>
            차이점 비교
          </PrimaryButton>
          <button
            onClick={loadSample}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-4 rounded-xl transition-colors"
          >
            샘플 로드
          </button>
        </div>
      </Card>

      {/* Diff Result */}
      {result.length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <Label>비교 결과</Label>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-200 rounded"></span>
                추가
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-200 rounded"></span>
                삭제
              </span>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto max-h-96 overflow-y-auto">
            <pre className="font-mono text-sm">
              {result.map((item, idx) => {
                if (item.type === 'added') {
                  return (
                    <span key={idx} className="bg-green-600 text-white">
                      {item.value}
                      {mode === 'words' && ' '}
                      {mode === 'lines' && '\n'}
                    </span>
                  );
                } else if (item.type === 'removed') {
                  return (
                    <span key={idx} className="bg-red-600 text-white line-through">
                      {item.value}
                      {mode === 'words' && ' '}
                      {mode === 'lines' && '\n'}
                    </span>
                  );
                } else {
                  return (
                    <span key={idx} className="text-gray-300">
                      {item.value}
                      {mode === 'words' && ' '}
                      {mode === 'lines' && '\n'}
                    </span>
                  );
                }
              })}
            </pre>
          </div>
        </Card>
      )}

      {/* Statistics */}
      {result.length > 0 && (
        <Card>
          <Label>통계</Label>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-700">
                {stats.added}
              </div>
              <div className="text-sm text-gray-600">추가됨</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-700">
                {stats.removed}
              </div>
              <div className="text-sm text-gray-600">삭제됨</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-700">
                {stats.equal}
              </div>
              <div className="text-sm text-gray-600">동일함</div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
