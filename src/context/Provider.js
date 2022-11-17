/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { arrayColumn, arrayType } from '../services/data';
import MyContext from './MyContext';

function Provider({ children }) {
  const [dataAPI, setDataAPI] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState('0');
  const [columnOptions, setColumnOptions] = useState([]);
  const [filter, setFilters] = useState([]);
  const [filterOn, setFilterOn] = useState(false);

  useEffect(() => {
    setColumnOptions(arrayColumn);
    const getPlanetsAPI = async () => {
      const { results } = await fetch('https://swapi.dev/api/planets').then((response) => response.json()) || { results: [] };
      for (let i = 0; i < results.length; i += 1) {
        delete results[i].residents;
      }
      setDataAPI(results);
      setFilteredData(results);
    };

    getPlanetsAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterByObjectFilter = useCallback(() => {
    filter.forEach((fil) => {
      switch (fil.filterComparison) {
      case arrayType[0]:
        setFilteredData(filteredData
          .filter((item) => item[fil.filterColumn] > Number(fil.filterNumber)));
        break;
      case arrayType[1]:
        setFilteredData(filteredData
          .filter((item) => item[fil.filterColumn] < Number(fil.filterNumber)));
        break;
      default:
        setFilteredData(filteredData
          .filter((item) => item[fil.filterColumn] === (fil.filterNumber)));
        break;
      }
    });
    setFilterOn(false);
  }, [filteredData, filter]);

  useEffect(() => {
    if (filterOn) {
      filterByObjectFilter();
    }
  }, [filter, filterOn, filterByObjectFilter]);

  const handleColumnOption = (value) => {
    const result = columnOptions.filter((item) => item !== value);
    setColumnOptions(result);
  };

  const MountObjectFilter = useCallback((value) => {
    setFilters((prevState) => [
      ...prevState,
      {
        filterColumn: column,
        filterComparison: comparison,
        filterNumber: number,
      },
    ]);
    setFilterOn(true);
    handleColumnOption(value);
  }, [column, comparison, number]);

  useEffect(() => setColumn(columnOptions[0]), [columnOptions]);

  const removeFilter = useCallback((value) => {
    setFilters(filter.filter((f) => f.filterColumn !== value));
    columnOptions.push(value);
    setFilteredData(dataAPI);
    setFilterOn(true);
  }, [filter, dataAPI]);

  const cleanAllFilters = () => {
    setFilteredData(dataAPI);
    setFilters([]);
    setColumnOptions(arrayColumn);
  };

  const contextValue = useMemo(() => ({
    dataAPI,
    filteredData,
    setFilteredData,
    column,
    setColumn,
    comparison,
    setComparison,
    number,
    setNumber,
    columnOptions,
    filter,
    MountObjectFilter,
    removeFilter,
    cleanAllFilters,
  }), [filteredData, dataAPI, column, comparison, number, MountObjectFilter, filter,
    columnOptions, removeFilter]);

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf().isRequired,
};

export default Provider;
