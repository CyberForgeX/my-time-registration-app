import React from 'react';
import ReactTable, { Column } from 'react-table-6';
import 'react-table-6/react-table.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import { TimeRegistrationEntry, TimeRegistrationFormData } from './types/TimeRegistrationEntry';

interface RegistrationListProps {
  registrations: TimeRegistrationEntry[];
  onDeleteRegistration: (id: string) => Promise<void>;
  onUpdateRegistration: (id: string, formData: TimeRegistrationFormData) => void;
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
      Cell: ({ value }): React.ReactNode => moment(value).format('YYYY-MM-DD'),
    },
    {
      Header: 'Start Time',
      accessor: 'startTime',
      Cell: ({ value }): React.ReactNode => moment(value).format('HH:mm:ss'),
    },
    {
      Header: 'End Time',
      accessor: 'endTime',
      Cell: ({ value }): React.ReactNode => moment(value).format('HH:mm:ss'),
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Actions',
      Cell: ({ original }): React.ReactNode => (
        <div>
          <button onClick={() => onDeleteRegistration(original.id)}>Delete</button>
          <button onClick={() => onUpdateRegistration(original.id, original)}>Edit</button>
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

RegistrationList.propTypes = {
  registrations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  onDeleteRegistration: PropTypes.func.isRequired,
  onUpdateRegistration: PropTypes.func.isRequired,
};

export default RegistrationList;
