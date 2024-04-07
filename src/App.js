import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import FinancialDataTable from "./components/FinancialDataTable";
import "./App.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [financialData, setFinancialData] = useState({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState("");
  const [chartType, setChartType] = useState("line");
  const [showDataTable, setShowDataTable] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API key: V6ZSRQWS2AMUTLX7
        const incomeStatementResponse = await axios.get(
          `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo`
        );
        const balanceSheetResponse = await axios.get(
          `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo`
        );

        const netIncome =
          incomeStatementResponse?.data?.quarterlyReports?.map(
            (report) => report.netIncome
          ) || [];
        const totalRevenue =
          incomeStatementResponse?.data?.quarterlyReports?.map(
            (report) => report.totalRevenue
          ) || [];
        const shareholderEquity =
          balanceSheetResponse?.data?.quarterlyReports?.map(
            (report) => report.totalShareholderEquity
          ) || [];
        const labels =
          incomeStatementResponse?.data?.quarterlyReports?.map(
            (report) => report.fiscalDateEnding
          ) || [];

        setFinancialData({
          labels,
          datasets: [
            {
              label: "Net Income",
              data: netIncome,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: netIncome.map(
                () =>
                  `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                    Math.random() * 255
                  )}, ${Math.floor(Math.random() * 255)}, 0.5)`
              ),
              tension: 0.1,
            },
            {
              label: "Total Revenue",
              data: totalRevenue,
              fill: false,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: totalRevenue.map(
                () =>
                  `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                    Math.random() * 255
                  )}, ${Math.floor(Math.random() * 255)}, 0.5)`
              ),
              tension: 0.1,
            },
            {
              label: "Shareholder Equity",
              data: shareholderEquity,
              fill: false,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: shareholderEquity.map(
                () =>
                  `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                    Math.random() * 255
                  )}, ${Math.floor(Math.random() * 255)}, 0.5)`
              ),
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        setError(
          "There was an error fetching the financial data. Please refresh the page."
        );
        console.error("fetchData error: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`app ${theme}`}>
      <h1>Quarterly Financial Data</h1>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark mode" : "Light mode"}
      </button>
      {error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <>
          <div>
            <label htmlFor="chartTypeSelect">Select Chart Type: </label>
            <select
              id="chartTypeSelect"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="line">Line</option>
              <option value="bar">Bar</option>
            </select>
          </div>
          <div>
            <label htmlFor="toggleTable">Show Data Table:</label>
            <input
              id="toggleTable"
              type="checkbox"
              checked={showDataTable}
              onChange={() => setShowDataTable(!showDataTable)}
            />
          </div>
          {chartType === "line" ? (
            <Line data={financialData} />
          ) : (
            <Bar data={financialData} />
          )}
          {showDataTable && (
            <FinancialDataTable
              data={
                financialData.datasets.length > 0
                  ? financialData.datasets[0].data.map((value, index) => ({
                      fiscalDateEnding: financialData.labels[index],
                      netIncome: financialData.datasets[0].data[index],
                      totalRevenue: financialData.datasets[1].data[index],
                      totalShareholderEquity:
                        financialData.datasets[2].data[index],
                    }))
                  : []
              }
              theme={theme}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
