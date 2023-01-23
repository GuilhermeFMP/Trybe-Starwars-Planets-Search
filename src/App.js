import React from 'react';
import './App.css';
import FilterInput from './components/FilterInput';
import Order from './components/Order';
import SortResults from './components/SortResults';
import Table from './components/Table';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <FilterInput />
      <SortResults />
      <Order />
      <Table />
    </TableProvider>
  );
}

export default App;
