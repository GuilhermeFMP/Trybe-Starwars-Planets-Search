import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from '../../cypress/mocks/testData';

describe('Acessa a aplicação e testa...', () => {
  it('se todos os componentes fixos são renderizados na tela', () => {
    render(<App />);

    const nameFilter = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    const buttonRemoveFilters = screen.getByTestId('button-remove-filters');
    const columnSort = screen.getByTestId('column-sort');
    const columnSortAsc = screen.getByTestId('column-sort-input-asc');
    const columnSortDesc = screen.getByTestId('column-sort-input-desc');
    const columnSortButton = screen.getByTestId('column-sort-button');

    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
    expect(buttonRemoveFilters).toBeInTheDocument();
    expect(columnSort).toBeInTheDocument();
    expect(columnSortAsc).toBeInTheDocument();
    expect(columnSortDesc).toBeInTheDocument();
    expect(columnSortButton).toBeInTheDocument();
  });
  it('o filtro por nome', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByTestId('planet-content')[0]).toBeInTheDocument();
    }, { timeout: 3000 });

    const nameFilter = screen.getByTestId('name-filter');

    userEvent.type(nameFilter, 'Bespin');
    const Bespin = await screen.findByTestId('planet-content');
    expect(Bespin).toHaveTextContent('Bespin');

    userEvent.clear(nameFilter);

    userEvent.type(nameFilter, 'Alderaan');
    const Alderaan = await screen.findByTestId('planet-content');
    expect(Alderaan).toHaveTextContent('Alderaan');
  });
  it('o filtro Maior que', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId('planet-content')[0]).toBeInTheDocument();
    }, { timeout: 5000 });

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '1000000');
    userEvent.click(buttonFilter);

    const planets = screen.getAllByTestId('planet-content');
    expect(planets).toHaveLength(6);
    expect(planets[5]).toHaveTextContent('Kamino');
  });
  it('o filtro Menor que', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId('planet-content')[0]).toBeInTheDocument();
    }, { timeout: 5000 });

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '1000000');
    userEvent.click(buttonFilter);

    const planets = screen.getAllByTestId('planet-content');
    expect(planets).toHaveLength(2);
    expect(planets[0]).toHaveTextContent('Tatooine');
  });
  it('o filtro Igual a', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId('planet-content')[0]).toBeInTheDocument();
    }, { timeout: 5000 });

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '1000');
    userEvent.click(buttonFilter);

    const planets = screen.getAllByTestId('planet-content');
    expect(planets).toHaveLength(1);
    expect(planets[0]).toHaveTextContent('Yavin IV');
  });
  it('o botão para retirar os filtros', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId('planet-content')[0]).toBeInTheDocument();
    }, { timeout: 5000 });

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    const buttonRemoveFilters = screen.getByTestId('button-remove-filters');

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '1000000');
    userEvent.click(buttonFilter);

    const planets = screen.getAllByTestId('planet-content');
    expect(planets).toHaveLength(6);
    
    userEvent.click(buttonRemoveFilters);

    const allPlanets = screen.getAllByTestId('planet-content');
    expect(allPlanets).toHaveLength(10);
  });
  it('se o filtro aparece depois de filtrar', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId('planet-content')[0]).toBeInTheDocument();
    }, { timeout: 5000 });

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '1000000');
    userEvent.click(buttonFilter);

    const planets = screen.getAllByTestId('planet-content');
    expect(planets).toHaveLength(6);

    const filtro = screen.getByTestId('filter');
    expect(filtro).toBeInTheDocument();
  }); 
  it('se o filtro aparece depois de filtrar', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId('planet-content')[0]).toBeInTheDocument();
    }, { timeout: 5000 });

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '1000000');
    userEvent.click(buttonFilter);

    const planets = screen.getAllByTestId('planet-content');
    expect(planets).toHaveLength(6);

    const filtro = screen.getByTestId('filter');
    expect(filtro).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: /excluir/i
    });
    userEvent.click(button);

    const newPlanets = screen.getAllByTestId('planet-content');
    expect(newPlanets).toHaveLength(10);
  });
  it('o filtro Crescente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId('planet-content')[0]).toBeInTheDocument();
    }, { timeout: 5000 });

    const columnSort = screen.getByTestId('column-sort');
    const columnSortAsc = screen.getByTestId('column-sort-input-asc');
    const columnSortButton = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(columnSortAsc);
    userEvent.click(columnSortButton);
    
    const planets = screen.getAllByTestId('planet-content');
    expect(planets).toHaveLength(10);
    expect(planets[0]).toHaveTextContent('Yavin IV');
  });
  it('o filtro Decrescente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId('planet-content')[0]).toBeInTheDocument();
    }, { timeout: 5000 });

    const columnSort = screen.getByTestId('column-sort');
    const columnSortDesc = screen.getByTestId('column-sort-input-desc');
    const columnSortButton = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(columnSortDesc);
    userEvent.click(columnSortButton);
    
    const planets = screen.getAllByTestId('planet-content');
    expect(planets).toHaveLength(10);
    expect(planets[0]).toHaveTextContent('Coruscant');
  });
})
