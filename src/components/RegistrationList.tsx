import React from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import moment from 'moment';
import { TimeRegistrationEntry } from './types/TimeRegistrationEntry';

interface RegistrationListProps {
  registrations: TimeRegistrationEntry[];
  onDeleteRegistration: (id: string) => void;
  onUpdateRegistration: (id: string, formData: TimeRegistrationFormData) => void;
}


interface Column<T> {
  Header: string;
  accessor: keyof T;
  Cell?: (row: any) => React.ReactNode;
}

const RegistrationList: React.FC<RegistrationListProps> = ({
  registrations,
  onDeleteRegistration,
  onUpdateRegistration,
}) => {
  const columns: Column<TimeRegistrationEntry>[] = [
    {
      Header: 'Date',
      accessor: 'date',
      Cell: (row: any): React.ReactNode => moment(row.value).format("YYYY-MM-DD"),
    },
    {
      Header: 'Start Time',
      accessor: 'startTime',
      Cell: (row: any): React.ReactNode => moment(row.value).format('HH:mm:ss'),
    },
    {
      Header: 'End Time',
      accessor: 'endTime',
      Cell: (row: any): React.ReactNode => moment(row.value).format('HH:mm:ss'),
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Actions',
      Cell: (row: any): React.ReactNode => (
        <div>
          <button onClick={() => onDeleteRegistration(row.original.id)}>Delete</button>
          <button onClick={() => onUpdateRegistration(row.original.id, row.original)}>Edit</button>
        </div>
      ),
    },
  ];

  return (
    <ReactTable<TimeRegistrationEntry>
      data={registrations}
      columns={columns}
      minRows={0}
    />
  );
};

export default RegistrationList;
