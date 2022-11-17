import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import planets from './testData';
import userEvent from '@testing-library/user-event';


describe('testando se o App',() => {
  beforeEach(() => {
    global.fetch=jest.fn( async () =>  ({
      json: async () => planets
    }))
  })
  test('Testando se ao renderizar o App o componente Filter é renderizado', () => {
    render(<App />)
    const inputName = screen.getByTestId('name-filter');
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const btnRemoveFilters = screen.getByTestId('button-remove-filters');

    expect(inputName).toBeInTheDocument();
    expect(selectColumn).toBeInTheDocument();
    expect(selectComparison).toBeInTheDocument();
    expect(inputNumber).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
    expect(btnRemoveFilters).toBeInTheDocument();

  })
  test('exibe', async () => {
    render(<App />)
    const namesPlanets = await screen.findAllByTestId('planet-name')

    expect(namesPlanets[0]).toBeInTheDocument();
    expect(namesPlanets[0]).toHaveTextContent('Tatooine');
    
  })
  test('Testando se ao digitar no inputName "oo" a função é executada', async () => {
    render(<App />)
    const namesPlanets = await screen.findAllByTestId('planet-name');
    expect(namesPlanets).toHaveLength(10);
    const inputName = screen.getByTestId('name-filter');
    userEvent.type(inputName, 'oo')
    const namesPlanetsFiltred = await screen.findAllByTestId('planet-name');

    expect(namesPlanetsFiltred).toHaveLength(2);
  })
  test('Testando se App filtra por Maior que', async () => {
    render(<App />)

    const namesPlanets = await screen.findAllByTestId('planet-name');
    expect(namesPlanets).toHaveLength(10);

    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(selectColumn, 'diameter')
    userEvent.selectOptions(selectComparison, 'maior que')
    userEvent.type(inputNumber, '8900')
    
    userEvent.click(btnFilter)

    const namesPlanetsFiltred = await screen.findAllByTestId('planet-name');

    expect(namesPlanetsFiltred).toHaveLength(7);

    
    const btnClearFilter = screen.getAllByText('X')
    
    userEvent.click(btnClearFilter[0])

    const btnRemoveFilters = screen.getByTestId('button-remove-filters');

    userEvent.click(btnRemoveFilters)

    expect(namesPlanets).toHaveLength(10);

  })
  test('Testando se App filtra por Menor que', async () => {
    render(<App />)
    const namesPlanets = await screen.findAllByTestId('planet-name');
    expect(namesPlanets).toHaveLength(10);

    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const btnRemoveFilters = screen.getByTestId('button-remove-filters');
    // const btnClearFilter = screen.getAllByText('X')
    
    userEvent.click(btnRemoveFilters)
    userEvent.selectOptions(selectColumn, 'diameter')
    userEvent.selectOptions(selectComparison, 'menor que')
    userEvent.type(inputNumber, '8900')
    
    userEvent.click(btnFilter)

    const namesPlanetsFiltred = await screen.findAllByTestId('planet-name');

    expect(namesPlanetsFiltred).toHaveLength(2);


  })
  // test('Testando se App filtra por Igual a', async() => {
  //   render(<App />)

  //   const namesPlanets = await screen.findAllByTestId('planet-name');
  //   expect(namesPlanets).toHaveLength(10);

  //   const selectColumn = screen.getByTestId('column-filter');
  //   const selectComparison = screen.getByTestId('comparison-filter');
  //   const inputNumber = screen.getByTestId('value-filter');
  //   const btnFilter = screen.getByTestId('button-filter');
  //   const btnRemoveFilters = screen.getByTestId('button-remove-filters');
  //   // const btnClearFilter = screen.getAllByText('X')
    
  //   userEvent.click(btnRemoveFilters)
  //   userEvent.selectOptions(selectColumn, 'population')
  //   userEvent.selectOptions(selectComparison, 'menor que')
  //   userEvent.type(inputNumber, '1000000')
    
  //   userEvent.click(btnFilter)

  //   const namesPlanetsFiltred = await screen.findAllByTestId('planet-name');

  //   expect(namesPlanetsFiltred).toHaveLength(3);

  //   userEvent.click(btnRemoveFilters)
  //   userEvent.selectOptions(selectColumn, 'population')
  //   userEvent.selectOptions(selectComparison, 'menor que')
  //   userEvent.type(inputNumber, '1000000')
    
  //   userEvent.click(btnFilter)

  //   const namesPlanetsFiltred2 = await screen.findAllByTestId('planet-name');

  //   expect(namesPlanetsFiltred2).toHaveLength(3);
    

  // })

  test('Testando se App se renderiza o defalt', async () => {
    render(<App />)
    const namesPlanets = await screen.findAllByTestId('planet-name');
    expect(namesPlanets[0]).toBeInTheDocument()
    expect(namesPlanets).toHaveLength(10);
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    
    userEvent.selectOptions(selectColumn, 'rotation_period')
    userEvent.selectOptions(selectComparison, 'igual a' )
    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '23')
    
    userEvent.click(btnFilter)

    const namesPlanetsFiltred = await screen.findAllByTestId('planet-name');

    expect(namesPlanetsFiltred).toHaveLength(3);

  })
})
describe('Testando fetch',() => {
  beforeEach(() => {
    global.fetch=jest.fn( async () =>  ({
      json: async () => null
    }))
  })
  test('test', () => {  
    render(<App />)

    const namesPlanetsFiltred = screen.queryAllByTestId('planet-name');

    expect(namesPlanetsFiltred).toHaveLength(0);
  })
})