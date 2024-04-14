import { useState, useEffect } from 'react';

export const Cars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5500/cars')
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            {cars.map((car, index) => (
                <div key={index}>
                    <h1>Brand: {car.brand.name}</h1>
                    <h2>{car.model}</h2>
                    <img src={car.image} alt={car.model} />
                </div>
            ))}
        </div>
    );
};