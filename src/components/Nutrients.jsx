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

  // Optimal nutrient amounts range for a day
  const optimalNutrients = {
    Calories: { min: 1800, max: 2200 },
    'Total Fat': { min: 45, max: 70 },
    Protein: { min: 45, max: 65 },
    Cholesterol: { min: 250, max: 350 },
    'Total Carbohydrates': { min: 280, max: 320 },
    Sugar: { min: 5, max: 30 },
  };

  // Calculate total nutrients
  React.useEffect(() => {
    const calculateTotalNutrients = () => {
      const total = {};
      nutrientsList.forEach(nutrient => {
        for (const [key, value] of Object.entries(nutrient)) {
          if (key === 'name' || key === 'serving_size_g' || key === 'fat_saturated_g' || key === 'sodium_mg' || key === 'fiber_g' || key === 'potassium_mg') continue; // Exclude specified fields
          const nutrientName = getNutrientName(key);
          total[nutrientName] = (total[nutrientName] || 0) + value;
        }
      });
      setTotalNutrients(total);
    };

    calculateTotalNutrients();
  }, [nutrientsList]);

  // Function to map key names to generic nutrient names
  const getNutrientName = (key) => {
    switch (key) {
      case 'calories':
        return 'Calories';
      case 'fat_total_g':
        return 'Total Fat';
      case 'protein_g':
        return 'Protein';
      case 'cholesterol_mg':
        return 'Cholesterol';
      case 'carbohydrates_total_g':
        return 'Total Carbohydrates';
      case 'sugar_g':
        return 'Sugar';
      case 'name':
        return 'Name';
      default:
        return key; // Return the key itself if not specified above
    }
  };

  // Function to determine if value falls within optimal range
  const isOptimal = (nutrientName, value) => {
    const range = optimalNutrients[nutrientName];
    return value >= range.min && value <= range.max;
  };

  return (
    <div className="container mx-auto">
      <div className="p-4">
        <form onSubmit={handleSubmit} className="mb-4 flex items-center">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter your food query"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 flex-grow"
          />
          <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Search</button>
        </form>
      </div>
      {nutrientsList.length > 0 && (
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">Nutrients:</h2>
          <div className="overflow-x-auto">
            <table className="table-auto min-w-max">
              <thead>
                <tr>
                  {/* Display keys as headings for all the foods */}
                  {Object.keys(nutrientsList[0]).map((key, index) => (
                    key !== 'fat_saturated_g' && key !== 'sodium_mg' && key !== 'fiber_g' && key !== 'potassium_mg' && (
                      <th key={index} className="px-4 py-2">{getNutrientName(key)}</th>
                    )
                  ))}
                </tr>
              </thead>
              <tbody>
                {nutrientsList.map((nutrient, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    {Object.entries(nutrient).map(([key, value]) => {
                      if (key === 'fat_saturated_g' || key === 'sodium_mg' || key === 'fiber_g' || key === 'potassium_mg') return null; // Exclude specified fields
                      return (
                        <td key={key} className="border px-4 py-2">{value}</td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2 mt-4">Total Nutrients:</h2>
            <div className="overflow-x-auto">
              <table className="table-auto min-w-max">
                <tbody>
                  {Object.entries(totalNutrients).map(([key, value]) => {
                    if (key === 'fat_saturated_g' || key === 'sodium_mg' || key === 'fiber_g' || key === 'potassium_mg') return null; // Exclude specified fields
                    const nutrientName = getNutrientName(key);
                    const range = optimalNutrients[nutrientName];
                    const isInRange = isOptimal(nutrientName, value);
                    return (
                      <tr key={key}>
                        <td className={`border px-4 py-2 font-bold ${isInRange ? 'bg-green-200' : 'bg-red-200'}`}>{nutrientName}</td>
                        <td className={`border px-4 py-2 ${isInRange ? 'bg-green-200' : 'bg-red-200'}`}>{value}</td>
                        <td className="border px-4 py-2">{isInRange ? 'Optimal' : `Optimal Range: ${range.min} - ${range.max}`}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nutrients;
