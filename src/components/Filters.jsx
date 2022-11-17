import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import { arrayType } from '../services/data';

function Filters() {
  const {
    dataAPI,
    setFilteredData,
    columnOptions,
    column,
    setColumn,
    comparison,
    number,
    setNumber,
    setComparison,
    filter,
    MountObjectFilter,
    removeFilter,
    cleanAllFilters,
  } = useContext(MyContext);

  const setNameState = (string) => {
    const result = dataAPI.filter((item) => item.name.includes(string));
    setFilteredData(result);
  };

  return (
    <div>
      <label htmlFor="name">
        <input
          type="text"
          data-testid="name-filter"
          onChange={ ({ target }) => setNameState(target.value) }
        />
      </label>

      <div>
        <select
          name=""
          id=""
          value={ column }
          onChange={ ({ target }) => setColumn(target.value) }
          data-testid="column-filter"
        >
          {columnOptions.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
        </select>

        <select
          name="type"
          id="type"
          value={ comparison }
          onChange={ ({ target }) => setComparison(target.value) }
          data-testid="comparison-filter"
        >
          {arrayType.map((type) => (
            <option key={ type } value={ type }>{type}</option>
          ))}
        </select>

        <label htmlFor="number">
          <input
            type="number"
            value={ number }
            onChange={ ({ target }) => setNumber(target.value) }
            data-testid="value-filter"
          />
        </label>

        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => MountObjectFilter(column) }
        >
          Filtrar
        </button>

        <button
          type="button"
          onClick={ () => cleanAllFilters() }
          data-testid="button-remove-filters"
        >
          Remover todas filtragens
        </button>

      </div>
      {filter.map((f, i) => (
        <div key={ i } data-testid="filter">
          {f.filterColumn}
          {' '}
          {f.filterComparison}
          {' '}
          {f.filterNumber}
          <button
            type="button"
            onClick={ () => removeFilter(f.filterColumn) }
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default Filters;
