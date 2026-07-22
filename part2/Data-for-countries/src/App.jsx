import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY

  // Fetch all countries on mount
  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch countries')
        }
        return response.json()
      })
      .then(data => {
        setAllCountries(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Filter countries based on search input
  useEffect(() => {
    if (search.length === 0) {
      setCountries([])
      return
    }

    const filtered = allCountries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    setCountries(filtered)
  }, [search, allCountries])

  // Fetch weather for selected country's capital
  useEffect(() => {
    const countryToFetch = selectedCountry || (countries.length === 1 ? countries[0] : null)

    if (!countryToFetch || !countryToFetch.capital || !weatherApiKey) {
      setWeatherData(null)
      return
    }

    const capitalCity = countryToFetch.capital[0]
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&units=metric&appid=${weatherApiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          setWeatherData(data)
        } else {
          setWeatherData(null)
        }
      })
      .catch(() => {
        setWeatherData(null)
      })
  }, [selectedCountry, countries, weatherApiKey])

  return (
    <div className="container">
      <div className="search-box">
        <label htmlFor="search">find countries </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter country name"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && countries.length === 0 && <p>{error}</p>}

      {countries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {countries.length > 1 && countries.length <= 10 && !selectedCountry && (
        <div className="country-list">
          {countries.map((country) => (
            <div key={country.cca2} className="country-item">
              <span className="country-name">{country.name.common}</span>
              <button
                onClick={() => setSelectedCountry(country)}
                className="show-button"
              >
                Show
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedCountry && (
        <div className="country-details">
          <button
            onClick={() => setSelectedCountry(null)}
            className="back-button"
          >
            Back
          </button>
          <h1>{selectedCountry.name.common}</h1>

          <div className="country-info">
            <p><strong>Capital:</strong> {selectedCountry.capital?.[0] || 'N/A'}</p>
            <p><strong>Area:</strong> {selectedCountry.area?.toLocaleString()} km²</p>
          </div>

          {selectedCountry.languages && Object.keys(selectedCountry.languages).length > 0 && (
            <div className="languages">
              <h2>Languages</h2>
              <ul>
                {Object.values(selectedCountry.languages).map((lang, idx) => (
                  <li key={idx}>{lang}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedCountry.flags?.png && (
            <div className="flag">
              <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} />
            </div>
          )}

          {weatherData && (
            <div className="weather">
              <h2>Weather in {selectedCountry.capital[0]}</h2>
              <div className="weather-content">
                <div className="weather-info">
                  <p><strong>Temperature:</strong> {weatherData.main.temp.toFixed(1)} Celsius</p>
                  <p><strong>Wind:</strong> {weatherData.wind.speed} m/s</p>
                </div>
                {weatherData.weather[0]?.icon && (
                  <div className="weather-icon">
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt={weatherData.weather[0].description}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {countries.length === 1 && !selectedCountry && (
        <div className="country-details">
          <h1>{countries[0].name.common}</h1>

          <div className="country-info">
            <p><strong>Capital:</strong> {countries[0].capital?.[0] || 'N/A'}</p>
            <p><strong>Area:</strong> {countries[0].area?.toLocaleString()} km²</p>
          </div>

          {countries[0].languages && Object.keys(countries[0].languages).length > 0 && (
            <div className="languages">
              <h2>Languages</h2>
              <ul>
                {Object.values(countries[0].languages).map((lang, idx) => (
                  <li key={idx}>{lang}</li>
                ))}
              </ul>
            </div>
          )}

          {countries[0].flags?.png && (
            <div className="flag">
              <img src={countries[0].flags.png} alt={`Flag of ${countries[0].name.common}`} />
            </div>
          )}

          {weatherData && countries[0].capital && (
            <div className="weather">
              <h2>Weather in {countries[0].capital[0]}</h2>
              <div className="weather-content">
                <div className="weather-info">
                  <p><strong>Temperature:</strong> {weatherData.main.temp.toFixed(1)} Celsius</p>
                  <p><strong>Wind:</strong> {weatherData.wind.speed} m/s</p>
                </div>
                {weatherData.weather[0]?.icon && (
                  <div className="weather-icon">
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt={weatherData.weather[0].description}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
