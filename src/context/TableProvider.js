import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetchResults from '../hooks/useFetchResults';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState([]);
  const { fetchResults } = useFetchResults();

  useEffect(() => {
    const fetchPlanets = async () => {
      const fetch = await fetchResults();
      setPlanets(fetch);
      setFilter(fetch);
    };
    fetchPlanets();
  }, []);

  const filterResults = (name) => {
    const filtered = planets.filter((planet) => (
      planet.name.includes(name)
    ));
    setFilter(filtered);
  };

  const values = useMemo(() => ({
    planets, filter, filterResults,
  }), [planets, filter]);

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
