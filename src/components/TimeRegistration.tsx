const TimeRegistration: React.FC = () => {
  const [selectedTimeRegistration, setSelectedTimeRegistration] = useState<TimeRegistrationFormData | null>(null);
  const { control, handleSubmit, formState: { errors }, reset } = useForm<TimeRegistrationFormData>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());


const handleDateClick = (date: Date) => {
setSelectedDate(date);
};

const handleAddRegistration = (data: TimeRegistrationFormData) => {
const newRegistration: TimeRegistrationEntry = {
id: selectedTimeRegistration ? selectedTimeRegistration.id : Date.now().toString(), // fixed to convert the number to a string
date: selectedDate,
startTime: moment(data.startTime).toDate(),
endTime: moment(data.endTime).toDate(),
description: data.description,
};
if (selectedTimeRegistration) {
onUpdateRegistration(selectedTimeRegistration.id, data);
} else {
onAddRegistration(newRegistration);
}
reset();
setSelectedTimeRegistration(null);
};

const handleDeleteRegistration = (id: string) => {
onDeleteRegistration(id);
setSelectedTimeRegistration(null);
};

const handleEditRegistration = (id: string) => {
const registration = events.find((r) => r.id === id);
if (registration) {
setSelectedTimeRegistration({
id: registration.id,
startTime: moment(registration.start).format('HH:mm'),
endTime: moment(registration.end).format('HH:mm'),
description: registration.title,
});
}
};

const handleCloseRegistration = () => {
reset();
setSelectedTimeRegistration(null);
};

return (
<div>
<Calendar
     selectedDate={selectedDate}
     onDateClick={handleDateClick}
     events={events}
     onViewChange={handleViewChange}
     onAddRegistration={handleAddRegistration}
     onDeleteRegistration={handleDeleteRegistration}
     onUpdateRegistration={onUpdateRegistration}
   />
   <TimeRegistrationForm
     control={control}
     errors={errors}
     onSubmit={handleSubmit(handleAddRegistration)}
     onCancel={handleCloseRegistration}
     formData={selectedTimeRegistration}
   />

   <RegistrationList
     registrations={events}
     onDeleteRegistration={handleDeleteRegistration}
     onUpdateRegistration={handleEditRegistration}
   />
<TimeRegistrationSummary registrations={events} />
</div>
);
};

export default TimeRegistration;
