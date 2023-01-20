import React, { useState, useContext } from 'react';
import tableContext from '../context/TableContext';

function SortResults() {
  const { sortResults } = useContext(tableContext);
  const [category, setCategory] = useState('population');
  const [expression, setExpression] = useState('maior que');
  const [number, setNumber] = useState(0);

  const handleClick = () => {
    sortResults(category, expression, number);
  };

  return (
    <div>
      <select
        value={ category }
        data-testid="column-filter"
        onChange={ ({ target: { value } }) => setCategory(value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        value={ expression }
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => setExpression(value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        value={ number }
        data-testid="value-filter"
        type="number"
        onChange={ ({ target: { value } }) => setNumber(value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default SortResults;
