import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [cells, setCells] = useState(Array(10).fill().map(() => Array(10).fill("")));

  const updateCell = (row, col, value) => {
    const newCells = [...cells];
    newCells[row][col] = value;
    setCells(newCells);
  };

  const handleFormula = (row, col, value) => {
    if (value.startsWith("=")) {
      try {
        const formula = value.slice(1).toUpperCase();
        const result = eval(formula.replace(/[A-Z][0-9]+/g, match => {
          const [col, row] = [match.charCodeAt(0) - 65, parseInt(match.slice(1)) - 1];
          return cells[row][col] || 0;
        }));
        updateCell(row, col, result);
      } catch (error) {
        alert("Invalid Formula");
      }
    } else {
      updateCell(row, col, value);
    }
  };

  return (
    <div className="App">
      <table>
        <tbody>
          {cells.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    value={cells[rowIndex][colIndex]}
                    onChange={(e) => handleFormula(rowIndex, colIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

