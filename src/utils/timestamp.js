// Convert epoch to human-readable date
export function epochToHuman(epoch) {
  try {
    const timestamp = parseInt(epoch);
    if (isNaN(timestamp)) return '';

    const date = new Date(timestamp * 1000);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Seoul'
    });
  } catch (e) {
    return '유효하지 않은 timestamp';
  }
}

// Convert date to epoch
export function dateToEpoch(dateInput, timeInput = '') {
  const dateTimeString = timeInput ? `${dateInput}T${timeInput}` : `${dateInput}T00:00`;
  const date = new Date(dateTimeString);
  return Math.floor(date.getTime() / 1000);
}

// Get current epoch
export function getCurrentEpoch() {
  return Math.floor(Date.now() / 1000);
}
