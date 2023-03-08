interface TimeRegistrationFormProps {
  onSubmit: SubmitHandler<TimeRegistrationFormData>;
  onDelete?: () => void;
  onCancel: () => void;
  formData?: TimeRegistrationFormData;
}

const TimeRegistrationForm: React.FC<TimeRegistrationFormProps> = ({
  onSubmit,
  onDelete,
  onCancel,
  formData,
}) => {
  const defaultValues: TimeRegistrationFormData = {
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    description: '',
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<TimeRegistrationFormData>({
    defaultValues: formData || defaultValues,
  });

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const handleCancelClick = () => {
    onCancel();
  };

  const handleDateChange = (date: Date) => {
    setValue('date', date);
  };

  const handleStartTimeChange = (date: Date) => {
    setValue('startTime', date);
  };

  const handleEndTimeChange = (date: Date) => {
    setValue('endTime', date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <DatePicker
          id="date"
          className="form-control"
          selected={watch('date')}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
        />
        {errors.date && (
          <span className="text-danger">Date is required</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="startTime">Start time</label>
        <DatePicker
          id="startTime"
          className="form-control"
          selected={watch('startTime')}
          onChange={handleStartTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="HH:mm"
        />
        {errors.startTime && (
          <span className="text-danger">Start time is required</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="endTime">End time</label>
        <DatePicker
          id="endTime"
          className="form-control"
          selected={watch('endTime')}
          onChange={handleEndTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="HH:mm"
        />
        {errors.endTime && (
          <span className="text-danger">End time is required</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          className="form-control"
          {...control('description', { required: true })}
        />
        {errors.description && (
          <span className="text-danger">Description is required</span>
        )}
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary mr-2">
          Save
        </button>
        {onDelete && (
          <button
            type="button"
            className="btn btn-danger mr-2"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        )}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </div>
    </form>
    );
  };


export default TimeRegistrationForm;