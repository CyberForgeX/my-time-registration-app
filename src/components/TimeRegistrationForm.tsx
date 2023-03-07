import React from 'react';
import { useForm, RegisterOptions } from 'react-hook-form';
import moment from 'moment';
import { TimeRegistrationFormData } from './types/TimeRegistrationEntry';

interface TimeRegistrationFormProps {
  handleSubmit: (data: TimeRegistrationFormData) => Promise<void>;
  initialData?: TimeRegistrationFormData | null;
}

const TimeRegistrationForm: React.FC<TimeRegistrationFormProps> = ({
  handleSubmit,
  initialData,
}) => {
  const { register, handleSubmit: onSubmit, formState: { errors } } = useForm<TimeRegistrationFormData>();

  const registerOptions: RegisterOptions = {
    required: 'This field is required',
    validate: (value, { getValues }) => {
      const startTime = moment(`${getValues('date')} ${getValues('startTime')}`);
      const endTime = moment(`${getValues('date')} ${getValues('endTime')}`);
      if (endTime.isBefore(startTime)) {
        return 'End time cannot be before start time';
      }
      return true;
    },
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          defaultValue={moment(initialData?.date || new Date()).format('YYYY-MM-DD')}
          {...register('date', registerOptions)}
        />
        {errors.date && <span>{errors.date.message}</span>}
      </div>
      <div>
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="time"
          id="startTime"
          defaultValue={initialData?.startTime || '09:00'}
          {...register('startTime', registerOptions)}
        />
        {errors.startTime && <span>{errors.startTime.message}</span>}
      </div>
      <div>
        <label htmlFor="endTime">End Time:</label>
        <input
          type="time"
          id="endTime"
          defaultValue={initialData?.endTime || '17:00'}
          {...register('endTime', registerOptions)}
        />
        {errors.endTime && <span>{errors.endTime.message}</span>}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          defaultValue={initialData?.description || ''}
          {...register('description', registerOptions)}
        />
        {errors.description && <span>{errors.description.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TimeRegistrationForm;
