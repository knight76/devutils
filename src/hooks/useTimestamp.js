import { useState, useEffect, useCallback } from 'react';
import { epochToHuman, dateToEpoch, getCurrentEpoch } from '../utils';

export function useTimestamp() {
  const [currentEpoch, setCurrentEpoch] = useState(getCurrentEpoch());
  const [epochInput, setEpochInput] = useState('');
  const [humanDate, setHumanDate] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [epochResult, setEpochResult] = useState('');

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpoch(getCurrentEpoch());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEpochInput = useCallback((value) => {
    setEpochInput(value);
    if (value) {
      setHumanDate(epochToHuman(value));
    } else {
      setHumanDate('');
    }
  }, []);

  const convertDateToEpoch = useCallback(() => {
    try {
      if (!dateInput) return;
      const epoch = dateToEpoch(dateInput, timeInput);
      setEpochResult(epoch.toString());
    } catch (e) {
      setEpochResult('유효하지 않은 날짜');
    }
  }, [dateInput, timeInput]);

  const reset = useCallback(() => {
    setEpochInput('');
    setHumanDate('');
    setDateInput('');
    setTimeInput('');
    setEpochResult('');
  }, []);

  return {
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
    convertEpochToHuman: epochToHuman,
    reset
  };
}
