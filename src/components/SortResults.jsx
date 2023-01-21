import React, { useState, useContext } from 'react';
import tableContext from '../context/TableContext';

function SortResults() {
  const {
    sortResults,
    options,
    renderOptions,
    searchSelect,
    selectChange,
  } = useContext(tableContext);
  const [expression, setExpression] = useState('maior que');
  const [number, setNumber] = useState(0);

  const handleClick = () => {
    sortResults(searchSelect, expression, number);
    renderOptions(searchSelect);
  };

  const showOptions = () => options.map((opt) => (
    <option key={ opt } value={ opt }>{ opt }</option>
  ));

  return (
    <div>
      <select
        value={ searchSelect }
        data-testid="column-filter"
        onChange={ selectChange }
      >
        { showOptions() }
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
