import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const { dataAPI, setFilteredData } = useContext(MyContext);

  const handleListByName = (string) => {
    const resultFiltred = dataAPI.filter((item) => item.name.includes(string));
    setFilteredData(resultFiltred);
  };

  return (
    <div>
      <label htmlFor="name">
        <input
          type="text"
          name="name"
          id="name"
          onChange={ ({ target }) => handleListByName(target.value) }
          data-testid="name-filter"
        />
      </label>
    </div>
  );
}

export default Filters;
