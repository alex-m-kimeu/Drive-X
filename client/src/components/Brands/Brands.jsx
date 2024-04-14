import { useState, useEffect } from 'react';

export const Brands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5500/brands')
      .then(response => response.json())
      .then(data => setBrands(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {brands.map((brand, index) => (
        <div key={index}>
          <h1>{brand.name}</h1>
          <img src={brand.logo} alt={brand.name} />
        </div>
      ))}
    </div>
  );
};