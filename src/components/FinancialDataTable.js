import React from 'react';
import "./FinancialDataTable.css";

function FinancialDataTable({ data, theme }) {
  return (
    <table className={`table ${theme}`}>
      <thead>
        <tr>
          <th>Fiscal Date Ending</th>
          <th>Net Income</th>
          <th>Total Revenue</th>
          <th>Shareholder Equity</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.fiscalDateEnding}</td>
            <td>{row.netIncome}</td>
            <td>{row.totalRevenue}</td>
            <td>{row.totalShareholderEquity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FinancialDataTable;
