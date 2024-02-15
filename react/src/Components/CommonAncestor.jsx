import React, { useState } from 'react';
import "./style.css";

const CommonAncestor = () => {
  const [nodeA, setNodeA] = useState('');
  const [nodeB, setNodeB] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const fetchCommonAncestor = async () => {
    if (nodeA.trim() === '' || nodeB.trim() === '') {
      setError('Please enter both Node A ID and Node B ID.');
      setResult(null);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/common_ancestor?a=${nodeA}&b=${nodeB}`);
      if (response.status === 404) {
        setError('Record not found.');
        setResult(null);
        return;
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const ancestors = await response.json();
      if (ancestors && ancestors.data) {
        setResult(ancestors.data);
        setError('');
      } else {
        setError('Ancestor data not found.');
        setResult(null);
      }
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      setResult(null);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Find Common Ancestor</h2>
      <input type="number" min="0" placeholder="Node A ID" value={nodeA} onChange={(e) => setNodeA(e.target.value)} />
      <input type="number" min="0" placeholder="Node B ID" value={nodeB} onChange={(e) => setNodeB(e.target.value)} />
      <button onClick={fetchCommonAncestor}>Find Ancestor</button>
      {error && <p className="error">{error}</p>}
      {result && (
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
              <td className="table-cell">{result.root}</td>
            </tr>
            <tr>
              <td className="table-cell">Lowest Common Ancestor</td>
              <td className="table-cell">{result.lca}</td>
            </tr>
            <tr>
              <td className="table-cell">Depth</td>
              <td className="table-cell">{result.depth}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CommonAncestor;
