import React, { useContext } from 'react';
import tableContext from '../context/TableContext';

function Order() {
  const { orders: { order: { column, sort } },
    sortSelectChange, sortInputChange, sortButtonClick } = useContext(tableContext);
  return (
    <div>
      <select
        value={ column }
        data-testid="column-sort"
        onChange={ sortSelectChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="sort-input-asc">
        Ascendente:
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          name="sort-inputs"
          value="ASC"
          checked={ sort === 'ASC' }
          onChange={ sortInputChange }
        />
      </label>
      <label htmlFor="sort-input-desc">
        Descendente:
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          name="sort-inputs"
          value="DESC"
          checked={ sort === 'DESC' }
          onChange={ sortInputChange }
        />
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ sortButtonClick }
      >
        Ordenar
      </button>
    </div>
  );
}

export default Order;
