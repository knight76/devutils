import React from 'react';
import { Clock, Calendar, Code2, ArrowRightLeft } from 'lucide-react';
import { Card, CardHeader, SectionTitle } from '../shared';
import { useTimestamp } from '../../hooks';

export function TimestampTool() {
  const {
    currentEpoch,
    epochInput,
    humanDate,
    dateInput,
    timeInput,
    epochResult,
    setDateInput,
    setTimeInput,
    handleEpochInput,
    convertDateToEpoch,
    convertEpochToHuman
  } = useTimestamp();

  return (
    <>
      {/* Header */}
      <Card className="text-center">
        <CardHeader
          icon={Clock}
          title="Epoch Converter"
          subtitle="Unix Timestamp 변환 도구"
          center
        />
      </Card>

      {/* Current Epoch */}
      <Card gradient className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5" />
          <h2 className="text-lg font-semibold">현재 Epoch 시간</h2>
        </div>
        <div className="text-4xl font-mono font-bold mb-2">{currentEpoch}</div>
        <div className="text-sm opacity-90">{convertEpochToHuman(currentEpoch)}</div>
      </Card>

      {/* Epoch to Human */}
      <Card>
        <SectionTitle icon={ArrowRightLeft}>Epoch → 날짜 변환</SectionTitle>
        <input
          type="text"
          value={epochInput}
          onChange={(e) => handleEpochInput(e.target.value)}
          placeholder="Epoch timestamp 입력 (예: 1732604225)"
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg mb-3"
        />
        {humanDate && (
          <div className="bg-indigo-50 rounded-xl p-4">
            <div className="text-sm text-gray-600 mb-1">변환 결과:</div>
            <div className="text-xl font-semibold text-indigo-700">{humanDate}</div>
          </div>
        )}
      </Card>

      {/* Date to Epoch */}
      <Card>
        <SectionTitle icon={Calendar}>날짜 → Epoch 변환</SectionTitle>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">날짜</label>
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">시간 (선택)</label>
            <input
              type="time"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
            />
          </div>
          <button
            onClick={convertDateToEpoch}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors"
          >
            변환하기
          </button>
          {epochResult && (
            <div className="bg-indigo-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Epoch 결과:</div>
              <div className="text-2xl font-mono font-bold text-indigo-700">{epochResult}</div>
            </div>
          )}
        </div>
      </Card>

      {/* Time Unit Reference */}
      <Card>
        <SectionTitle icon={Code2}>시간 단위 변환</SectionTitle>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-600">1초</div>
            <div className="font-semibold">1000 밀리초</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-600">1분</div>
            <div className="font-semibold">60초</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-600">1시간</div>
            <div className="font-semibold">3600초</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-600">1일</div>
            <div className="font-semibold">86400초</div>
          </div>
        </div>
      </Card>

      {/* About */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Epoch time이란?</h2>
        <p className="text-gray-600 leading-relaxed">
          Unix Epoch time은 1970년 1월 1일 00:00:00 UTC부터 경과한 초를 나타냅니다.
          전 세계 컴퓨터 시스템에서 날짜와 시간을 표현하는 표준 방식으로 사용됩니다.
        </p>
      </Card>
    </>
  );
}
