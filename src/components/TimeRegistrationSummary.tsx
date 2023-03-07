import React from 'react';
import moment from 'moment';
import { TimeRegistrationEntry } from './types/TimeRegistrationEntry';

interface TimeRegistrationSummaryProps {
  registrations: TimeRegistrationEntry[];
}


const TimeRegistrationSummary: React.FC<TimeRegistrationSummaryProps> = ({ registrations }) => {
  const totalHours = registrations.reduce((total, entry) => total + moment(entry.endTime).diff(moment(entry.startTime), 'hours'), 0);
  const exceedsMaxHours = totalHours > 100;

  return (
    <div>
      <h2>Summary</h2>
      <p>Total hours: {totalHours}</p>
      {exceedsMaxHours && <p style={{ color: 'red' }}>Warning: Total hours exceed 100</p>}
    </div>
  );
};

export default TimeRegistrationSummary;
