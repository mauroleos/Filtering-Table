This is a React projec called Filtering-Table that implements a table with filtering functionality. It displays data fetched from an API and allows the user to filter the data based on selected IP addresses.

Dependencies
The project uses the following dependencies:

React: The main library for building user interfaces in React.
useState: A React hook for managing state.
useEffect: A React hook for handling side effects.
useMemo: A React hook for memoizing values.
useTable: A hook from the react-table library that provides table functionality.
useFilters: A hook from the react-table library for column filtering.
ColumnFilter: A custom filter component for columns.


State
The component uses several state variables to manage the data and user interactions:

data: An array that holds the original data fetched from the API.
filteredData: An array that holds the filtered data based on the selected IP addresses.
selectedIP: An array that stores the currently selected IP addresses.
history: An array that keeps track of the IP address selection history.

useEffect
The project uses the useEffect hook to perform several tasks:

Fetching data: When the component mounts, it fetches data from the "traffic_bytes.json" API and updates the data and filteredData state variables accordingly.
Filtering data: Whenever the selectedIP or data variables change, the component filters the data based on the selected IP addresses and updates the filteredData state variable.
Saving and retrieving selected IP addresses: The component saves the selectedIP array to local storage whenever it changes. On component load, it retrieves the selected IP addresses from local storage if they exist.

Event Handlers
The component defines two event handlers:

handleCellClick: This function is called when a table cell is clicked. It checks if the clicked value is not already selected and not the same as the last value in the history. If the conditions are met, it updates the selectedIP and history state variables.
handleCellContextMenu: This function is called when the context menu (usually triggered by right-clicking) is opened on a table cell. It prevents the default context menu behavior and updates the selectedIP and history state variables to remove the last selected IP address.

Columns
The component defines an array of columns using the useMemo hook. Each column object in the array contains the following properties:

Header: The header text for the column.
accessor: The data accessor for the column.
Cell: A custom cell renderer that displays the cell value and handles click and context menu events. It also calls the corresponding event handlers defined in the component.

Undo Functionality
The component includes an undo function that allows the user to undo the last IP address selection. If there is at least one IP address in the history array, the function removes the last IP address from both the selectedIP and history arrays. If the history array is empty, the function clears both arrays.

Table Rendering
The component uses the useTable hook from the react-table library to create the table and its associated functionality. It sets up the necessary table props, header groups, rows, and prepares the rows for rendering.

User Interface
The component renders a table with the following structure:

The table header contains the column headers.
The table body contains the rows of data.
Each cell in the table body is rendered using the custom Cell component defined in the columns array.
The table is wrapped inside a container div.
The component also renders an "UNDO" button that is initially disabled if there are no selected IP addresses. Clicking the button triggers the undo function.
