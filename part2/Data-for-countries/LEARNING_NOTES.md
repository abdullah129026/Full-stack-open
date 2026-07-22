# Full Stack Open Part 2 - Data for Countries Learning Notes

## Project Overview
This project implements a React application that displays information about countries, including their basic details, flags, and real-time weather information for their capital cities.

---

## Key Learning Points

### 1. **React Fundamentals**

#### State Management with `useState`
- Used multiple state variables to track:
  - Search query (`search`)
  - Filtered countries list (`countries`)
  - All available countries (`allCountries`)
  - Selected country for detailed view (`selectedCountry`)
  - Weather data (`weatherData`)
  - Loading and error states (`loading`, `error`)
  
```javascript
const [search, setSearch] = useState('')
const [selectedCountry, setSelectedCountry] = useState(null)
```

#### Side Effects with `useEffect`
- **Three separate useEffect hooks** for different concerns:
  1. **Fetch all countries on mount** - Runs once when component loads
  2. **Filter countries based on search** - Runs when search query or allCountries changes
  3. **Fetch weather data** - Runs when selectedCountry, countries, or weatherApiKey changes

**Key principle**: Each `useEffect` should have a single responsibility and clear dependencies.

```javascript
useEffect(() => {
  // Code to run
}, [dependencies]) // Only re-run when dependencies change
```

---

### 2. **Conditional Rendering**

Implemented different UI views based on application state:

| Condition | UI Rendered |
|-----------|------------|
| Search results > 10 | "Too many matches..." message |
| Search results 1-10 | List with "Show" buttons |
| Exactly 1 result | Detailed country information |
| Country selected from list | Detailed view with "Back" button |
| Capital has weather data | Weather section with temperature & icon |

```javascript
{countries.length > 10 && <p>Too many matches, specify another filter</p>}
{countries.length > 1 && countries.length <= 10 && !selectedCountry && (
  // Render list with Show buttons
)}
{selectedCountry && (
  // Render detailed view
)}
```

---

### 3. **API Integration**

#### REST Countries API
- **Endpoint**: `https://studies.cs.helsinki.fi/restcountries/api/all`
- **Approach**: Fetch all countries once, filter client-side
- **Reason**: More reliable than relying on server-side search endpoints
- **Data structure**:
  ```javascript
  {
    name: { common: "Finland", official: "..." },
    capital: ["Helsinki"],
    area: 338424,
    languages: { fin: "Finnish", swe: "Swedish" },
    flags: { png: "url...", svg: "url..." },
    cca2: "FI"
  }
  ```

#### OpenWeatherMap API
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={key}`
- **Query parameters**:
  - `q`: City name (capital city)
  - `units=metric`: Temperature in Celsius
  - `appid`: API key
- **Response includes**:
  - `main.temp`: Current temperature
  - `wind.speed`: Wind speed
  - `weather[0].icon`: Icon code for weather condition
  - Weather icons: `https://openweathermap.org/img/wn/{icon}@2x.png`

---

### 4. **Environment Variables & Security**

#### Vite Environment Variables
- Only variables prefixed with `VITE_` are exposed to client code
- Stored in `.env.local` file (never committed to git)
- Accessed via `import.meta.env.VITE_VARIABLE_NAME`

```javascript
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
```

#### Best Practices for API Keys
- ✅ Store in `.env.local`
- ✅ Add `.env.local` to `.gitignore` (already covers `*.local`)
- ✅ Restart dev server after changing environment variables
- ❌ Never hardcode API keys in source code
- ❌ Never commit `.env.local` to version control
- ⚠️ Note: Sending API keys from browser is not ideal for production (should use backend proxy)

#### Starting dev server with environment variable:
```bash
# Linux/macOS
export VITE_WEATHER_API_KEY=your_key && npm run dev

# Windows PowerShell
($env:VITE_WEATHER_API_KEY="your_key") -and (npm run dev)

# Windows cmd
set "VITE_WEATHER_API_KEY=your_key" && npm run dev
```

---

### 5. **Data Fetching Patterns**

#### Fetch API with Promise Chain
```javascript
fetch(url)
  .then(response => {
    if (!response.ok) throw new Error('Failed')
    return response.json()
  })
  .then(data => {
    // Handle data
  })
  .catch(error => {
    // Handle error
  })
```

#### Handling Multiple API Calls
- Fetched data from two different APIs
- Chained dependencies so weather fetches when country changes
- Dependency array: `[selectedCountry, countries, weatherApiKey]`

#### Error Handling
- Check `response.ok` before parsing JSON
- Handle missing data gracefully:
  ```javascript
  capital?.[0] || 'N/A'
  languages && Object.keys(languages).length > 0 && (...)
  ```

---

### 6. **User Interaction & State Flow**

#### Navigation Flow
1. **Search**: User types → filters countries → shows results
2. **Show Button**: Click → sets selectedCountry → displays details
3. **Back Button**: Click → clears selectedCountry → shows list again
4. **Auto-fetch**: Weather fetches when selectedCountry or countries[0] changes

