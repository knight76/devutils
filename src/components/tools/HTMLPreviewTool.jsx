import React from 'react';
import { Code2 } from 'lucide-react';
import { Card, CardHeader, Label, SmallButton, PrimaryButton } from '../shared';
import { useHTMLPreview } from '../../hooks';

export function HTMLPreviewTool() {
  const { input, key, setInput, refresh, loadSample, clear } = useHTMLPreview();

  return (
    <>
      {/* Header */}
      <Card className="text-center">
        <CardHeader
          icon={Code2}
          title="HTML Preview"
          subtitle="실시간 HTML 미리보기"
          center
        />
      </Card>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left: HTML Input */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <Label>HTML 코드</Label>
            <div className="flex gap-2">
              <SmallButton onClick={loadSample}>샘플</SmallButton>
              <SmallButton onClick={clear}>초기화</SmallButton>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>`}
            className="w-full h-[500px] p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none font-mono text-sm"
          />
          <PrimaryButton onClick={refresh} className="mt-4">
            미리보기 업데이트
          </PrimaryButton>
        </Card>

        {/* Right: Preview */}
        <Card>
          <Label>미리보기</Label>
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
            {input ? (
              <iframe
                key={key}
                srcDoc={input}
                className="w-full h-[500px] border-0"
                title="HTML Preview"
                sandbox="allow-scripts"
              />
            ) : (
              <div className="h-[500px] flex items-center justify-center text-gray-400">
                HTML 코드를 입력하면 여기에 미리보기가 표시됩니다
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Guide */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">사용 팁</h2>
        <div className="space-y-2 text-gray-600 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span>왼쪽에 HTML 코드를 입력하고 "미리보기 업데이트" 버튼을 클릭하세요</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span>HTML, CSS, JavaScript를 모두 사용할 수 있습니다</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span>"샘플" 버튼을 클릭하면 예제 코드를 볼 수 있습니다</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">⚠</span>
            <span>보안상 일부 기능이 제한될 수 있습니다</span>
          </div>
        </div>
      </Card>
    </>
  );
}
