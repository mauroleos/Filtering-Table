import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { FilteringTable } from "./filteringTable";

const App = () => {
  return (
    <div>
      <FilteringTable />
    </div>
  );
};

const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
