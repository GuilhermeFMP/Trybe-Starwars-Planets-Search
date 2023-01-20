import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetchResults from '../hooks/useFetchResults';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const { fetchResults } = useFetchResults();

  useEffect(() => {
    const fetchPlanets = async () => {
      const fetch = await fetchResults();
      setPlanets(fetch);
    };
    fetchPlanets();
  }, []);

  const values = useMemo(() => ({
    planets,
  }), [planets]);

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
