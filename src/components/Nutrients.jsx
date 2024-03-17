import React, { useState } from 'react';
import axios from 'axios';

const Nutrients = () => {
  const [query, setQuery] = useState('');
  const [nutrientsList, setNutrientsList] = useState([]);
  const [totalNutrients, setTotalNutrients] = useState({});

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
        headers: {
          'X-Api-Key': 'A0oIhGOq326buq/cYSizhg==C8vV7eshQH7D4NBC'
        }
      });

      // Update nutrients list with new data
      setNutrientsList(prevList => [...prevList, response.data[0]]);
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  // Calculate total nutrients
  React.useEffect(() => {
    const calculateTotalNutrients = () => {
      const total = {};
      nutrientsList.forEach(nutrient => {
        for (const [key, value] of Object.entries(nutrient)) {
          total[key] = (total[key] || 0) + value;
        }
      });
      setTotalNutrients(total);
    };

    calculateTotalNutrients();
  }, [nutrientsList]);

  return (
    <>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter your food query"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
          <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Search</button>
        </form>
      </div>
      {nutrientsList.length > 0 && (
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">Nutrients:</h2>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Nutrient</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {nutrientsList.map((nutrient, index) => (
                <tr key={index}>
                  {Object.entries(nutrient).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <td className="border px-4 py-2">{key}</td>
                      <td className="border px-4 py-2">{value}</td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h2 className="text-lg font-bold mb-2 mt-4">Total Nutrients:</h2>
            <table className="table-auto">
              <tbody>
                {Object.entries(totalNutrients).map(([key, value]) => (
                  <tr key={key}>
                    <td className="border px-4 py-2 font-bold">{key}</td>
                    <td className="border px-4 py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Nutrients;
