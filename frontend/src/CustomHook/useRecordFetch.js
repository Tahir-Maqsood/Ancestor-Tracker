import { useState } from 'react';
import axios from 'axios';

const useRecordFetch = (url) => {
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);

  const fetchRecord = async () => {
    setError(null);
    try {
      const response = await axios.get(url);
      setRecord(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Record not found.');
      } else {
        setError(error.message || 'Failed to fetch data');
      }
    }
  };

  return { record, error, fetchRecord };
};

export default useRecordFetch;
