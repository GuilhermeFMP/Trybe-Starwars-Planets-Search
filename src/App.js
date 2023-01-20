import React from 'react';
import './App.css';
import FilterInput from './components/FilterInput';
import SortResults from './components/SortResults';
import Table from './components/Table';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <FilterInput />
      <SortResults />
      <Table />
    </TableProvider>
  );
}

export default App;
