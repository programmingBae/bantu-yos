"use client"; 
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    sortData();
  }, [data, sortDirection]);

  async function fetchData() {
    try {
      const response = await fetch('https://api.ppdb.jabarprov.go.id/portal/registrant?page=1&limit=200&pagination=false&orderby=created_at&order=asc&columns[0][key]=name&columns[0][searchable]=true&columns[1][key]=registration_number&columns[1][searchable]=true&filters[0][key]=first_school.npsn&filters[0][value]=20224113&filters[1][key]=option_type&filters[1][value]=prestasi-rapor&filters[2][key]=first_option.major_id&filters[2][value]=');
      const jsonData = await response.json();
      setData(jsonData.result.itemsList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function sortData() {
    const sorted = [...data].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });
    setSortedData(sorted);
  }

  function handleSortToggle() {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  }

  return (
    <div>
      <h1>SMANSA SCORE</h1>
      <table>
        <thead>
          <tr>
            <th>Registration Number</th>
            {/* <th>Distance 1</th>
            <th>Distance 2</th>
            <th>Distance 3</th> */}
            <th>
              Score{' '}
              <button onClick={handleSortToggle}>
                {sortDirection === 'asc' ? '↑' : '↓'}
              </button>
            </th>
            <th>School</th>
            <th>Name</th>
            <th>First Option</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>{item.registration_number}</td>
              {/* <td>{item.distance1.toFixed(2)}</td>
              <td>{item.distance2.toFixed(2)}</td>
              <td>
                {item.distance3 === 99999 ? '-' : item.distance3.toFixed(2)}
              </td> */}
              <td>{item.score.toFixed(2)}</td>
              <td>{item.school}</td>
              <td>{item.name}</td>
              <td>{item.first_option.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && <p>Loading data...</p>}
      <style jsx>{`
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th,
        td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
        button {
          border: none;
          background-color: transparent;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
