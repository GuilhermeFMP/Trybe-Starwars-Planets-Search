import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetchResults from '../hooks/useFetchResults';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const arrayData = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState([]);
  const { fetchResults } = useFetchResults();
  const [options, setOptions] = useState(arrayData);
  const [searchSelect, setSearchSelect] = useState(options[0]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const fetch = await fetchResults();
      setPlanets(fetch);
      setFilter(fetch);
    };
    fetchPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectChange = ({ target: { value } }, optional) => {
    if (optional) {
      optional(value);
      return;
    }
    setSearchSelect(value);
  };

  const filterResults = (name) => {
    const filtered = planets.filter((planet) => (
      planet.name.includes(name)
    ));
    setFilter(filtered);
  };

  const sortResults = (desc, operacao, number) => {
    if (operacao === 'menor que') {
      const filtered = filter.filter((planet) => (
        Number(planet[desc]) < Number(number)
      ));
      setFilter(filtered);
    }
    if (operacao === 'maior que') {
      const filtered = filter.filter((planet) => (
        Number(planet[desc]) > Number(number)
      ));
      setFilter(filtered);
    }
    if (operacao === 'igual a') {
      const filtered = filter.filter((planet) => (
        Number(planet[desc]) === Number(number)
      ));
      setFilter(filtered);
    }
  };

  const renderOptions = (option) => {
    const newOptions = options.filter((op) => (
      op !== option
    ));
    setOptions(newOptions);
    setSearchSelect(newOptions[0]);
  };

  const values = useMemo(() => ({
    planets,
    filter,
    options,
    searchSelect,
    filterResults,
    sortResults,
    renderOptions,
    selectChange,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [planets, filter, options, searchSelect]);

  return (
    <TableContext.Provider value={ values }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;
