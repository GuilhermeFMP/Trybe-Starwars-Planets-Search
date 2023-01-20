import React from 'react';
import './App.css';
import FilterInput from './components/FilterInput';
import Table from './components/Table';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <FilterInput />
      <Table />
    </TableProvider>
  );
}

export default App;
