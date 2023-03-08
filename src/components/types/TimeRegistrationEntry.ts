export interface TimeRegistrationEntry {
  id: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  description: string;
  projectName?: string;
}

export interface TimeRegistrationFormData {
  date: Date;
  startTime: Date;
  endTime: Date;
  description: string;
}
