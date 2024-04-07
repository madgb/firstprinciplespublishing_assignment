# First Principal Publishing assignment

React application that fetches historical quarterly financial data for a given stock symbol and plots the data using charts.

## Tech Stack

**Client:** React, Chart.js

**API:** Alpha Vantage API

## Introduction

This project is a React application that fetches historical quarterly financial data for a given stock symbol and plots the data using charts. It is designed to provide users with quick insights into a company's financial performance over time. The application uses the Alpha Vantage API to fetch the financial data and Chart.js to visualize the data.

## Regular Requirements

- **Fetch Historical Data:** The application fetches historical quarterly financial data using the Alpha Vantage API.
- **Data Visualization:** It plots quarterly net income, total revenue, and total shareholder equity from the financial statements on a chart.
- **Error Handling:** Implements error handling for failed API requests, ensuring the application remains user-friendly and informative even when data fetching encounters issues.
- **Responsive Design:** Ensures the application is usable across different devices and screen sizes, providing a consistent user experience.

## Additional Features or Improvements

- **Dynamic Stock Symbol Search:** Users can search for and select the stock symbol of their interest, enhancing user interaction and flexibility.
- **Chart Type Selection:** Provides an option to select between different chart types (e.g., Line, Bar), allowing users to view the data in various formats.
- **Data Table View:** Alongside the chart, the application presents the data in a tabular format, making it easy to read specific values.
- **Dark Mode:** Includes a dark mode feature, reducing eye strain and improving accessibility for users in low-light environments.
- **Save User Settings:** Saves user preferences such as the selected stock symbol, chart type, and theme mode using local storage, providing a personalized experience.

## Running the Project

```bash
  npm install
  npm start
```
