import React from 'react'
import '../App.css'

// src/pages/EditItem.jsx
import { useState, useEffect } from 'react';
import { getCustomItemById, updateCustomItem } from '../services/CarsAPI';
import { useParams } from 'react-router-dom';
/*
const EditCar = () => {

    const { id } = useParams();
    const [exterior, setExterior] = useState('');
    const [roof, setRoof] = useState('');
    const [wheels, setWheels] = useState('');
    const [interior, setInterior] = useState('');

    useEffect(() => {
        const fetchItem = async () => {
            const item = await getCustomItemById(id);
            setExterior(item.exterior);
            setRoof(item.roof);
            setWheels(item.wheels);
            setInterior(item.interior);
        };
        fetchItem();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedItem = { exterior, roof, wheels, interior };
        await updateCustomItem(id, updatedItem);
        // Optionally redirect after updating
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Car</h1>
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
            <button type="submit">Save Changes</button>
        </form>
    );
};
*/
import { calculatePrice } from '../utilities/calcPrice';
import { validateCombination } from '../utilities/validation';

const EditCar = () => {
    const { id } = useParams();
    const [exterior, setExterior] = useState('standard');
    const [roof, setRoof] = useState('standard');
    const [wheels, setWheels] = useState('basic');
    const [interior, setInterior] = useState('fabric');
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchItem = async () => {
            const item = await getCustomItemById(id);
            setExterior(item.exterior);
            setRoof(item.roof);
            setWheels(item.wheels);
            setInterior(item.interior);
            setTotalPrice(item.price);
        };
        fetchItem();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateCombination(exterior, roof, wheels, interior);
        
        if (validationError) {
            setError(validationError);
            return;
        }
        
        const updatedItem = { exterior, roof, wheels, interior, price: totalPrice };
        await updateCustomItem (id, updatedItem);
        // Optionally redirect after update
    };

    const updatePrice = () => {
        const price = calculatePrice(exterior, roof, wheels, interior);
        setTotalPrice(price);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Custom Item</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <label>Exterior:
                <select value={exterior} onChange={(e) => setExterior(e.target.value)}>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="deluxe">Deluxe</option>
                </select>
            </label>

            <label>Roof:
                <select value={roof} onChange={(e) => setRoof(e.target.value)}>
                    <option value="standard">Standard</option>
                    <option value="panoramic">Panoramic</option>
                    <option value="convertible">Convertible</option>
                </select>
            </label>

            <label>Wheels:
                <select value={wheels} onChange={(e) => setWheels(e.target.value)}>
                    <option value="basic">Basic</option>
                    <option value="sport">Sport</option>
                    <option value="offroad">Offroad</option>
                </select>
            </label>

            <label>Interior:
                <select value={interior} onChange={(e) => setInterior(e.target.value)}>
                    <option value="fabric">Fabric</option>
                    <option value="leather">Leather</option>
                    <option value="luxury">Luxury</option>
                </select>
            </label>

            <button type="button" onClick={updatePrice}>Update Price</button>

            <p>Total Price: ${totalPrice}</p>

            <button type="submit">Update</button>
        </form>
    );
};


export default EditCar;
