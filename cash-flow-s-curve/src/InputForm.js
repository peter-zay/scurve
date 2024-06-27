import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const InputForm = () => {
  const [firstValue, setFirstValue] = useState('');
  const [duration, setDuration] = useState('');
  const [totalProjectValue, setTotalProjectValue] = useState('');
  const [sCurveValues, setSCurveValues] = useState([]);
  const chartRef = useRef(null);

  const calculateSCurve = () => {
    if (firstValue && duration && totalProjectValue) {
      const monthlyValue = firstValue / duration;
      const calculatedSCurveValues = Array.from({ length: duration }, (_, index) => (index + 1) * monthlyValue);
      setSCurveValues(calculatedSCurveValues);

      // Update Chart data
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: Array.from({ length: duration }, (_, index) => index + 1),
            datasets: [{
              label: 'S-Curve Values',
              data: calculatedSCurveValues,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }
        });
      }
    }
  };

  useEffect(() => {
    if (sCurveValues.length > 0) {
      calculateSCurve();
    }
  }, [sCurveValues]);

  return (
    <div>
      <label htmlFor="firstValue">First Value:</label>
      <input id="firstValue" type="number" value={firstValue} onChange={(e) => setFirstValue(e.target.value)} />

      <label htmlFor="duration">Duration (in months):</label>
      <input id="duration" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />

      <label htmlFor="totalProjectValue">Total Project Value:</label>
      <input id="totalProjectValue" type="number" value={totalProjectValue} onChange={(e) => setTotalProjectValue(e.target.value)} />

      <button onClick={calculateSCurve}>Calculate S-Curve</button>

      {/* Display S-Curve graph */}
      <canvas ref={chartRef}></canvas>

      {/* Display table of calculated S-Curve points */}
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>S-Curve Value</th>
          </tr>
        </thead>
        <tbody>
          {sCurveValues.map((value, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{value}</td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td>{sCurveValues.reduce((acc, value) => acc + value, 0)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InputForm;
