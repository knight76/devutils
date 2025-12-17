import React from 'react';
import { Code2 } from 'lucide-react';
import { Card, CardHeader, Label, ModeButton, CopyButton, ResultBox } from '../shared';
import { useBase64 } from '../../hooks';

export function Base64Tool() {
  const {
    input,
    output,
    mode,
    imageFile,
    imagePreview,
    decodedImage,
    setInput,
    encode,
    decode,
    handleImageUpload,
    decodeToImage,
    switchMode
  } = useBase64();

  return (
    <>
      {/* Header */}
      <Card className="text-center">
        <CardHeader
          icon={Code2}
          title="Base64 Converter"
          subtitle="텍스트 & 이미지 인코딩/디코딩 도구"
          center
        />
      </Card>

      {/* Mode Selection */}
      <Card>
        <div className="flex gap-3">
          <ModeButton active={mode === 'text'} onClick={() => switchMode('text')}>
            텍스트
          </ModeButton>
          <ModeButton active={mode === 'image'} onClick={() => switchMode('image')}>
            이미지
          </ModeButton>
        </div>
      </Card>

      {/* Text Mode */}
      {mode === 'text' && (
        <>
          <Card>
            <Label>입력 텍스트</Label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="인코딩하거나 디코딩할 텍스트를 입력하세요..."
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

          {output && (
            <Card>
              <Label>결과</Label>
              <ResultBox className="break-all">{output}</ResultBox>
              <CopyButton text={output} />
            </Card>
          )}
        </>
      )}

      {/* Image Mode */}
      {mode === 'image' && (
        <>
          {/* Image Encoding */}
          <Card>
            <Label>이미지 → Base64 인코딩</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="text-gray-600">
                  <div className="text-4xl mb-2">📁</div>
                  <div className="font-semibold">이미지 선택</div>
                  <div className="text-sm mt-1">클릭하거나 드래그하여 업로드</div>
                </div>
              </label>
            </div>
            {imagePreview && (
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2">미리보기:</div>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </Card>

          {output && imageFile && (
            <Card>
              <Label>Base64 결과</Label>
              <ResultBox className="break-all text-xs">{output}</ResultBox>
              <CopyButton text={output} />
            </Card>
          )}

          {/* Image Decoding */}
          <Card>
            <Label>Base64 → 이미지 디코딩</Label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Base64 문자열을 입력하세요..."
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none font-mono text-sm"
            />
            <button
              onClick={decodeToImage}
              className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition-colors"
            >
              이미지로 변환
            </button>
          </Card>

          {decodedImage && (
            <Card>
              <Label>디코딩된 이미지</Label>
              <img
                src={decodedImage}
                alt="Decoded"
                className="max-w-full max-h-96 mx-auto rounded-lg shadow-md"
              />
            </Card>
          )}
        </>
      )}

      {/* About */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Base64란?</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          Base64는 바이너리 데이터를 텍스트로 인코딩하는 방식입니다.
          이메일이나 URL에서 바이너리 데이터를 안전하게 전송할 때 사용됩니다.
        </p>
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="text-sm text-gray-700">
            <div className="mb-2"><strong>예시:</strong></div>
            <div className="font-mono text-xs">
              <div>텍스트: Hello World</div>
              <div className="text-indigo-600">Base64: SGVsbG8gV29ybGQ=</div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
