const URL = 'https://swapi.dev/api/planets';

const apiPlanets = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data.results;
};

export default apiPlanets;
