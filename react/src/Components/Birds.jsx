import React, { useState } from 'react';
import "./style.css";

const Birds = () => {
  const [nodeIds, setNodeIds] = useState('');
  const [birds, setBirds] = useState([]);
  const [error, setError] = useState('');

  const fetchBirds = async () => {
    if (nodeIds.trim() === '') {
      setError('Please enter node IDs before finding birds.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/birds?ids=${nodeIds}`);

      if (response.status === 404) {
        setError('Record not found.');
        setBirds([]);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch birds');
      }

      const data = await response.json();
      setBirds(data.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch birds');
      setBirds([]);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Find Birds</h2>
      <input type="text" placeholder="Node IDs (comma-separated)" value={nodeIds} onChange={(e) => setNodeIds(e.target.value)} />
      <button onClick={fetchBirds}>Find Birds</button>
      {error && <p className="error">{error}</p>}
      {birds.length > 0 && (
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
