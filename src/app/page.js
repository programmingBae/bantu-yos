"use client"; 
import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';


export default function Home() {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    sortData();
  }, [data, sortDirection]);

  async function fetchData() {
    try {
      const response = await fetch('https://api-v2.ppdb.jabarprov.go.id/portal/registrant?page=1&limit=500&orderby=created_at&order=asc&pagination=false&columns[0][key]=name&columns[0][searchable]=false&columns[1][key]=registration_number&columns[1][searchable]=true&filters[0][key]=first_school.npsn&filters[0][value]=20224113&filters[1][key]=option_type&filters[1][value]=zonasi&filters[2][key]=first_option.major_id&filters[2][value]=');
      const jsonData = await response.json();
      setData(jsonData.result.itemsList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }

  async function fetchNewData() {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.ppdb.jabarprov.go.id/portal/registrant?page=1&limit=500&pagination=false&columns[0][key]=name&columns[0][searchable]=true&columns[1][key]=registration_number&columns[1][searchable]=true&filters[0][key]=first_school.npsn&filters[0][value]=20224112&filters[1][key]=option_type&filters[1][value]=zonasi&filters[2][key]=first_option.major_id&filters[2][value]=');
      const newData = await response.json();
      setData(newData.result.itemsList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching new data:', error);
      setIsLoading(false);
    }
  }

  async function fetchNewDataSman3() {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.ppdb.jabarprov.go.id/portal/registrant?page=1&limit=500&pagination=false&columns[0][key]=name&columns[0][searchable]=true&columns[1][key]=registration_number&columns[1][searchable]=true&filters[0][key]=first_school.npsn&filters[0][value]=20224114&filters[1][key]=option_type&filters[1][value]=zonasi&filters[2][key]=first_option.major_id&filters[2][value]=');
      const newData = await response.json();
      setData(newData.result.itemsList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching new data:', error);
      setIsLoading(false);
    }
  }

  async function fetchNewDataSman2() {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.ppdb.jabarprov.go.id/portal/registrant?page=1&limit=500&pagination=false&columns[0][key]=name&columns[0][searchable]=true&columns[1][key]=registration_number&columns[1][searchable]=true&filters[0][key]=first_school.npsn&filters[0][value]=20224139&filters[1][key]=option_type&filters[1][value]=zonasi&filters[2][key]=first_option.major_id&filters[2][value]=');
      const newData = await response.json();
      setData(newData.result.itemsList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching new data:', error);
      setIsLoading(false);
    }
  }



  

  function sortData() {
    const sorted = [...data].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.distance1 - b.distance1;
      } else {
        return b.distance1 - a.distance1;
      }
    });
    setSortedData(sorted);
  }

  function handleSortToggle() {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  }

  function MouseOver(event) {
    event.target.style.background = 'white';
    event.target.style.color = 'black';
  }

  function MouseOut(event){
    event.target.style.background="black";
    event.target.style.color='white';
  }

  return (
   
    <div>
      <h1>SMA SCORE</h1>
      <h2>Please open the website using desktop (laptop, pc, etc) and dont translate the page for the best experience.</h2>
      <div className="button-container" style={{justifyContent: 'space-between'}}>
      <button onMouseOut={MouseOut} onMouseOver={MouseOver} onClick={fetchData} disabled={isLoading} style={{padding: '1rem', backgroundColor: 'black', color: 'white'}}>
          {isLoading ? 'Loading...' : 'SMAN 1'}
        </button>
        <button onMouseOut={MouseOut} onMouseOver={MouseOver} onClick={fetchNewDataSman2} disabled={isLoading} style={{padding: '1rem', backgroundColor: 'black', color: 'white'}}>
          {isLoading ? 'Loading...' : 'SMAN 2'}
        </button>
        <button onMouseOut={MouseOut} onMouseOver={MouseOver} onClick={fetchNewDataSman3} disabled={isLoading} style={{padding: '1rem', backgroundColor: 'black', color: 'white'}}>
          {isLoading ? 'Loading...' : 'SMAN 3'}
        </button>
        <button onMouseOut={MouseOut} onMouseOver={MouseOver} onClick={fetchNewData} disabled={isLoading} style={{padding: '1rem', backgroundColor: 'black', color: 'white'}}>
          {isLoading ? 'Loading...' : 'SMAN 5'}
        </button>
      </div>
      <div className="table-container">
      <table>
        <thead>
          <tr>
          <th>#</th>
            <th>Registration Number</th>
            {/* <th>Distance 1</th>
            <th>Distance 2</th>
            <th>Distance 3</th> */}

            <th>School</th>
            <th>Name</th>
            <th>
              First Option{' '}
              <button onClick={handleSortToggle}>
                {sortDirection === 'asc' ? '↑' : '↓'}
              </button>
              </th>
            <th>Second Option</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
               <td>{index + 1}</td>
              <td>{item.registration_number}</td>
              {/* <td>{item.distance1.toFixed(2)}</td>
              <td>{item.distance2.toFixed(2)}</td>
              <td>
                {item.distance3 === 99999 ? '-' : item.distance3.toFixed(2)}
              </td> */}
              <td>{item.school}</td>
              <td>{item.name}</td>
              <td>{item.first_option.name+' ('+item.distance1+')'}</td>
              <td>{item.second_option?.name+' ('+item.distance2+')'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Analytics />
      </div>
      {data.length === 0 && !isLoading && <p>No data available.</p>}
      {isLoading && <p>Loading data...</p>}
      <style jsx>{`
        .table-container {
          overflow-x: auto;
        }
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
        @media only screen and (max-width: 768px) {
          table {
            font-size: 14px;
          }
          th,
          td {
            padding: 6px;
          }
        }
      `}</style>
    </div>
  );
}
