import React, { useState } from 'react';
import useRecordFetch from '../CustomHook/useRecordFetch';
import './style.css';

const Birds = () => {
  const [nodeIds, setNodeIds] = useState('');
  const [inputError, setInputError] = useState(null);

  const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

  const BIRDS_URL = `${BACKEND_BASE_URL}/birds?ids=${nodeIds}`;

  const { record: birds, error, fetchRecord } = useRecordFetch(BIRDS_URL);

  const handleFetchBirds = () => {
    if (nodeIds.trim() === '') {
      setInputError('Please enter node IDs before finding birds.');
      return;
    }
    fetchRecord();
  };

  return (
    <div className="container">
      <h2 className="title">Find Birds</h2>
      <input type="text" placeholder="Node IDs (comma-separated)" value={nodeIds} onChange={(e) => setNodeIds(e.target.value)} />
      <button onClick={handleFetchBirds}>Find Birds</button>
      {error && <p className="error">{error}</p>}
      {inputError && <p className="error">{inputError}</p>}
      {birds && birds.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th className="table-heading">Node</th>
              <th className="table-heading">Birds</th>
            </tr>
          </thead>
          <tbody>
            {birds.map(({ node, birds }) => (
              <tr key={node}>
                <td className="table-cell">{node}</td>
                <td className="table-cell">{birds?.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Birds;
