const FIELD_DESCRIPTIONS = {
  second: { min: 0, max: 59, name: '초' },
  minute: { min: 0, max: 59, name: '분' },
  hour: { min: 0, max: 23, name: '시' },
  dayOfMonth: { min: 1, max: 31, name: '일' },
  month: { min: 1, max: 12, name: '월' },
  dayOfWeek: { min: 0, max: 6, name: '요일' }
};

const DAY_NAMES = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const MONTH_NAMES = ['', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

function parseField(value, fieldType) {
  const { min, max, name } = FIELD_DESCRIPTIONS[fieldType];

  if (value === '*') {
    return { type: 'every', description: `매 ${name}` };
  }

  if (value.includes('/')) {
    const [range, step] = value.split('/');
    const stepNum = parseInt(step);
    if (isNaN(stepNum) || stepNum < 1) {
      throw new Error(`잘못된 간격 값: ${step}`);
    }
    if (range === '*') {
      return { type: 'step', step: stepNum, description: `${stepNum}${name}마다` };
    }
    return { type: 'step', range, step: stepNum, description: `${range}부터 ${stepNum}${name}마다` };
  }

  if (value.includes('-')) {
    const [start, end] = value.split('-').map(Number);
    if (isNaN(start) || isNaN(end) || start < min || end > max) {
      throw new Error(`잘못된 범위: ${value}`);
    }
    return { type: 'range', start, end, description: `${start}부터 ${end}까지` };
  }

  if (value.includes(',')) {
    const values = value.split(',').map(v => {
      const num = parseInt(v);
      if (isNaN(num) || num < min || num > max) {
        throw new Error(`잘못된 값: ${v}`);
      }
      return num;
    });
    return { type: 'list', values, description: values.join(', ') };
  }

  const num = parseInt(value);
  if (isNaN(num) || num < min || num > max) {
    throw new Error(`잘못된 ${name} 값: ${value} (${min}-${max})`);
  }
  return { type: 'specific', value: num, description: `${num}` };
}

function generateDescription(parsed) {
  let description = '';

  if (parsed.second) {
    description += parsed.second.type === 'every' ? '매초 ' : `${parsed.second.description}초에 `;
  }

  if (parsed.minute.type === 'every' && parsed.hour.type === 'every') {
    description += '매분 ';
  } else if (parsed.minute.type === 'specific' && parsed.hour.type === 'specific') {
    description += `${parsed.hour.description}시 ${parsed.minute.description}분에 `;
  } else {
    if (parsed.hour.type !== 'every') {
      description += `${parsed.hour.description}시 `;
    }
    if (parsed.minute.type !== 'every') {
      description += `${parsed.minute.description}분 `;
    } else {
      description += '매분 ';
    }
  }

  if (parsed.dayOfMonth.type !== 'every' || parsed.month.type !== 'every') {
    if (parsed.month.type !== 'every') {
      const monthVal = parsed.month.value || parsed.month.description;
      description += `${MONTH_NAMES[monthVal] || monthVal} `;
    }
    if (parsed.dayOfMonth.type !== 'every') {
      description += `${parsed.dayOfMonth.description}일 `;
    }
  }

  if (parsed.dayOfWeek.type !== 'every') {
    if (parsed.dayOfWeek.type === 'specific') {
      description += `${DAY_NAMES[parsed.dayOfWeek.value]} `;
    } else {
      description += `요일: ${parsed.dayOfWeek.description} `;
    }
  }

  return description.trim() || '실행';
}

function getNextRuns(parsed, count = 5) {
  const runs = [];
  const now = new Date();
  let current = new Date(now);

  const matchesField = (date, field, type) => {
    let value;
    switch (type) {
      case 'minute': value = date.getMinutes(); break;
      case 'hour': value = date.getHours(); break;
      case 'dayOfMonth': value = date.getDate(); break;
      case 'month': value = date.getMonth() + 1; break;
      case 'dayOfWeek': value = date.getDay(); break;
      case 'second': value = date.getSeconds(); break;
      default: return true;
    }

    if (!field) return true;
    if (field.type === 'every') return true;
    if (field.type === 'specific') return value === field.value;
    if (field.type === 'range') return value >= field.start && value <= field.end;
    if (field.type === 'list') return field.values.includes(value);
    if (field.type === 'step') {
      if (field.range === '*' || !field.range) {
        return value % field.step === 0;
      }
    }
    return true;
  };

  const maxIterations = 100000;
  let iterations = 0;

  while (runs.length < count && iterations < maxIterations) {
    current = new Date(current.getTime() + (parsed.second ? 1000 : 60000));
    iterations++;

    if (matchesField(current, parsed.minute, 'minute') &&
        matchesField(current, parsed.hour, 'hour') &&
        matchesField(current, parsed.dayOfMonth, 'dayOfMonth') &&
        matchesField(current, parsed.month, 'month') &&
        matchesField(current, parsed.dayOfWeek, 'dayOfWeek') &&
        (!parsed.second || matchesField(current, parsed.second, 'second'))) {
      runs.push(new Date(current));
    }
  }

  return runs;
}

export function parseCronExpression(expression) {
  if (!expression.trim()) {
    throw new Error('Cron 표현식을 입력하세요');
  }

  const parts = expression.trim().split(/\s+/);

  let minute, hour, dayOfMonth, month, dayOfWeek, second = null;

  if (parts.length === 5) {
    [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  } else if (parts.length === 6) {
    [second, minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  } else {
    throw new Error(`잘못된 필드 수: ${parts.length}개 (5개 또는 6개 필요)`);
  }

  const parsed = {
    fields: parts.length,
    second: second ? parseField(second, 'second') : null,
    minute: parseField(minute, 'minute'),
    hour: parseField(hour, 'hour'),
    dayOfMonth: parseField(dayOfMonth, 'dayOfMonth'),
    month: parseField(month, 'month'),
    dayOfWeek: parseField(dayOfWeek, 'dayOfWeek'),
    raw: { second, minute, hour, dayOfMonth, month, dayOfWeek }
  };

  parsed.description = generateDescription(parsed);
  parsed.nextRuns = getNextRuns(parsed, 5);

  return parsed;
}

export const CRON_SAMPLES = [
  { expression: '* * * * *', label: '매분' },
  { expression: '0 * * * *', label: '매시 정각' },
  { expression: '0 0 * * *', label: '매일 자정' },
  { expression: '0 9 * * 1-5', label: '평일 오전 9시' },
  { expression: '0 0 1 * *', label: '매월 1일 자정' },
  { expression: '*/5 * * * *', label: '5분마다' },
  { expression: '0 0 * * 0', label: '매주 일요일 자정' },
  { expression: '30 4 1,15 * *', label: '매월 1,15일 4:30' }
];
