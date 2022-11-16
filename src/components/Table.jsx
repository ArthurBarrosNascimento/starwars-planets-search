import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { filteredData } = useContext(MyContext);

  const titleTable = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];

  return (
    <table>
      <thead>
        <tr>
          { titleTable.map((title) => <th key={ title }>{title}</th>)}
        </tr>
      </thead>

      <tbody>
        { filteredData.map((e) => (
          <tr key={ e.name }>
            <td data-testid="planet-name">{e.name}</td>
            <td>{e.rotation_period}</td>
            <td>{e.orbital_period}</td>
            <td>{e.diameter}</td>
            <td>{e.climate}</td>
            <td>{e.gravity}</td>
            <td>{e.terrain}</td>
            <td>{e.surface_water}</td>
            <td>{e.population}</td>
            <td>{e.films.map((link) => link)}</td>
            <td>{e.created}</td>
            <td>{e.edited}</td>
            <td>{e.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
