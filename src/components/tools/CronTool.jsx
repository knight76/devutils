import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardHeader, Label, ErrorBox, PrimaryButton } from '../shared';
import { useCron } from '../../hooks';
import { CRON_SAMPLES } from '../../utils';

export function CronTool() {
  const { expression, parsed, error, setExpression, parse, loadSample } = useCron();

  return (
    <>
      {/* Header */}
      <Card className="text-center">
        <CardHeader
          icon={Clock}
          title="Cron Parser"
          subtitle="Cron 표현식 분석 및 다음 실행 시간 예측"
          center
        />
      </Card>

      {/* Input */}
      <Card>
        <Label>Cron 표현식</Label>
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="* * * * * (분 시 일 월 요일)"
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-mono text-lg"
        />
        <ErrorBox>{error}</ErrorBox>
        <PrimaryButton onClick={parse} className="mt-4">
          파싱하기
        </PrimaryButton>
      </Card>

      {/* Sample Expressions */}
      <Card>
        <Label>자주 사용하는 표현식</Label>
        <div className="grid grid-cols-2 gap-2">
          {CRON_SAMPLES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => loadSample(sample.expression)}
              className="text-left p-3 bg-gray-50 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <div className="font-mono text-sm text-indigo-600">{sample.expression}</div>
              <div className="text-xs text-gray-600">{sample.label}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Parsed Result */}
      {parsed && (
        <>
          {/* Description */}
          <Card gradient className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <div className="text-sm opacity-90 mb-1">해석 결과</div>
            <div className="text-2xl font-bold">{parsed.description}</div>
          </Card>

          {/* Field Details */}
          <Card>
            <Label>필드 분석 ({parsed.fields}개 필드)</Label>
            <div className="space-y-3">
              {parsed.second && (
                <div className="flex items-center border-b border-gray-200 pb-3">
                  <div className="w-24 font-semibold text-gray-700">초</div>
                  <div className="flex-1">
                    <span className="font-mono text-indigo-600 mr-2">{parsed.raw.second}</span>
                    <span className="text-gray-600 text-sm">({parsed.second.description})</span>
                  </div>
                </div>
              )}
              <div className="flex items-center border-b border-gray-200 pb-3">
                <div className="w-24 font-semibold text-gray-700">분</div>
                <div className="flex-1">
                  <span className="font-mono text-indigo-600 mr-2">{parsed.raw.minute}</span>
                  <span className="text-gray-600 text-sm">({parsed.minute.description})</span>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-200 pb-3">
                <div className="w-24 font-semibold text-gray-700">시</div>
                <div className="flex-1">
                  <span className="font-mono text-indigo-600 mr-2">{parsed.raw.hour}</span>
                  <span className="text-gray-600 text-sm">({parsed.hour.description})</span>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-200 pb-3">
                <div className="w-24 font-semibold text-gray-700">일</div>
                <div className="flex-1">
                  <span className="font-mono text-indigo-600 mr-2">{parsed.raw.dayOfMonth}</span>
                  <span className="text-gray-600 text-sm">({parsed.dayOfMonth.description})</span>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-200 pb-3">
                <div className="w-24 font-semibold text-gray-700">월</div>
                <div className="flex-1">
                  <span className="font-mono text-indigo-600 mr-2">{parsed.raw.month}</span>
                  <span className="text-gray-600 text-sm">({parsed.month.description})</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 font-semibold text-gray-700">요일</div>
                <div className="flex-1">
                  <span className="font-mono text-indigo-600 mr-2">{parsed.raw.dayOfWeek}</span>
                  <span className="text-gray-600 text-sm">({parsed.dayOfWeek.description})</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Runs */}
          {parsed.nextRuns && parsed.nextRuns.length > 0 && (
            <Card>
              <Label>다음 실행 시간</Label>
              <div className="space-y-2">
                {parsed.nextRuns.map((date, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="bg-indigo-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      #{idx + 1}
                    </span>
                    <span className="font-mono text-gray-800">
                      {date.toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        weekday: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {/* Guide */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Cron 표현식 형식</h2>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="font-mono text-sm text-center mb-2">
            <span className="text-purple-600">분</span>{' '}
            <span className="text-blue-600">시</span>{' '}
            <span className="text-green-600">일</span>{' '}
            <span className="text-orange-600">월</span>{' '}
            <span className="text-red-600">요일</span>
          </div>
          <div className="text-xs text-gray-600 text-center">
            (0-59) (0-23) (1-31) (1-12) (0-6, 0=일요일)
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">*</span> 모든 값
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">,</span> 여러 값 (1,3,5)
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">-</span> 범위 (1-5)
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="font-mono text-indigo-600">/</span> 간격 (*/5)
          </div>
        </div>
      </Card>
    </>
  );
}
