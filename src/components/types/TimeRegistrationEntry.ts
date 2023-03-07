export interface TimeRegistrationEntry {
  id: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  description: string;
  projectName?: string;
}

export interface TimeRegistrationFormData {
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  getValues: string;
}