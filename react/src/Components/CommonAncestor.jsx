import React, { useState } from 'react';
import useRecordFetch from '../CustomHook/useRecordFetch';
import './style.css';

const CommonAncestor = () => {
  const [nodeA, setNodeA] = useState('');
  const [nodeB, setNodeB] = useState('');
  const [inputError, setInputError] = useState(null);

  const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

  const COMMON_ANCESTORS_URL = `${BACKEND_BASE_URL}/common_ancestor?a=${nodeA}&b=${nodeB}`;
  
  const { record: ancestors, error, fetchRecord } = useRecordFetch(COMMON_ANCESTORS_URL);

  const handleFetchCommonAncestor = () => {
    if (nodeA.trim() === '' || nodeB.trim() === '') {
      setInputError('Please enter both Node A ID and Node B ID.');
      return;
    }
    fetchRecord();
  };

  return (
    <div className="container">
      <h2 className="title">Find Common Ancestor</h2>
      <input type="number" min="0" placeholder="Node A ID" value={nodeA} onChange={(e) => setNodeA(e.target.value)} />
      <input type="number" min="0" placeholder="Node B ID" value={nodeB} onChange={(e) => setNodeB(e.target.value)} />
      <button onClick={handleFetchCommonAncestor}>Find Ancestor</button>
      {error && <p className="error">{error}</p>}
      {inputError && <p className="error">{inputError}</p>}
      {ancestors && (
        <table className="table">
          <thead>
            <tr>
              <th className="table-heading">Attribute</th>
              <th className="table-heading">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-cell">Root ID</td>
              <td className="table-cell">{ancestors.root}</td>
            </tr>
            <tr>
              <td className="table-cell">Lowest Common Ancestor</td>
              <td className="table-cell">{ancestors.lca}</td>
            </tr>
            <tr>
              <td className="table-cell">Depth</td>
              <td className="table-cell">{ancestors.depth}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CommonAncestor;
