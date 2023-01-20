import React, { useContext, useEffect } from 'react';
import tableContext from '../context/TableContext';
import useChangeInput from '../hooks/useChangeInput';

function FilterInput() {
  const text = useChangeInput('');
  const { filterResults } = useContext(tableContext);

  useEffect(() => {
    filterResults(text.value);
  }, [text.value]);

  return (
    <input
      type="text"
      data-testid="name-filter"
      placeholder="Planet Name"
      value={ text.value }
      onChange={ text.onChange }
    />
  );
}

export default FilterInput;
