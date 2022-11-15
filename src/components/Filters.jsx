import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../context/MyContext';
import { arrayColumn, arrayType } from '../services/data';

function Filters() {
  const { dataAPI, setFilteredData, filteredData } = useContext(MyContext);
  const [typeOperation, setTypeOperation] = useState('maior que');
  const [number, setNumber] = useState('0');
  const [optionColumn, setOptionsColumn] = useState(arrayColumn);
  const [colum, setColumn] = useState('population');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    setColumn(optionColumn[0]);
  }, [optionColumn]);

  const handleListByName = (string) => {
    const resultFiltred = dataAPI.filter((item) => item.name.includes(string));
    setFilteredData(resultFiltred);
  };

  const filterbiggerNum = (type, n, c) => {
    if (type === 'maior que') {
      console.log(column);
      const result = n.filter((item) => Number(item[c]) > Number(number));
      console.log(result);
      return result;
    }
    if (type === 'menor que') {
      const result = n.filter((item) => Number(item[c]) < Number(number));
      return result;
    }

    if (type === 'igual a') {
      const result = n.filter((item) => Number(item[c]) === Number(number));
      return result;
    }
  };

  const handleColumnFiltred = () => {
    const result = optionColumn.filter((item) => item !== colum);
    setOptionsColumn(result);
  };

  const handleFIlterByColum = () => {
    console.log('cheguei no switch');
    switch (typeOperation) {
    case arrayType[0]:
      console.log(`cheguei no maior que ${arrayType[0]}`);
      setFilteredData(filterbiggerNum(arrayType[0], filteredData, colum));
      break;
    case arrayType[1]:
      console.log(`cheguei no menor que ${arrayType[1]}`);
      setFilteredData(filterbiggerNum(arrayType[1], filteredData, colum));
      break;
    default:
      setFilteredData(filterbiggerNum(arrayType[2], filteredData, colum));
      break;
    }
    handleColumnFiltred();
    const objectColumn = {
      column: colum,
      comparison: typeOperation,
      value: number,
    };
    setFilterByNumericValues([...filterByNumericValues, objectColumn]);
  };

  const handleClearFIlters = () => {
    setFilterByNumericValues([]);
    setOptionsColumn(arrayColumn);
    setFilteredData(dataAPI);
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

      <select
        name="column"
        id="column"
        value={ colum }
        onChange={ ({ target }) => setColumn(target.value) }
        data-testid="column-filter"
      >
        {optionColumn.map((columnn) => (
          <option key={ columnn } value={ columnn }>{columnn}</option>
        ))}
      </select>

      <select
        name="type"
        id="type"
        value={ typeOperation }
        onChange={ ({ target }) => setTypeOperation(target.value) }
        data-testid="comparison-filter"
      >
        {arrayType.map((item) => (
          <option key={ item } value={ item }>{item}</option>
        ))}
      </select>

      <label htmlFor="value">
        <input
          name="value"
          id="value"
          type="number"
          data-testid="value-filter"
          value={ number }
          onChange={ ({ target }) => setNumber(target.value) }
        />
      </label>

      <button
        type="button"
        onClick={ () => handleFIlterByColum() }
        data-testid="button-filter"
      >
        Filtrar
      </button>
      { filterByNumericValues.map((item) => (
        <div key={ item.column }>
          <p>{`${item.column}, ${item.comparison}, ${item.value}`}</p>
          <button
            type="button"
            onClick={ () => handleClearFIlters() }
          >
            Excluir
          </button>
        </div>
      )) }
    </div>
  );
}

export default Filters;
