import React, { useState, useEffect, useMemo } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import { ColumnFilter } from "./ColumnFilter";

export const FilteringTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIP, setSelectedIP] = useState([]);
  const [history, setHistory] = useState([]);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      const response = await fetch("traffic_bytes.json");
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter the data based on the selected IP addresses
    if (selectedIP.length > 0) {
      const filtered = data.filter(
        (row) =>
          row.result.All_Traffic_src === selectedIP[selectedIP.length - 1] ||
          row.result.All_Traffic_dest === selectedIP[selectedIP.length - 1]
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedIP, data]);

  useEffect(() => {
    // Retrieve the selected IP addresses from local storage on page load
    const savedSelectedIP = localStorage.getItem("selectedIP");
    if (savedSelectedIP) {
      setSelectedIP(JSON.parse(savedSelectedIP));
    }
  }, []);

  useEffect(() => {
    // Save the selected IP addresses to local storage
    localStorage.setItem("selectedIP", JSON.stringify(selectedIP));
  }, [selectedIP]);

  const handleCellClick = (value) => {
    // Check if the value is not already in selectedIP and is not the same as the last value in history
    if (
      !selectedIP.includes(value) &&
      (history.length === 0 || value !== history[history.length - 1])
    ) {
      setSelectedIP((ip) => [...ip, value]);
      setHistory((history) => {
        // Check again if the value is not the same as the last value in history before updating
        if (history.length === 0 || value !== history[history.length - 1]) {
          return [...history, value];
        } else {
          return history;
        }
      });
    }
  };

  const handleCellContextMenu = (e) => {
    e.preventDefault();
    setSelectedIP((ip) => ip.slice(0, ip.length - 1));
    setHistory((history) => history.slice(0, history.length - 1));
  };

  const columns = useMemo(
    () => [
      {
        Header: "Source IP",
        accessor: "result.All_Traffic_src",
        Cell: ({ value }) => (
          <span
            className="table-cell"
            onClick={() => handleCellClick(value)}
            onContextMenu={handleCellContextMenu}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Destination IP",
        accessor: "result.All_Traffic_dest",
        Cell: ({ value }) => (
          <span
            className="table-cell"
            onClick={() => handleCellClick(value)}
            onContextMenu={handleCellContextMenu}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Sum Bytes",
        accessor: "result.sum_bytes",
      },
    ],
    []
  );

  const undo = () => {
    if (history.length > 0) {
      // Remove the last IP from the selectedIP and history arrays
      const previousIPs = history.slice(0, history.length - 1);
      setSelectedIP(previousIPs);
      setHistory(previousIPs);
    } else {
      // Clear the selectedIP and history arrays
      setSelectedIP([]);
      setHistory([]);
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable(
    { columns, data: filteredData, defaultColumn },
    useFilters,
    useGlobalFilter
  );

  return (
    <div>
      <div className="container">
        <div className="undo-container">
          <button
            className={`undo-button ${
              selectedIP.length === 0 ? "disabled" : ""
            }`}
            onClick={undo}
            disabled={selectedIP.length === 0}
          >
            UNDO
          </button>
        </div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