#### Key Pattern: Derived State
Instead of managing multiple state variables for each view, use a single `selectedCountry` to determine what to display:

```javascript
const countryToFetch = selectedCountry || (countries.length === 1 ? countries[0] : null)
```

---

### 7. **Array & Object Manipulation**

#### Filtering
```javascript
const filtered = allCountries.filter(country =>
  country.name.common.toLowerCase().includes(search.toLowerCase())
)
```

#### Extracting Object Values
```javascript
Object.values(languages).map((lang, idx) => <li key={idx}>{lang}</li>)
```

#### Formatting Numbers
```javascript
area.toLocaleString() // "338,424" 
temp.toFixed(1)       // "5.7"
```

---

### 8. **CSS & Styling**

#### Flexbox Layout
```css
.country-item {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Country name left, button right */
}

.weather-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
```

#### Responsive & Clean Design
- Max-width container for readability
- Consistent spacing and borders
- Hover effects for interactivity
- Clear visual hierarchy with heading sizes

---

### 9. **Component Structure**

#### Single Responsibility Principle
Each section of the component handles one thing:
- **Search input**: Manages search state
- **Country list**: Shows filtered results
- **Country details**: Displays full information
- **Weather section**: Shows weather data

#### Reusable Logic
- Weather display component repeated twice (for selectedCountry and single match)
  - Could be extracted to a separate component in larger apps
  - For this exercise, duplication was acceptable

---

### 10. **Common Pitfalls & Solutions**

| Problem | Solution |
|---------|----------|
| API search endpoint too strict | Fetch all data, filter client-side |
| API key exposed in browser | Store in `.env.local`, use VITE_ prefix |
| Missing environment variable at startup | Restart dev server after changes |
| Infinite fetch loops | Set correct useEffect dependencies |
| CORS or HTTP/HTTPS errors | Use alternative APIs or proxies |
| Stale data after navigation | Use back button to clear selectedCountry |
| Duplicate weather displays | Check both single-match and show-button views |

---

### 11. **React Best Practices Applied**

✅ **Lifting state up**: All state at App component level  
✅ **Single source of truth**: One countries array, filtered as needed  
✅ **Keys in lists**: Using `country.cca2` for map keys  
✅ **Controlled inputs**: Search input controlled by React state  
✅ **Event handling**: onClick handlers for buttons  
✅ **Conditional rendering**: Multiple ways to show/hide content  
✅ **Error boundaries**: Handling API failures gracefully  
✅ **Dependency arrays**: Correctly specified in all useEffect hooks  

---

### 12. **Project Files & Structure**

```
Data-for-countries/
├── .env.local              # API keys (never commit)
├── .gitignore              # Includes *.local
├── src/
│   ├── App.jsx            # Main component (170+ lines)
│   ├── App.css            # Component styling
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── package.json            # Dependencies (React, React-DOM, Vite)
└── LEARNING_NOTES.md       # This file
```

---

## Exercises Completed

### Exercise 2.18: Basic Country Search
- ✅ Search input field
- ✅ Display matching countries
- ✅ Show detailed info for single match
- ✅ "Too many matches" message

### Exercise 2.19: Show Buttons
- ✅ Add "Show" button to each country in list
- ✅ Display selected country details
- ✅ Add "Back" button to return to list
- ✅ Preserve search term while browsing

### Exercise 2.20: Weather Integration
- ✅ Fetch weather data for capital city
- ✅ Display temperature and wind speed
- ✅ Show weather icon
- ✅ Secure API key storage with environment variables

---

## Key Takeaways

1. **API Integration**: Fetching from REST endpoints and handling responses
2. **State Management**: Coordinating multiple pieces of state with useEffect
3. **User Experience**: Building intuitive navigation and display patterns
4. **Security**: Protecting sensitive data like API keys
5. **React Patterns**: Conditional rendering, lifting state, controlled inputs
6. **Problem Solving**: Adapting when APIs don't work as expected (server-side search)
7. **Testing in Real Browser**: Using the actual application to verify functionality

---

## References & Resources

- **React Docs**: https://react.dev
- **REST Countries API**: https://restcountries.com
- **OpenWeatherMap API**: https://openweathermap.org/api
- **Vite Environment Variables**: https://vitejs.dev/guide/env-and-mode.html
- **MDN Web Docs**: https://developer.mozilla.org/
- **Full Stack Open**: https://fullstackopen.com

---

## Notes for Future Work

- Consider extracting weather display to a separate `<WeatherSection>` component
- Add error states for failed weather API calls
- Implement loading skeleton for weather data
- Add temperature unit toggle (Celsius/Fahrenheit)
- Cache weather data to reduce API calls
- Consider moving API calls to a backend service
- Add more detailed error messages for user feedback
- Implement search debouncing for better performance

---

*Last Updated: 2026-07-21*  
*Course: Full Stack Open Part 2*  
*Exercise: 2.18, 2.19, 2.20 - Data for Countries*
