import React from 'react'
import '../App.css'
// src/pages/CreateItem.jsx
import { useState } from 'react';
import { createCustomItem} from '../services/CarsAPI';
/*
const CreateCar = () => {
    const [exterior, setExterior] = useState('');
    const [roof, setRoof] = useState('');
    const [wheels, setWheels] = useState('');
    const [interior, setInterior] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = { exterior, roof, wheels, interior };
        await createCustomItem(newItem);
        // Optionally redirect after creation
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Custom Car</h1>
            <label>Exterior:
                <input value={exterior} onChange={(e) => setExterior(e.target.value)} />
            </label>
            <label>Roof:
                <input value={roof} onChange={(e) => setRoof(e.target.value)} />
            </label>
            <label>Wheels:
                <input value={wheels} onChange={(e) => setWheels(e.target.value)} />
            </label>
            <label>Interior:
                <input value={interior} onChange={(e) => setInterior(e.target.value)} />
            </label>
            <button type="submit">Create</button>
        </form>
        
    );
    // In CreateItem or EditItem
    //<p>Total Price: ${calculatePrice(exterior, roof, wheels, interior)}</p>

};
*/
import { calculatePrice } from '../utilities/calcPrice';
import { validateCombination } from '../utilities/validation';

const CreateCar = () => {
    const [exterior, setExterior] = useState('standard');
    const [roof, setRoof] = useState('standard');
    const [wheels, setWheels] = useState('basic');
    const [interior, setInterior] = useState('fabric');
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateCombination(exterior, roof, wheels, interior);
        
        if (validationError) {
            setError(validationError);
            return; // Don't proceed if there's an error
        }
        
        const newItem = { exterior, roof, wheels, interior, price: totalPrice };
        await createCustomItem(newItem);
        // Optionally redirect or reset form after creation
    };

    // Update the total price when any feature is selected
    const updatePrice = () => {
        const price = calculatePrice(exterior, roof, wheels, interior);
        setTotalPrice(price);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Custom Car</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <label>Exterior:
                <select value={exterior}style={{ color: 'white' }} onChange={(e) => setExterior(e.target.value)}>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="deluxe">Deluxe</option>
                </select>
            </label>

            <label>Roof:
                <select value={roof} style={{ color: 'white' }}onChange={(e) => setRoof(e.target.value)}>
                    <option value="standard">Standard</option>
                    <option value="panoramic">Panoramic</option>
                    <option value="convertible">Convertible</option>
                </select>
            </label>

            <label>Wheels:
                <select value={wheels} style={{ color: 'white' }} onChange={(e) => setWheels(e.target.value)}>
                    <option value="basic"style={{ color: 'black' }}>Basic</option>
                    <option value="sport"style={{ color: 'black' }}>Sport</option>
                    <option value="offroad"style={{ color: 'black' }}>Offroad</option>
                </select>
            </label>

            <label>Interior:
                <select value={interior} style={{ color: 'white' }} onChange={(e) => setInterior(e.target.value)}>
                    <option value="fabric" style={{ color: 'black' }}>Fabric</option>
                    <option value="leather" style={{ color: 'black' }}>Leather</option>
                    <option value="luxury"style={{ color: 'black' }}>Luxury</option>
                </select>
            </label>

            {/* Update price when any feature is changed */}
            <button type="button" onClick={updatePrice}>Update Price</button>

            <p>Total Price: ${totalPrice}</p>

            <button type="submit">Create</button>
        </form>
    );
};

export default CreateCar;