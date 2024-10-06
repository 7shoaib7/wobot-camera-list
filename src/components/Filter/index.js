import React from 'react'

const Filter = ({icon, value, options, onChange, placeholder}) => {
  return (
    <div className="filter-container">
      <img src={icon} alt={`${placeholder}-icon`} className="filter-icon" />
      <select className="filter-select"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled defaultValue hidden>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Filter