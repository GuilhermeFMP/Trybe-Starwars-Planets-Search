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
  const [listFilter, setListFilter] = useState([]);
  const [objFil, setObjFil] = useState([]);
  const [orders, setOrder] = useState({ order:
    { column: 'population', sort: 'ASC' } });

  useEffect(() => {
    const fetchPlanets = async () => {
      const fetch = await fetchResults();
      setPlanets(fetch);
      setFilter(fetch);
    };
    fetchPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectChange = ({ target: { value } }) => {
    setSearchSelect(value);
  };

  const sortSelectChange = ({ target: { value } }) => {
    setOrder({
      order: {
        ...orders.order,
        column: value,
      },
    });
  };

  const sortInputChange = ({ target: { value } }) => {
    setOrder({
      order: {
        ...orders.order,
        sort: value,
      },
    });
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
    const deletedOptions = options.filter((op) => (
      op === option
    ));
    setListFilter([...listFilter, deletedOptions]);
    setOptions(newOptions);
    setSearchSelect(newOptions[0]);
  };

  const buttonRenewal = (option, newObj) => {
    const att = [...objFil, newObj];
    setObjFil(att);
    console.log(objFil);
    const newFilter = listFilter.filter((fil) => (
      fil !== option
    ));
    console.log(newFilter);
    const newsObj = objFil.filter((obj) => (
      obj.desc !== option
    ));
    console.log(newsObj);
    setFilter(planets);
    if (newsObj.length === 0) {
      setObjFil([]);
    }
    setObjFil(newsObj);
    newsObj.forEach((reFilter) => (
      sortResults(reFilter.desc, reFilter.operacao, reFilter.number)
    ));
    setListFilter(newFilter);
    setOptions([...options, option]);
  };

  const removeAllFilters = () => {
    setFilter(planets);
    setOptions(arrayData);
    setSearchSelect(options[0]);
    setListFilter([]);
  };

  const sortButtonClick = () => {
    const { order: { column, sort } } = orders;
    const planetsSort = filter.sort((A, B) => {
      const numA = +A[column];
      const numB = +B[column];
      const AFTER = 1;
      const BEFORE = -1;
      if (A[column] === 'unknown') {
        return AFTER;
      }
      if (B[column] === 'unknown') {
        return BEFORE;
      }
      if (sort === 'ASC') return numA - numB;
      return numB - numA;
    });
    setOrder({
      order: {
        ...orders.order,
        sort,
      },
    });
    setFilter(planetsSort);
  };

  const values = useMemo(() => ({
    planets,
    filter,
    options,
    searchSelect,
    listFilter,
    objFil,
    orders,
    filterResults,
    sortResults,
    renderOptions,
    selectChange,
    buttonRenewal,
    removeAllFilters,
    sortSelectChange,
    sortInputChange,
    sortButtonClick,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [planets, filter, options, searchSelect, listFilter, objFil, orders]);

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
