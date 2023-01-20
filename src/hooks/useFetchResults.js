import apiPlanets from '../services/apiPlanets';

const useFetchResults = () => {
  const fetchResults = async () => {
    const resultados = await apiPlanets();
    resultados.map((planet) => {
      delete planet.residents;
      return planet;
    });
    console.log(resultados);
    return resultados;
  };
  return { fetchResults };
};

export default useFetchResults;
