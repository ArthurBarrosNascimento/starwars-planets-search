import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [dataAPI, setDataAPI] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const getPlanetsAPI = async () => {
      const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/').then((response) => response.json()) || [];
      for (let i = 0; i < results.length; i += 1) {
        delete results[i].residents;
      }
      setDataAPI(results);
      setFilteredData(results);
      console.log(results);
    };

    getPlanetsAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(() => ({
    filteredData,
    dataAPI,
    setFilteredData,
  }), [filteredData, dataAPI]);

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
