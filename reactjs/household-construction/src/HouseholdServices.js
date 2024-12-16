// React Component: Household Construction and Maintenance Services

import React from 'react';
import './Home.css';

const services = [
  {
    category: "Construction Services",
    items: [
      "Custom Home Building",
      "Renovations and Remodeling",
      "Architectural Design",
      "Interior Design",
    ],
  },
  {
    category: "Maintenance Services",
    items: [
      "Plumbing Repairs",
      "Electrical Work",
      "HVAC Maintenance",
      "Painting and Repairs",
    ],
  },
];

const HouseholdServices = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Our Services</h1>
      {services.map((serviceCategory, index) => (
        <div key={index} style={{ margin: '20px 0' }}>
          <h2 style={{ color: '#2A7AE4' }}>{serviceCategory.category}</h2>
          <ul>
            {serviceCategory.items.map((item, idx) => (
              <li key={idx} style={{ fontSize: '16px', margin: '8px 0' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HouseholdServices;
