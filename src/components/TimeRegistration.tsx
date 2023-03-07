import React, { useState, useEffect } from 'react';
import { TimeRegistrationEntry, TimeRegistrationFormData } from './types/TimeRegistrationEntry';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import moment from 'moment';

import Calendar from './Calendar';
import RegistrationList from './RegistrationList';
import TimeRegistrationSummary from './TimeRegistrationSummary';
import TimeRegistrationForm from './TimeRegistrationForm';


interface TimeRegistrationFormProps {
  control: Control<TimeRegistrationFormData>;
  handleSubmit: (data: TimeRegistrationFormData) => Promise<void>;
  initialData?: TimeRegistrationEntry | null;
  getValues: () => TimeRegistrationFormData;
  errors: FieldErrors<TimeRegistrationFormData>;
}

const TimeRegistration: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<TimeRegistrationFormData>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [registrations, setRegistrations] = useState<TimeRegistrationEntry[]>([]);

  useEffect(() => {
    // Fetch time registration entries for the selected date from the server
    fetchRegistrations(selectedDate);
  }, [selectedDate]);

  const fetchRegistrations = async (date: Date) => {
    try {
      // Make API call to fetch time registration entries for the selected date
      const response = await fetch(`/api/registrations?date=${date.toISOString()}`);
      if (!response.ok) {
        const errorMessage = `Failed to fetch time registrations: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      console.error(`Failed to fetch time registrations: ${error}`);
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddRegistration: SubmitHandler<TimeRegistrationFormData> = async (formData) => {
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = `Failed to add time registration: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data: TimeRegistrationEntry = await response.json();
      setRegistrations((prevRegistrations) => [...prevRegistrations, data]);

      const newDate = moment(formData.date).toDate();
      setSelectedDate(newDate);
    } catch (error) {
      console.error(`Failed to add time registration: ${error}`);
      // Handle error here, such as displaying an error message to the user
    }
  };

  const handleUpdateRegistration = async (id: string, formData: TimeRegistrationFormData) => {
    try {
      const response = await fetch(`/api/registrations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = `Failed to update time registration: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const index = registrations.findIndex((entry) => entry.id === id);
      setRegistrations([...registrations.slice(0, index), data, ...registrations.slice(index + 1)]);
    } catch (error) {
      console.error(`Failed to update time registration: ${error}`);
      // Handle error here, such as displaying an error message to the user
    }
  };

  const handleDeleteRegistration = async (id: string) => {
try {
const response = await fetch(`/api/registrations/${id}`, {
  method: 'DELETE',
});
  if (!response.ok) {
    const errorMessage = `Failed to delete time registration: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  setRegistrations(registrations.filter((entry) => entry.id !== id));
} catch (error) {
  console.error(`Failed to delete time registration: ${error}`);
  // Handle error here, such as displaying an error message to the user
}
};

return (
<div className="flex flex-col lg:flex-row justify-center items-start space-y-6 lg:space-y-0 lg:space-x-6">
<div className="w-full lg:w-1/2">
<Calendar
selectedDate={selectedDate}
onDateClick={handleDateClick}
events={registrations.map((entry) => ({
title: entry.description,
date: moment(entry.date).toDate(),
}))}
/>
</div>
<div className="w-full lg:w-1/2">
<RegistrationList
       registrations={registrations}
       onDeleteRegistration={handleDeleteRegistration}
       onUpdateRegistration={handleUpdateRegistration}
     />
<TimeRegistrationForm
       control={control}
       handleSubmit={handleSubmit(handleAddRegistration)}
       errors={errors}
     />
<TimeRegistrationSummary registrations={registrations} />
</div>
</div>
);
};

export default TimeRegistration;