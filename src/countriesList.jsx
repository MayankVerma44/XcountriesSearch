import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError(err.message);
      }
    };

    fetchCountries();
  }, []);

  // Handle input change to update the search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter countries based on search term
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If there's an error, display the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="country-container">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="country-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.cca3} className="countryCard">
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="country-flag"
              />
              <p>{country.name.common}</p>
            </div>
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    </div>
  );
};

export default CountriesList;
